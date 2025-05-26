import React, { useState, useRef } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  View, 
  Dimensions, 
  ViewToken,
  ViewabilityConfig,
  ViewabilityConfigCallbackPair,
  ListRenderItem
} from 'react-native';
import ReelItem from './ReelItem';
import LoadingIndicator from '../ui/LoadingIndicator';
import { ReelData } from '../../types';

const { width, height } = Dimensions.get('window');

interface ReelsListProps {
  reels: ReelData[];
  isLoading?: boolean;
  onEndReached?: () => void;
}

export default function ReelsList({ 
  reels, 
  isLoading = false, 
  onEndReached 
}: ReelsListProps) {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 60 // Item is considered visible when 60% of it is visible
  };

  // Refs to avoid recreating callbacks on each render
  const flatListRef = useRef<FlatList>(null);
  
  const onViewableItemsChanged = useRef(({ viewableItems }: { 
    viewableItems: ViewToken[], 
    changed: ViewToken[] 
  }) => {
    if (viewableItems.length > 0) {
      const activeItem = viewableItems[0];
      setActiveReelIndex(activeItem.index || 0);
    }
  });

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPair[]>([
    { viewabilityConfig, onViewableItemsChanged: onViewableItemsChanged.current }
  ]);

  const renderItem: ListRenderItem<ReelData> = ({ item, index }) => {
    return (
      <ReelItem
        reel={item}
        isActive={index === activeReelIndex}
        onFinish={() => {
          // Auto-advance to next reel on completion if this is the active reel
          if (index === activeReelIndex && index < reels.length - 1) {
            flatListRef.current?.scrollToIndex({
              index: index + 1,
              animated: true
            });
          }
        }}
      />
    );
  };

  const getItemLayout = (_: any, index: number) => ({
    length: height,
    offset: height * index,
    index,
  });

  if (reels.length === 0 && isLoading) {
    return <LoadingIndicator fullscreen message="Loading reels..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={reels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        getItemLayout={getItemLayout}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={5}
        ListFooterComponent={isLoading ? <LoadingIndicator /> : null}
        snapToInterval={height}
        decelerationRate="fast"
        removeClippedSubviews={true}
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