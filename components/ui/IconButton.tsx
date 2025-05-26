import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface IconButtonProps {
  icon: React.ComponentType<any>;
  onPress: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
  backgroundColor?: string;
  disabled?: boolean;
}

export default function IconButton({
  icon: Icon,
  onPress,
  size = 24,
  color = '#FFFFFF',
  backgroundColor = 'transparent',
  style,
  disabled = false,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor },
        style,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Icon size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
