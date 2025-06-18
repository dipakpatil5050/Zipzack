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
import StoriesHeader from '../../components/stories/StoriesHeader';
import FeedGrid from '../../components/feed/FeedGrid';
import { useFeed } from '../../hooks/useFeed';

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
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#FF375F"
            colors={['#FF375F']}
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
        <StoriesHeader />
        <FeedGrid 
          posts={posts} 
          isLoading={isLoading}
          onLoadMore={loadMorePosts}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
});