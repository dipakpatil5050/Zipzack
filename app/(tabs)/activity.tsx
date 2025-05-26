import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import Avatar from '../../components/ui/Avatar';
import { mockUsers } from '../../utils/mockData';
import { NotificationData } from '../../types';

// Generate mock notification data
const generateMockNotifications = (): NotificationData[] => {
  const notificationTypes: Array<NotificationData['type']> = ['like', 'comment', 'follow', 'mention'];
  const notifications: NotificationData[] = [];
  
  // Today's notifications
  for (let i = 0; i < 5; i++) {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    
    notifications.push({
      id: `today-${i}`,
      type: randomType,
      user: randomUser,
      content: randomType === 'comment' ? 'Amazing video! 🔥' : 
               randomType === 'mention' ? 'Check out @yourusername\'s latest video!' : '',
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 12 * 60 * 60 * 1000)).toISOString(),
      read: Math.random() > 0.3,
      targetId: `reel${Math.floor(Math.random() * 10) + 1}`,
      targetType: 'reel'
    });
  }
  
  // This week's notifications
  for (let i = 0; i < 10; i++) {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    
    notifications.push({
      id: `week-${i}`,
      type: randomType,
      user: randomUser,
      content: randomType === 'comment' ? 'Love your content! Keep it up!' : 
               randomType === 'mention' ? 'You should collaborate with @yourusername!' : '',
      timestamp: new Date(Date.now() - (1 + Math.floor(Math.random() * 6)) * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      targetId: `reel${Math.floor(Math.random() * 10) + 1}`,
      targetType: 'reel'
    });
  }
  
  return notifications;
};

const mockNotifications = generateMockNotifications();

// Group notifications by time
const todayNotifications = mockNotifications.filter(n => {
  const notificationDate = new Date(n.timestamp);
  const today = new Date();
  return notificationDate.getDate() === today.getDate() &&
         notificationDate.getMonth() === today.getMonth() &&
         notificationDate.getFullYear() === today.getFullYear();
});

const thisWeekNotifications = mockNotifications.filter(n => {
  const notificationDate = new Date(n.timestamp);
  const today = new Date();
  const daysDiff = (today.getTime() - notificationDate.getTime()) / (1000 * 3600 * 24);
  return daysDiff > 1 && daysDiff <= 7;
});

export default function ActivityScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'mentions'>('all');
  
  const getNotificationMessage = (notification: NotificationData) => {
    switch (notification.type) {
      case 'like':
        return 'liked your video';
      case 'comment':
        return `commented: "${notification.content}"`;
      case 'follow':
        return 'started following you';
      case 'mention':
        return `mentioned you: "${notification.content}"`;
      default:
        return '';
    }
  };
  
  const renderNotificationItem = ({ item }: { item: NotificationData }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
    >
      <Avatar source={{ uri: item.user.avatarUrl }} size={46} hasStory={item.user.hasStory} />
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{item.user.username}</Text>
          {' '}
          {getNotificationMessage(item)}
        </Text>
        
        <Text style={styles.timestamp}>
          {formatTimestamp(new Date(item.timestamp))}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      return `${Math.floor(diffInHours / 24)}d`;
    }
  };
  
  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );
  
  const getNotificationsToShow = () => {
    // In a real app, you would filter based on activeTab
    return [
      { title: 'Today', data: todayNotifications },
      { title: 'This Week', data: thisWeekNotifications }
    ];
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Activity</Text>
          
          <View style={styles.tabBar}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'all' && styles.activeTab]} 
              onPress={() => setActiveTab('all')}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
                All
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'mentions' && styles.activeTab]} 
              onPress={() => setActiveTab('mentions')}
            >
              <Text style={[styles.tabText, activeTab === 'mentions' && styles.activeTabText]}>
                Mentions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          data={mockNotifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <>
              {todayNotifications.length > 0 && renderSectionHeader('Today')}
            </>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No notifications yet</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#333333',
  },
  tabText: {
    color: '#BBBBBB',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  listContent: {
    paddingBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginVertical: 12,
    paddingHorizontal: 16,
    fontFamily: 'Inter-SemiBold',
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  unreadNotification: {
    backgroundColor: 'rgba(255, 55, 95, 0.1)',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  notificationText: {
    fontSize: 14,
    color: '#FFFFFF',
    flexShrink: 1,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  username: {
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  timestamp: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
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