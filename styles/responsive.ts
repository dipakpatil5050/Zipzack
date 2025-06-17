import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Breakpoints for responsive design
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

// Get current device type
export const getDeviceType = () => {
  if (Platform.OS === 'web') {
    if (width >= breakpoints.desktop) return 'desktop';
    if (width >= breakpoints.tablet) return 'tablet';
    return 'mobile';
  }
  
  // For native platforms
  if (width >= 768) return 'tablet';
  return 'mobile';
};

// Responsive spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Responsive font sizes
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Responsive dimensions
export const dimensions = {
  buttonHeight: {
    small: 32,
    medium: 40,
    large: 48,
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    pill: 999,
  },
};

// Helper functions for responsive design
export const isTablet = () => getDeviceType() === 'tablet';
export const isDesktop = () => getDeviceType() === 'desktop';
export const isMobile = () => getDeviceType() === 'mobile';

// Responsive value selector
export const responsiveValue = <T>(values: {
  mobile: T;
  tablet?: T;
  desktop?: T;
}): T => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'desktop':
      return values.desktop ?? values.tablet ?? values.mobile;
    case 'tablet':
      return values.tablet ?? values.mobile;
    default:
      return values.mobile;
  }
};

// Calculate responsive width
export const getResponsiveWidth = (percentage: number) => {
  return width * (percentage / 100);
};

// Calculate responsive height
export const getResponsiveHeight = (percentage: number) => {
  return height * (percentage / 100);
};

// Tag button specific responsive calculations
export const getTagButtonMaxWidth = () => {
  return responsiveValue({
    mobile: width * 0.35,
    tablet: width * 0.25,
    desktop: width * 0.15,
  });
};

export const getTagButtonMinWidth = () => {
  return responsiveValue({
    mobile: 60,
    tablet: 80,
    desktop: 100,
  });
};

export const getTagButtonSpacing = () => {
  return responsiveValue({
    mobile: spacing.sm,
    tablet: spacing.md,
    desktop: spacing.md,
  });
};