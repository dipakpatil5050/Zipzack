import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import ReelPlayer from './ReelPlayer';
import { ReelData } from '../../types';

interface ReelItemProps {
  reel: ReelData;
  isActive: boolean;
  height: number;
  onFinish?: () => void;
}

const ReelItem = memo(function ReelItem({ reel, isActive, height, onFinish }: ReelItemProps) {
  return (
    <View style={[styles.container, { height }]}>
      <ReelPlayer 
        reel={reel} 
        isActive={isActive} 
        onFinish={onFinish} 
      />
    </View>
  );
});

export default ReelItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});