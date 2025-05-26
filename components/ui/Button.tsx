import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({ 
  onPress, 
  title, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  style,
  textStyle
}: ButtonProps) {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    // Base size
    switch (size) {
      case 'small':
        buttonStyle = { ...buttonStyle, paddingVertical: 6, paddingHorizontal: 12 };
        break;
      case 'medium':
        buttonStyle = { ...buttonStyle, paddingVertical: 10, paddingHorizontal: 16 };
        break;
      case 'large':
        buttonStyle = { ...buttonStyle, paddingVertical: 14, paddingHorizontal: 20 };
        break;
    }
    
    // Variant
    switch (variant) {
      case 'primary':
        buttonStyle = { 
          ...buttonStyle, 
          backgroundColor: disabled ? '#555555' : '#FF375F' 
        };
        break;
      case 'secondary':
        buttonStyle = { 
          ...buttonStyle, 
          backgroundColor: disabled ? '#333333' : '#333333'
        };
        break;
      case 'outline':
        buttonStyle = { 
          ...buttonStyle, 
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? '#555555' : '#FF375F'
        };
        break;
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let txtStyle: TextStyle = {};
    
    // Size
    switch (size) {
      case 'small':
        txtStyle = { ...txtStyle, fontSize: 14 };
        break;
      case 'medium':
        txtStyle = { ...txtStyle, fontSize: 16 };
        break;
      case 'large':
        txtStyle = { ...txtStyle, fontSize: 18 };
        break;
    }
    
    // Variant
    switch (variant) {
      case 'primary':
      case 'secondary':
        txtStyle = { 
          ...txtStyle, 
          color: disabled ? '#AAAAAA' : '#FFFFFF'
        };
        break;
      case 'outline':
        txtStyle = { 
          ...txtStyle, 
          color: disabled ? '#AAAAAA' : '#FF375F'
        };
        break;
    }
    
    return txtStyle;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        style,
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? '#FF375F' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.7,
  },
});