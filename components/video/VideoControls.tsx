import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Heart, MessageCircle, Share, Volume2, VolumeX, Pause, Play } from 'lucide-react-native';
import Avatar from '../ui/Avatar';
import IconButton from '../ui/IconButton';
import { ReelData } from '../../types';

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
        <IconButton
          icon={isLiked ? Heart : Heart}
          onPress={onLike}
          color={isLiked ? '#FF375F' : '#FFFFFF'}
          size={28}
          style={styles.actionButton}
        />
        <Text style={styles.actionCount}>{reel.likes}</Text>

        <IconButton
          icon={MessageCircle}
          onPress={() => {}}
          size={28}
          style={styles.actionButton}
        />
        <Text style={styles.actionCount}>{reel.comments}</Text>

        <IconButton
          icon={Share}
          onPress={() => {}}
          size={28}
          style={styles.actionButton}
        />
        <Text style={styles.actionCount}>{reel.shares}</Text>

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
  },
  caption: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
});