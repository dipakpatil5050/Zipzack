import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReelsList from '../../components/video/ReelsList';
import StoriesList from '../../components/stories/StoriesList';
import { useReels } from '../../hooks/useReels';

export default function HomeScreen() {
  const { reels, isLoading, loadMoreReels } = useReels();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StoriesList />
      <View style={styles.reelsContainer}>
        <ReelsList 
          reels={reels} 
          isLoading={isLoading} 
          onEndReached={loadMoreReels}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelsContainer: {
    flex: 1,
  },
});