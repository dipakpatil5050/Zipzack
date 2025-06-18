import React from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Text,
  Dimensions 
} from 'react-native';
import { Plus } from 'lucide-react-native';
import StoryItem from './StoryItem';
import { UserData } from '../../types';
import { mockUsers } from '../../utils/mockData';

const { width } = Dimensions.get('window');

export default function StoriesHeader() {
  const handleAddStory = () => {
    console.log('Add story pressed');
  };

  const handleStoryPress = (user: UserData) => {
    console.log('Story pressed:', user.username);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
      >
        {/* Add Story Button */}
        <TouchableOpacity style={styles.addStoryContainer} onPress={handleAddStory}>
          <View style={styles.addStoryButton}>
            <Plus size={24} color="#FFFFFF" strokeWidth={2} />
          </View>
          <Text style={styles.addStoryText}>Your Story</Text>
        </TouchableOpacity>

        {/* Stories */}
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
    backgroundColor: '#000',
    borderBottomWidth: 0.5,
    borderBottomColor: '#222222',
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addStoryContainer: {
    alignItems: 'center',
    marginRight: 12,
    width: 70,
  },
  addStoryButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#555555',
    borderStyle: 'dashed',
  },
  addStoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});