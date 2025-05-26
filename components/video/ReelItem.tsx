import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReelPlayer from './ReelPlayer';
import { ReelData } from '../../types';

interface ReelItemProps {
  reel: ReelData;
  isActive: boolean;
  onFinish?: () => void;
}

export default function ReelItem({ reel, isActive, onFinish }: ReelItemProps) {
  return (
    <View style={styles.container}>
      <ReelPlayer 
        reel={reel} 
        isActive={isActive} 
        onFinish={onFinish} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});