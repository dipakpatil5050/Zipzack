import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import VideoControls from './VideoControls';
import { ReelData } from '../../types';

interface ReelPlayerProps {
  reel: ReelData;
  isActive: boolean;
  onFinish?: () => void;
}

export default function ReelPlayer({ reel, isActive, onFinish }: ReelPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { width, height } = useWindowDimensions();

  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  
  useEffect(() => {
    if (Platform.OS !== 'web') {
      if (isActive) {
        if (isLoaded) {
          videoRef.current?.playAsync();
        }
      } else {
        videoRef.current?.pauseAsync();
        
        // Reset video position when not active for smoother transitions
        if (status?.isLoaded && status.positionMillis > 1000) {
          videoRef.current?.setPositionAsync(0);
        }
      }
    }
  }, [isActive, videoRef, isLoaded]);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setStatus(status);
    
    if (status.isLoaded && !isLoaded) {
      setIsLoaded(true);
      // Auto-play when loaded and active
      if (isActive) {
        videoRef.current?.playAsync();
      }
    }
    
    if (status.isLoaded && status.didJustFinish && onFinish) {
      onFinish();
    }
  };

  const togglePlay = async () => {
    if (!videoRef.current || Platform.OS === 'web') return;
    
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };

  const toggleMute = async () => {
    if (!videoRef.current || Platform.OS === 'web') return;
    
    await videoRef.current.setIsMutedAsync(!muted);
    setMuted(!muted);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <Video
        ref={videoRef}
        source={{ uri: reel.videoUrl }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={false} // Control playback manually for better performance
        isMuted={muted}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        usePoster
        posterSource={{ uri: reel.posterUrl }}
        posterStyle={styles.poster}
        progressUpdateIntervalMillis={500}
        positionMillis={0}
      />
      
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'transparent']}
        style={styles.topGradient}
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.bottomGradient}
      />
      
      <VideoControls
        reel={reel}
        isPlaying={isPlaying}
        isMuted={muted}
        isLiked={liked}
        onPlayPause={togglePlay}
        onMute={toggleMute}
        onLike={toggleLike}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    flex: 1,
    backgroundColor: '#000',
  },
  poster: {
    flex: 1,
    resizeMode: 'cover',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
});