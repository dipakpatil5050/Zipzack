import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import { Heart, MessageCircle, Share, Volume2, VolumeX, Pause, Play } from 'lucide-react-native';
import Avatar from '../ui/Avatar';
import AnimatedLikeButton from '../ui/AnimatedLikeButton';
import IconButton from '../ui/IconButton';
import { ReelData } from '../../types';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface VideoControlsProps {
  reel: ReelData;
  isPlaying: boolean;
  isMuted: boolean;
  isLiked: boolean;
  onPlayPause: () => void;
  onMute: () => void;
  onLike: () => void;
}

export default function VideoControls({
  reel,
  isPlaying,
  isMuted,
  isLiked,
  onPlayPause,
  onMute,
  onLike,
}: VideoControlsProps) {
  const [localLiked, setLocalLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(reel.likes);

  const handleLike = () => {
    // Trigger haptic feedback on supported platforms
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const newLikedState = !localLiked;
    setLocalLiked(newLikedState);
    
    // Update like count
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    // Call parent handler
    onLike();
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

  return (
    <>
      {/* Touch area for play/pause */}
      <TouchableWithoutFeedback onPress={onPlayPause}>
        <View style={styles.touchableArea} />
      </TouchableWithoutFeedback>

      {/* Play/Pause indicator that appears briefly */}
      <View style={styles.playPauseOverlay}>
        {!isPlaying && (
          <View style={styles.playIconContainer}>
            <Play size={50} color="#FFFFFF" />
          </View>
        )}
      </View>

      {/* Right side action buttons */}
      <View style={styles.rightControls}>
        <AnimatedLikeButton
          isLiked={localLiked}
          onPress={handleLike}
          size={28}
        />
        <Text style={styles.actionCount}>{formatCount(likeCount)}</Text>

        <IconButton
          icon={MessageCircle}
          onPress={() => {}}
          size={28}
          style={styles.actionButton}
        />
        <Text style={styles.actionCount}>{formatCount(reel.comments)}</Text>

        <IconButton
          icon={Share}
          onPress={() => {}}
          size={28}
          style={styles.actionButton}
        />
        <Text style={styles.actionCount}>{formatCount(reel.shares)}</Text>

        <IconButton
          icon={isMuted ? VolumeX : Volume2}
          onPress={onMute}
          size={28}
          style={styles.actionButton}
        />
      </View>

      {/* Bottom info section */}
      <View style={styles.bottomSection}>
        <View style={styles.userInfo}>
          <Avatar source={{ uri: reel.user.avatarUrl }} size={40} hasStory={reel.user.hasStory} />
          <Text style={styles.username}>@{reel.user.username}</Text>
        </View>
        
        <Text style={styles.caption}>{reel.caption}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  touchableArea: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  playPauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  playIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
    padding: 10,
  },
  rightControls: {
    position: 'absolute',
    right: 12,
    bottom: 150,
    alignItems: 'center',
  },
  actionButton: {
    marginVertical: 8,
  },
  actionCount: {
    color: '#FFFFFF',
    fontSize: 12,
    marginBottom: 15,
    fontFamily: 'Inter-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 16,
    width: width - 80, // Leave space for right controls
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  username: {
    marginLeft: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  caption: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
});