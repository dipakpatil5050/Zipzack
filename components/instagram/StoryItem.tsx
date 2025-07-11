import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Avatar from '../ui/Avatar';
import { UserData } from '../../types';
import { LinearGradient } from 'expo-linear-gradient';

interface StoryItemProps {
  user: UserData;
  onPress: () => void;
}

export default function StoryItem({ user, onPress }: StoryItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {user.hasStory ? (
        <LinearGradient
          colors={['#F58529', '#DD2A7B', '#8134AF', '#515BD4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.storyRing}
        >
          <View style={styles.storyInner}>
            <Avatar 
              source={{ uri: user.avatarUrl }} 
              size={66} 
              hasStory={false}
            />
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.noStoryContainer}>
          <Avatar 
            source={{ uri: user.avatarUrl }} 
            size={70} 
            hasStory={false}
          />
        </View>
      )}
      <Text style={styles.username} numberOfLines={1}>
        {user.username.length > 10 ? user.username.substring(0, 10) + '...' : user.username}
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
  storyRing: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  storyInner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 2,
  },
  noStoryContainer: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    color: '#262626',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});