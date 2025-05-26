import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { mockUsers, mockReels } from '../../../utils/mockData';
import Button from '../../../components/ui/Button';
import { Settings, Grid2x2 as Grid, Bookmark, Play } from 'lucide-react-native';
import IconButton from '../../../components/ui/IconButton';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_SIZE = (width - (COLUMN_COUNT - 1) * 2) / COLUMN_COUNT;

// Use first user as the profile
const profileUser = mockUsers[0];

// Filter reels for this user
const userReels = mockReels.filter((_, index) => index % 2 === 0);

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return count.toString();
    }
  };
  
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
      
      {/* Video indicator */}
      <View style={styles.videoIndicator}>
        <Play size={14} color="#FFFFFF" fill="#FFFFFF" />
      </View>
      
      {/* View count */}
      <View style={styles.viewsContainer}>
        <Text style={styles.viewCount}>{formatCount(item.likes)}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.username}>@{profileUser.username}</Text>
          <IconButton 
            icon={Settings} 
            onPress={() => router.push('/profile/settings')} 
            color="#FFFFFF" 
          />
        </View>
        
        <View style={styles.profileSection}>
          <Image source={{ uri: profileUser.avatarUrl }} style={styles.profileImage} />
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatCount(userReels.length)}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatCount(profileUser.followerCount || 0)}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatCount(profileUser.followingCount || 0)}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.bioSection}>
          <Text style={styles.displayName}>Jessica Hayes</Text>
          <Text style={styles.bio}>Creating daily content about fashion, travel and lifestyle ✨</Text>
          <Text style={styles.bio}>Los Angeles, CA</Text>
        </View>
        
        <View style={styles.actionSection}>
          <Button 
            title="Edit Profile" 
            variant="outline"
            onPress={() => router.push('/profile/edit')}
            style={styles.editButton}
          />
          
          <Button 
            title="Share Profile" 
            variant="outline"
            onPress={() => {}}
            style={styles.shareButton}
          />
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]} 
            onPress={() => setActiveTab('posts')}
          >
            <Grid size={24} color={activeTab === 'posts' ? '#FFFFFF' : '#888888'} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]} 
            onPress={() => setActiveTab('saved')}
          >
            <Bookmark size={24} color={activeTab === 'saved' ? '#FFFFFF' : '#888888'} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={activeTab === 'posts' ? userReels : []}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          numColumns={COLUMN_COUNT}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {activeTab === 'posts' ? 'No posts yet' : 'No saved posts'}
              </Text>
            </View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FF375F',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#BBBBBB',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  bioSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  displayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  bio: {
    fontSize: 14,
    color: '#DDDDDD',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  actionSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  editButton: {
    flex: 1,
    marginRight: 8,
  },
  shareButton: {
    flex: 1,
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222222',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
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
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewsContainer: {
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
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});