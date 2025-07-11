import React from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList,
  RefreshControl
} from 'react-native';
import PostItem from './PostItem';
import LoadingIndicator from '../ui/LoadingIndicator';
import { PostData } from '../../types';

interface PostFeedProps {
  posts: PostData[];
  isLoading?: boolean;
  onLoadMore?: () => void;
}

export default function PostFeed({ posts, isLoading, onLoadMore }: PostFeedProps) {
  const renderPost = ({ item }: { item: PostData }) => (
    <PostItem post={item} />
  );

  if (posts.length === 0 && isLoading) {
    return <LoadingIndicator fullscreen message="Loading posts..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        scrollEnabled={false}
        ListFooterComponent={
          isLoading ? <LoadingIndicator message="Loading more posts..." /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
});