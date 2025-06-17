import React from 'react';
import { Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface ResponsiveTagButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
  maxWidth?: number;
  minWidth?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(
  Platform.select({
    web: 'button',
    default: require('react-native').Pressable,
  }) as any
);

export default function ResponsiveTagButton({
  title,
  isSelected,
  onPress,
  maxWidth = width * 0.35,
  minWidth = 60,
}: ResponsiveTagButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withSpring(1);
  };

  const webStyles = Platform.OS === 'web' ? {
    cursor: 'pointer',
    userSelect: 'none' as const,
    outline: 'none',
    border: 'none',
  } : {};

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[
        styles.button,
        isSelected && styles.selectedButton,
        { maxWidth, minWidth },
        animatedStyle,
        webStyles,
      ]}
    >
      <Text 
        style={[
          styles.text,
          isSelected && styles.selectedText
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
    // Enhanced shadow for better depth perception
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    // Web-specific hover effects
    ...(Platform.OS === 'web' && {
      transition: 'all 0.2s ease-in-out',
    }),
  },
  selectedButton: {
    backgroundColor: '#FF375F',
    shadowColor: '#FF375F',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    flexShrink: 1,
  },
  selectedText: {
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});