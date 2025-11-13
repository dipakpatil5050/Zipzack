import React, { useState, useRef, useEffect } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  View, 
  ViewToken,
  ViewabilityConfig,
  ViewabilityConfigCallbackPair,
  ListRenderItem,
  useWindowDimensions,
  Platform
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
    itemVisiblePercentThreshold: 80,
    minimumViewTime: 100
  };

  // Scroll to initial index when component mounts
  useEffect(() => {
    if (initialIndex > 0 && reels.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
          viewPosition: 0.5
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
      const newIndex = activeItem.index || 0;
      if (newIndex !== activeReelIndex) {
        setActiveReelIndex(newIndex);
      }
    }
  });

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPair[]>([
    { viewabilityConfig, onViewableItemsChanged: onViewableItemsChanged.current }
  ]);

  const renderItem: ListRenderItem<ReelData> = React.useCallback(({ item, index }) => {
    return (
      <ReelItem
        reel={item}
        isActive={index === activeReelIndex}
        height={windowHeight}
      />
    );
  }, [activeReelIndex, windowHeight]);

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
        animated: false,
        viewPosition: 0.5
      });
    });
  };

  const keyExtractor = React.useCallback((item: ReelData) => item.id, []);
  if (reels.length === 0 && isLoading) {
    return <LoadingIndicator fullscreen message="Loading reels..." />;
  }

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        data={reels}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        getItemLayout={getItemLayout}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        windowSize={3}
        ListFooterComponent={isLoading ? <LoadingIndicator /> : null}
        snapToInterval={windowHeight}
        decelerationRate={Platform.OS === 'ios' ? 0.998 : 'fast'}
        removeClippedSubviews={true}
        onScrollToIndexFailed={onScrollToIndexFailed}
        scrollEventThrottle={16}
        bounces={false}
        overScrollMode="never"
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