import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Platform
} from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, MoveVertical as MoreVertical } from 'lucide-react-native';
import Avatar from '../ui/Avatar';
import { PostData } from '../../types';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface PostItemProps {
  post: PostData;
}

export default function PostItem({ post }: PostItemProps) {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const likeScale = useSharedValue(1);
  
  const likeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: likeScale.value }],
    };
  });

  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    // Animate like button
    likeScale.value = withSequence(
      withSpring(1.2, { damping: 10, stiffness: 200 }),
      withSpring(1.0, { damping: 10, stiffness: 200 })
    );
  };

  const handleSave = () => {
    setSaved(!saved);
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

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      return `${Math.floor(diffInHours / 24)}d`;
    }
  };

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar 
            source={{ uri: post.user.avatarUrl }} 
            size={32} 
            hasStory={post.user.hasStory}
          />
          <Text style={styles.username}>{post.user.username}</Text>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={20} color="#262626" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <View style={styles.imageContainer}>
        {!imageLoaded && (
          <View style={[styles.imagePlaceholder, { height: width }]} />
        )}
        <Image
          source={{ uri: post.fullUrl || post.thumbnailUrl }}
          style={[styles.postImage, { height: width }]}
          onLoad={() => setImageLoaded(true)}
          resizeMode="cover"
        />
      </View>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Animated.View style={likeAnimatedStyle}>
              <Heart 
                size={24} 
                color={liked ? '#ED4956' : '#262626'} 
                fill={liked ? '#ED4956' : 'transparent'}
                strokeWidth={liked ? 0 : 2}
              />
            </Animated.View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={24} color="#262626" strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Send size={24} color="#262626" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={handleSave} style={styles.actionButton}>
          <Bookmark 
            size={24} 
            color="#262626" 
            fill={saved ? '#262626' : 'transparent'}
            strokeWidth={saved ? 0 : 2}
          />
        </TouchableOpacity>
      </View>

      {/* Engagement Section */}
      <View style={styles.engagementSection}>
        <Text style={styles.likesCount}>
          {formatCount(likeCount)} likes
        </Text>
        
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>
            <Text style={styles.captionUsername}>{post.user.username}</Text>
            {' '}
            {post.caption}
          </Text>
        </View>
        
        {post.comments > 0 && (
          <TouchableOpacity style={styles.commentsButton}>
            <Text style={styles.commentsText}>
              View all {formatCount(post.comments)} comments
            </Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.timestamp}>
          {timeAgo(post.timestamp)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    fontFamily: 'Inter-SemiBold',
  },
  moreButton: {
    padding: 8,
    marginRight: -4, // Adjust for better edge alignment
  },
  imageContainer: {
    position: 'relative',
  },
  imagePlaceholder: {
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  postImage: {
    width: '100%',
    backgroundColor: '#F6F6F6',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
    padding: 4,
  },
  engagementSection: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  likesCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  captionContainer: {
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  captionUsername: {
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  commentsButton: {
    marginVertical: 4,
  },
  commentsText: {
    fontSize: 14,
    color: '#8E8E8E',
    fontFamily: 'Inter-Regular',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
});