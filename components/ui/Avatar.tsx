import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AvatarProps {
  source: ImageSourcePropType;
  size?: number;
  onPress?: () => void;
  hasStory?: boolean;
}

export default function Avatar({ 
  source, 
  size = 40, 
  onPress, 
  hasStory = false 
}: AvatarProps) {
  const Container = onPress ? TouchableOpacity : View;
  
  if (hasStory) {
    return (
      <Container onPress={onPress} style={[styles.container, { width: size + 8, height: size + 8 }]}>
        <LinearGradient
          colors={['#FF1E6A', '#FF8337', '#FFDA33']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.storyRing, { width: size + 8, height: size + 8, borderRadius: (size + 8) / 2 }]}
        >
          <Image
            source={source}
            style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
          />
        </LinearGradient>
      </Container>
    );
  }
  
  return (
    <Container onPress={onPress} style={[styles.container, { width: size, height: size }]}>
      <Image
        source={source}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderWidth: 1,
    borderColor: '#1F1F1F',
  },
  storyRing: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
});