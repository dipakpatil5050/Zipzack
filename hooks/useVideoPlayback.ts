import { useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface UseVideoPlaybackResult {
  isPaused: boolean;
  togglePlay: () => void;
  forcePause: () => void;
  forcePlay: () => void;
}

export function useVideoPlayback(isActive: boolean): UseVideoPlaybackResult {
  const [isPaused, setIsPaused] = useState(!isActive);
  const appState = useRef(AppState.currentState);
  
  useEffect(() => {
    if (isActive) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  }, [isActive]);
  
  // Handle app going to background/foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) && 
        nextAppState === 'active' && 
        isActive
      ) {
        // App has come to the foreground and this video is active
        setIsPaused(false);
      } else if (nextAppState.match(/inactive|background/)) {
        // App has gone to the background
        setIsPaused(true);
      }
      
      appState.current = nextAppState;
    };
    
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription.remove();
    };
  }, [isActive]);
  
  const togglePlay = () => {
    setIsPaused((prev) => !prev);
  };
  
  const forcePause = () => {
    setIsPaused(true);
  };
  
  const forcePlay = () => {
    if (isActive) {
      setIsPaused(false);
    }
  };
  
  return {
    isPaused,
    togglePlay,
    forcePause,
    forcePlay
  };
}