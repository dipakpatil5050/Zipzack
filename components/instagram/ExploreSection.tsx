import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { TrendingUp, Play } from 'lucide-react-native';
import { mockReels } from '../../utils/mockData';

const { width } = Dimensions.get('window');
const ITEM_SPACING = 2;
const ITEM_SIZE = (width - 32 - (ITEM_SPACING * 2)) / 3;

export default function ExploreSection() {
  const exploreData = mockReels.slice(0, 9).map((reel, index) => ({
    ...reel,
    isVideo: index % 3 === 0, // Every third item is a video
    views: `${Math.floor(Math.random() * 500) + 100}K`
  }));

  const renderExploreItem = ({ item, index }: { item: any, index: number }) => {
    const isLarge = index === 0 || index === 4; // Make first and fifth items larger
    const itemWidth = isLarge ? ITEM_SIZE * 2 + ITEM_SPACING : ITEM_SIZE;
    const itemHeight = isLarge ? ITEM_SIZE * 1.3 : ITEM_SIZE;

    return (
      <TouchableOpacity 
        style={[
          styles.exploreItem, 
          { 
            width: itemWidth,
            height: itemHeight,
            marginLeft: index % 3 === 0 ? 0 : ITEM_SPACING,
            marginTop: index < 3 ? 0 : ITEM_SPACING
          }
        ]}
      >
        <Image 
          source={{ uri: item.posterUrl }} 
          style={styles.exploreImage} 
          resizeMode="cover"
        />
        
        {item.isVideo && (
          <View style={styles.videoIndicator}>
            <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
          </View>
        )}
        
        <View style={styles.exploreOverlay}>
          <Text style={styles.viewCount}>{item.views}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TrendingUp size={18} color="#262626" />
        <Text style={styles.headerText}>Trending Now</Text>
      </View>
      
      <View style={styles.grid}>
        <FlatList
          data={exploreData}
          renderItem={renderExploreItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.gridContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingBottom: 100, // Space for bottom tab bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
  },
  grid: {
    paddingHorizontal: 16,
  },
  gridContent: {
    paddingBottom: 16,
  },
  exploreItem: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F6F6F6',
  },
  exploreImage: {
    width: '100%',
    height: '100%',
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  viewCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontFamily: 'Inter-SemiBold',
  },
});