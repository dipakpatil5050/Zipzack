import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MessageCircle, Heart, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function InstagramHeader() {
  const handleMessagesPress = () => {
    router.push('/(tabs)/messages');
  };

  const handleNotificationsPress = () => {
    // Handle notifications
    console.log('Notifications pressed');
  };

  const handleCreatePress = () => {
    router.push('/(tabs)/create');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.logo}>Instagram</Text>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={handleCreatePress}
          activeOpacity={0.7}
        >
          <Plus size={24} color="#262626" strokeWidth={2} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={handleNotificationsPress}
          activeOpacity={0.7}
        >
          <Heart size={24} color="#262626" strokeWidth={2} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={handleMessagesPress}
          activeOpacity={0.7}
        >
          <MessageCircle size={24} color="#262626" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  leftSection: {
    flex: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#262626',
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
  },
});