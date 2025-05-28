import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import Avatar from '../../../components/ui/Avatar';
import { mockUsers } from '../../../utils/mockData';
import { Search, CreditCard as Edit } from 'lucide-react-native';
import IconButton from '../../../components/ui/IconButton';

export default function MessagesScreen() {
  const renderItem = ({ item: user }) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => router.push(`/messages/${user.id}`)}
    >
      <Avatar source={{ uri: user.avatarUrl }} size={50} hasStory={user.hasStory} />
      <View style={styles.chatInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.lastMessage}>Hey! Check out my latest video 🎥</Text>
      </View>
      <Text style={styles.timestamp}>2h ago</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Messages</Text>
          <View style={styles.headerRight}>
            <IconButton
              icon={Search}
              onPress={() => {}}
              style={styles.headerIcon}
            />
            <IconButton
              icon={Edit}
              onPress={() => {}}
              style={styles.headerIcon}
            />
          </View>
        </View>

        <FlatList
          data={mockUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Inter-Regular',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
});