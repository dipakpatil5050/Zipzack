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
  Platform,
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
}

export default function ReelsList({ 
  reels, 
  isLoading = false, 
  onEndReached 
}: ReelsListProps) {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const { height: windowHeight } = useWindowDimensions();
  
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