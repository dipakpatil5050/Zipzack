import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { Home, Search, SquarePlus as PlusSquare, Play, User } from 'lucide-react-native';
import { usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const pathname = usePathname();
  const hideTabBar = pathname.includes('/messages/');
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#262626',
        tabBarInactiveTintColor: '#8E8E8E',
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
            height: Platform.OS === 'ios' ? 65 + insets.bottom : 60,
          },
          hideTabBar && styles.hiddenTabBar
        ],
        tabBarBackground: () => (
          Platform.OS !== 'web' ? (
            <BlurView
              tint="light"
              intensity={100}
              style={StyleSheet.absoluteFill}
            />
          ) : null
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Search color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <PlusSquare color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          title: 'Reels',
          tabBarIcon: ({ color, size }) => (
            <Play color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0.5,
    borderTopColor: '#DBDBDB',
    elevation: 0,
    backgroundColor: Platform.OS === 'web' ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
    paddingTop: 8,
  },
  hiddenTabBar: {
    display: 'none',
  },
});