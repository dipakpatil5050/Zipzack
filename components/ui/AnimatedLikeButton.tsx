import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface FloatingHeart {
  id: string;
}

const FloatingHeartComponent = React.memo(({ 
  heart, 
  onAnimationComplete 
}: { 
  heart: FloatingHeart;
  onAnimationComplete: (id: string) => void;
}) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const floatingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: (Math.random() - 0.5) * 40 }, // Random horizontal movement
      ],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    // Start the animation when component mounts
    translateY.value = withTiming(-100, { duration: 1500 });
    opacity.value = withSequence(
      withTiming(1, { duration: 200 }),
      withTiming(0, { duration: 1300 })
    );

    // Remove the heart after animation completes
    const timer = setTimeout(() => {
      onAnimationComplete(heart.id);
    }, 1500);

    return () => clearTimeout(timer);
  }, [heart.id, onAnimationComplete, translateY, opacity]);

  return (
    <Animated.View style={[styles.floatingHeart, floatingStyle]}>
      <Heart size={20} color="#FF0000" fill="#FF0000" />
    </Animated.View>
  );
});

interface AnimatedLikeButtonProps {
  isLiked: boolean;
  onPress: () => void;
  size?: number;
}

export default function AnimatedLikeButton({ 
  isLiked, 
  onPress, 
  size = 28 
}: AnimatedLikeButtonProps) {
  const scale = useSharedValue(1);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const heartContainer = useRef<View>(null);

  // Heart scale animation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Trigger animations when liked state changes
  useEffect(() => {
    if (isLiked) {
      // Scale animation for the main heart
      scale.value = withSequence(
        withSpring(1.2, { damping: 10, stiffness: 200 }),
        withSpring(1.0, { damping: 10, stiffness: 200 })
      );

      // Create floating heart animation
      createFloatingHeart();
    }
  }, [isLiked]);

  const createFloatingHeart = () => {
    const heartId = Date.now().toString();
    const floatingHeart: FloatingHeart = {
      id: heartId,
    };

    setFloatingHearts(prev => [...prev, floatingHeart]);
  };

  const removeFloatingHeart = (heartId: string) => {
    setFloatingHearts(prev => prev.filter(heart => heart.id !== heartId));
  };

  return (
    <View style={styles.container} ref={heartContainer}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Animated.View style={animatedStyle}>
          <Heart 
            size={size} 
            color={isLiked ? '#FF0000' : '#FFFFFF'} 
            fill={isLiked ? '#FF0000' : 'transparent'}
            strokeWidth={2}
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Floating hearts */}
      {floatingHearts.map((heart) => (
        <FloatingHeartComponent 
          key={heart.id} 
          heart={heart} 
          onAnimationComplete={removeFloatingHeart}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  floatingHeart: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
});