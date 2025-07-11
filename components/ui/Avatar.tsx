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
      <Container onPress={onPress} style={[styles.container, { width: size + 4, height: size + 4 }]}>
        <LinearGradient
          colors={['#F58529', '#DD2A7B', '#8134AF', '#515BD4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.storyRing, { width: size + 4, height: size + 4, borderRadius: (size + 4) / 2 }]}
        >
          <View style={[styles.storyInner, { width: size, height: size, borderRadius: size / 2 }]}>
            <Image
              source={source}
              style={[styles.image, { width: size - 4, height: size - 4, borderRadius: (size - 4) / 2 }]}
            />
          </View>
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
    backgroundColor: '#F6F6F6',
  },
  storyRing: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  storyInner: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
});