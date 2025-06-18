import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReelsList from '../../components/video/ReelsList';
import { useReels } from '../../hooks/useReels';

export default function ReelsScreen() {
  const { videoId } = useLocalSearchParams();
  const { reels, isLoading, loadMoreReels } = useReels();
  const insets = useSafeAreaInsets();
  const [initialIndex, setInitialIndex] = useState(0);

  // Find the initial index if navigating to a specific video
  useEffect(() => {
    if (videoId && reels.length > 0) {
      const index = reels.findIndex(reel => reel.id === videoId);
      if (index !== -1) {
        setInitialIndex(index);
      }
    }
  }, [videoId, reels]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      
      <ReelsList 
        reels={reels} 
        isLoading={isLoading} 
        onEndReached={loadMoreReels}
        initialIndex={initialIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});