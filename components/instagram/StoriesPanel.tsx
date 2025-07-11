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

export default function StoriesPanel() {
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
            <View style={styles.addStoryInner}>
              <Plus size={20} color="#FFFFFF" strokeWidth={3} />
            </View>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 12,
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
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  addStoryInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0095F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addStoryText: {
    color: '#262626',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});