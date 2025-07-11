import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  StatusBar, 
  Platform, 
  ScrollView,
  RefreshControl,
  Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InstagramHeader from '@/components/instagram/InstagramHeader';
import StoriesPanel from '@/components/instagram/StoriesPanel';
import PostFeed from '@/components/instagram/PostFeed';
import ExploreSection from '@/components/instagram/ExploreSection';
import { useFeed } from '@/hooks/useFeed';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { posts, isLoading, refreshFeed, loadMorePosts } = useFeed();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshFeed();
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent 
      />
      
      <InstagramHeader />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#262626"
            colors={['#262626']}
          />
        }
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const paddingToBottom = 20;
          if (layoutMeasurement.height + contentOffset.y >= 
              contentSize.height - paddingToBottom) {
            loadMorePosts();
          }
        }}
        scrollEventThrottle={400}
      >
        <StoriesPanel />
        <PostFeed 
          posts={posts} 
          isLoading={isLoading}
          onLoadMore={loadMorePosts}
        />
        <ExploreSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
});