import { useState, useEffect, useCallback } from 'react';
import { PostData } from '../types';
import { mockPosts } from '../utils/mockData';

interface UseFeedResult {
  posts: PostData[];
  isLoading: boolean;
  error: Error | null;
  loadMorePosts: () => void;
  refreshFeed: () => Promise<void>;
}

export function useFeed(initialLimit = 12): UseFeedResult {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  const fetchPosts = useCallback(async (pageNum: number, shouldAppend = true) => {
    if (pageNum === 1) {
      setIsLoading(true);
    }
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate paginated data
      const startIdx = (pageNum - 1) * initialLimit;
      const endIdx = startIdx + initialLimit;
      const newPosts = mockPosts.slice(startIdx, endIdx);
      
      if (newPosts.length === 0) {
        setHasMore(false);
        return;
      }
      
      if (shouldAppend) {
        setPosts(prev => [...prev, ...newPosts]);
      } else {
        setPosts(newPosts);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
    } finally {
      setIsLoading(false);
    }
  }, [initialLimit]);
  
  // Initial fetch
  useEffect(() => {
    fetchPosts(1, false);
  }, [fetchPosts]);
  
  const loadMorePosts = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage);
    }
  }, [fetchPosts, isLoading, page, hasMore]);
  
  const refreshFeed = useCallback(async () => {
    setPage(1);
    setHasMore(true);
    await fetchPosts(1, false);
  }, [fetchPosts]);
  
  return {
    posts,
    isLoading,
    error,
    loadMorePosts,
    refreshFeed
  };
}