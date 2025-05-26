import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import {
  Bell,
  Lock,
  Shield,
  CircleHelp as HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Moon,
} from 'lucide-react-native';

type SettingItemProps = {
  icon: React.ComponentType<{ size: number; color: string }>;
  title: string;
  value?: string;
  onPress: () => void;
  showToggle?: boolean;
  isToggled?: boolean;
  showArrow?: boolean;
};

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  const handleLogout = () => {
    router.replace('/auth/login');
  };

  const SettingItem: React.FC<SettingItemProps> = ({
    icon: Icon,
    title,
    value,
    onPress,
    showToggle,
    isToggled,
    showArrow = true,
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Icon size={22} color="#FFFFFF" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {value && <Text style={styles.settingValue}>{value}</Text>}
      </View>
      {showToggle ? (
        <Switch
          value={isToggled}
          onValueChange={onPress}
          trackColor={{ false: '#333', true: '#FF375F' }}
          thumbColor={isToggled ? '#FFFFFF' : '#FFFFFF'}
        />
      ) : showArrow ? (
        <ChevronRight size={20} color="#666" />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.section}>
        <SettingItem
          icon={Moon}
          title="Dark Mode"
          showToggle
          isToggled={darkMode}
          onPress={() => setDarkMode(!darkMode)}
        />
        <SettingItem
          icon={Bell}
          title="Notifications"
          showToggle
          isToggled={notifications}
          onPress={() => setNotifications(!notifications)}
        />
      </View>

      <Text style={styles.sectionTitle}>Privacy & Security</Text>
      <View style={styles.section}>
        <SettingItem
          icon={Lock}
          title="Account Privacy"
          value="Public"
          onPress={() => {}}
        />
        <SettingItem icon={Shield} title="Security" onPress={() => {}} />
      </View>

      <Text style={styles.sectionTitle}>Support</Text>
      <View style={styles.section}>
        <SettingItem icon={HelpCircle} title="Help Center" onPress={() => {}} />
        <SettingItem
          icon={Info}
          title="About"
          value="Version 1.0.0"
          onPress={() => {}}
          showArrow={false}
        />
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={22} color="#FF375F" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 16,
    fontFamily: 'Inter-Medium',
  },
  section: {
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
  logoutSection: {
    padding: 16,
    marginTop: 24,
    marginBottom: Platform.OS === 'ios' ? 40 : 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF375F',
  },
  logoutText: {
    color: '#FF375F',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
  },
});


// Add new Features 
// 1. add story feature on main screen on the top of the screen Cricular and horizontally like instagram story section,
// 2. add Messaging feature chat fearture screen to chat  and take that chat option on tab 
