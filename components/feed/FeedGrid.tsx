import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Dimensions,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import { router } from 'expo-router';
import { Play, Heart, MessageCircle } from 'lucide-react-native';
import LoadingIndicator from '../ui/LoadingIndicator';
import { PostData } from '../../types';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_SPACING = 2;
const ITEM_SIZE = (width - (COLUMN_COUNT - 1) * ITEM_SPACING) / COLUMN_COUNT;

interface FeedGridProps {
  posts: PostData[];
  isLoading?: boolean;
  onLoadMore?: () => void;
}

export default function FeedGrid({ posts, isLoading, onLoadMore }: FeedGridProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handlePostPress = (post: PostData) => {
    if (post.type === 'video') {
      // Navigate to reels tab and focus on this video
      router.push({
        pathname: '/(tabs)/reels',
        params: { videoId: post.id }
      });
    } else {
      // Handle image post (could open in modal or detail view)
      console.log('Image post pressed:', post.id);
    }
  };

  const handleImageError = (postId: string) => {
    setImageErrors(prev => new Set(prev).add(postId));
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return count.toString();
    }
  };

  const renderPost = ({ item, index }: { item: PostData; index: number }) => {
    const hasError = imageErrors.has(item.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.postContainer,
          {
            marginLeft: index % COLUMN_COUNT === 0 ? 0 : ITEM_SPACING,
            marginTop: index < COLUMN_COUNT ? 0 : ITEM_SPACING,
          }
        ]}
        onPress={() => handlePostPress(item)}
        activeOpacity={0.9}
      >
        {!hasError ? (
          <Image
            source={{ uri: item.thumbnailUrl }}
            style={styles.postImage}
            onError={() => handleImageError(item.id)}
          />
        ) : (
          <View style={[styles.postImage, styles.errorContainer]}>
            <Text style={styles.errorText}>Failed to load</Text>
          </View>
        )}

        {/* Video indicator */}
        {item.type === 'video' && (
          <View style={styles.videoIndicator}>
            <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
          </View>
        )}

        {/* Engagement overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.engagementOverlay}
        >
          <View style={styles.engagementStats}>
            <View style={styles.statItem}>
              <Heart size={14} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.statText}>{formatCount(item.likes)}</Text>
            </View>
            <View style={styles.statItem}>
              <MessageCircle size={14} color="#FFFFFF" />
              <Text style={styles.statText}>{formatCount(item.comments)}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_SIZE,
    offset: ITEM_SIZE * Math.floor(index / COLUMN_COUNT) + 
            Math.floor(index / COLUMN_COUNT) * ITEM_SPACING,
    index,
  });

  if (posts.length === 0 && isLoading) {
    return <LoadingIndicator fullscreen message="Loading feed..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        showsVerticalScrollIndicator={false}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        getItemLayout={getItemLayout}
        initialNumToRender={12}
        maxToRenderPerBatch={6}
        windowSize={10}
        removeClippedSubviews={true}
        ListFooterComponent={
          isLoading ? <LoadingIndicator message="Loading more..." /> : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.3,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  engagementOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 6,
  },
  engagementStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    color: '#FFFFFF',
    fontSize: 11,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});