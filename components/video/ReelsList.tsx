import React, { useState, useRef, useEffect } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  View, 
  ViewToken,
  ViewabilityConfig,
  ViewabilityConfigCallbackPair,
  ListRenderItem,
  useWindowDimensions
} from 'react-native';
import Animated from 'react-native-reanimated';
import ReelItem from './ReelItem';
import LoadingIndicator from '../ui/LoadingIndicator';
import { ReelData } from '../../types';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface ReelsListProps {
  reels: ReelData[];
  isLoading?: boolean;
  onEndReached?: () => void;
  initialIndex?: number;
}

export default function ReelsList({ 
  reels, 
  isLoading = false, 
  onEndReached,
  initialIndex = 0
}: ReelsListProps) {
  const [activeReelIndex, setActiveReelIndex] = useState(initialIndex);
  const { height: windowHeight } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  
  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 60
  };

  // Scroll to initial index when component mounts
  useEffect(() => {
    if (initialIndex > 0 && reels.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false
        });
      }, 100);
    }
  }, [initialIndex, reels.length]);
  
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
        height={windowHeight}
      />
    );
  };

  const getItemLayout = (_: any, index: number) => ({
    length: windowHeight,
    offset: windowHeight * index,
    index,
  });

  const onScrollToIndexFailed = (info: any) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ 
        index: info.index, 
        animated: false 
      });
    });
  };

  if (reels.length === 0 && isLoading) {
    return <LoadingIndicator fullscreen message="Loading reels..." />;
  }

  return (
    <View style={styles.container}>
      <AnimatedFlatList
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
        snapToInterval={windowHeight}
        decelerationRate="fast"
        removeClippedSubviews={true}
        onScrollToIndexFailed={onScrollToIndexFailed}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10
        }}
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