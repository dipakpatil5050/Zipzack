import { useState, useEffect, useCallback } from 'react';
import { ReelData } from '../types';
import { mockReels } from '../utils/mockData';

interface UseReelsResult {
  reels: ReelData[];
  isLoading: boolean;
  error: Error | null;
  loadMoreReels: () => void;
  refreshReels: () => void;
}

export function useReels(initialLimit = 5): UseReelsResult {
  const [reels, setReels] = useState<ReelData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  
  const fetchReels = useCallback(async (pageNum: number, shouldAppend = true) => {
    if (pageNum === 1) {
      setIsLoading(true);
    }
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just use mock data and simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate paginated data
      const startIdx = (pageNum - 1) * initialLimit;
      const endIdx = startIdx + initialLimit;
      const newReels = mockReels.slice(startIdx, endIdx);
      
      if (shouldAppend) {
        setReels(prev => [...prev, ...newReels]);
      } else {
        setReels(newReels);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch reels'));
    } finally {
      setIsLoading(false);
    }
  }, [initialLimit]);
  
  // Initial fetch
  useEffect(() => {
    fetchReels(1, false);
  }, [fetchReels]);
  
  const loadMoreReels = useCallback(() => {
    if (!isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchReels(nextPage);
    }
  }, [fetchReels, isLoading, page]);
  
  const refreshReels = useCallback(() => {
    setPage(1);
    fetchReels(1, false);
  }, [fetchReels]);
  
  return {
    reels,
    isLoading,
    error,
    loadMoreReels,
    refreshReels
  };
}