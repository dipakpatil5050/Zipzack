import React from 'react';
import { View, StyleSheet, StatusBar, Platform, SafeAreaView } from 'react-native';
import ReelsList from '../../components/video/ReelsList';
import StoriesList from '../../components/stories/StoriesList';
import { useReels } from '../../hooks/useReels';

export default function HomeScreen() {
  const { reels, isLoading, loadMoreReels } = useReels();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StoriesList />
        <ReelsList 
          reels={reels} 
          isLoading={isLoading} 
          onEndReached={loadMoreReels}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});