import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StoryItem from './StoryItem';
import { UserData } from '../../types';
import { mockUsers } from '../../utils/mockData';

export default function StoriesList() {
  const handleStoryPress = (user: UserData) => {
    // Handle story press
    console.log('Story pressed:', user.username);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {mockUsers.map((user) => (
          <StoryItem
            key={user.id}
            user={user}
            onPress={() => handleStoryPress(user)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});