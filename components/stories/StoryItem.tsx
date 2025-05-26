import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Avatar from '../ui/Avatar';
import { UserData } from '../../types';

interface StoryItemProps {
  user: UserData;
  onPress: () => void;
}

export default function StoryItem({ user, onPress }: StoryItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar 
        source={{ uri: user.avatarUrl }} 
        size={70} 
        hasStory={user.hasStory} 
      />
      <Text style={styles.username} numberOfLines={1}>
        {user.username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 80,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});