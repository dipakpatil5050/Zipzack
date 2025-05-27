import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView,
  StatusBar, 
  Platform,
  SafeAreaView,
  Pressable
} from 'react-native';
import { Search, TrendingUp, X } from 'lucide-react-native';
import { mockReels } from '../../utils/mockData';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
  withTiming 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_SIZE = (width - 4) / COLUMN_COUNT;

const trendingVideos = mockReels.map(reel => ({
  ...reel,
  views: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9) + 1}M`
}));

const categories = [
  'For You', 'Trending', 'Music', 'Gaming', 'Sports', 'Comedy', 
  'Food', 'Fitness', 'Beauty', 'Fashion', 'Travel', 'DIY'
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DiscoverScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('For You');
  
  const renderVideoItem = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity 
      style={[
        styles.videoItem, 
        { 
          marginLeft: index % COLUMN_COUNT === 0 ? 0 : 2,
          marginTop: index < COLUMN_COUNT ? 0 : 2
        }
      ]}
    >
      <Image source={{ uri: item.posterUrl }} style={styles.thumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.viewCount}>{item.views}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const CategoryButton = ({ category }: { category: string }) => {
    const scale = useSharedValue(1);
    const isSelected = selectedCategory === category;
    
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }]
      };
    });

    const handlePressIn = () => {
      scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1);
    };

    const handlePress = () => {
      setSelectedCategory(category);
    };

    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[
          styles.categoryItem,
          isSelected && styles.selectedCategory,
          animatedStyle
        ]}
      >
        <Text 
          style={[
            styles.categoryText,
            isSelected && styles.selectedCategoryText
          ]}
        >
          {category}
        </Text>
      </AnimatedPressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search videos, users, music"
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText ? (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <X size={18} color="#999" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <CategoryButton key={category} category={category} />
          ))}
        </ScrollView>
        
        <View style={styles.trendingHeader}>
          <TrendingUp size={18} color="#FF375F" />
          <Text style={styles.trendingText}>Trending Now</Text>
        </View>
        
        <FlatList
          data={trendingVideos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          numColumns={COLUMN_COUNT}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.videoList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
    backgroundColor: '#121212',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  categoriesContainer: {
    maxHeight: 50,
    marginBottom: 8,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
  },
  selectedCategory: {
    backgroundColor: '#FF375F',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  selectedCategoryText: {
    fontFamily: 'Inter-SemiBold',
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  trendingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  videoList: {
    paddingHorizontal: 0,
    paddingBottom: 16,
  },
  videoItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.8,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2A2A2A',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});