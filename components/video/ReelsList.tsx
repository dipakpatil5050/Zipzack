import React, { useState, useRef } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  View, 
  Dimensions, 
  ViewToken,
  ViewabilityConfig,
  ViewabilityConfigCallbackPair,
  ListRenderItem,
  Platform
} from 'react-native';
import Animated, { 
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import ReelItem from './ReelItem';
import LoadingIndicator from '../ui/LoadingIndicator';
import { ReelData } from '../../types';

const { width, height } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  
  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 60
  };

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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
      // Snap to the nearest reel
      const nearestReel = Math.round(scrollY.value / height);
      scrollY.value = withSpring(nearestReel * height, {
        damping: 20,
        stiffness: 90
      });
    }
  });

  const renderItem: ListRenderItem<ReelData> = ({ item, index }) => {
    return (
      <ReelItem
        reel={item}
        isActive={index === activeReelIndex}
        onFinish={() => {
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
        snapToInterval={height}
        decelerationRate={Platform.select({ ios: 0.992, android: 0.985 })}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
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