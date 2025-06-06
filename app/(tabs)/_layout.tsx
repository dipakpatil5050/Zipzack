import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { Chrome as Home, Search, SquarePlus as PlusSquare, MessageCircle, User } from 'lucide-react-native';
import { usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const pathname = usePathname();
  const hideTabBar = pathname.includes('/messages/');
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: Platform.OS === 'ios',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#999999',
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
            height: Platform.OS === 'ios' ? 85 + insets.bottom : 70,
          },
          hideTabBar && styles.hiddenTabBar
        ],
        tabBarBackground: () => (
          Platform.OS !== 'web' ? (
            <BlurView
              tint="dark"
              intensity={80}
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
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <Search color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <PlusSquare color={color} size={size + 4} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: Platform.OS === 'web' ? 'rgba(18, 18, 18, 0.95)' : 'transparent',
    paddingTop: 8,
  },
  hiddenTabBar: {
    display: 'none',
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
});