import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Phone, Video } from 'lucide-react-native';
import Avatar from '../../../components/ui/Avatar';
import ChatBubble from '../../../components/chat/ChatBubble';
import ChatInput from '../../../components/chat/ChatInput';
import { mockUsers } from '../../../utils/mockData';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSender: boolean;
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);
  
  // Find the user from mock data
  const user = mockUsers.find(u => u.id === id) || mockUsers[0];

  // Generate some initial messages
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        text: 'Hey! How are you?',
        timestamp: '2:30 PM',
        isSender: true,
      },
      {
        id: '2',
        text: 'I'm good, thanks! Just saw your latest post 🔥',
        timestamp: '2:31 PM',
        isSender: false,
      },
      {
        id: '3',
        text: 'Thanks! I spent a lot of time on that one',
        timestamp: '2:32 PM',
        isSender: true,
      },
    ];
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate received message
    setTimeout(() => {
      const receivedMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! I'll get back to you soon.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: false,
      };
      setMessages(prev => [...prev, receivedMessage]);
    }, 1000);
  };

  const handleSendHeart = () => {
    handleSendMessage('❤️');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Avatar source={{ uri: user.avatarUrl }} size={36} hasStory={user.hasStory} />
            <View style={styles.userTextInfo}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.activeStatus}>Active now</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone color="#FFFFFF" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Video color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <ChatBubble
              message={item.text}
              timestamp={item.timestamp}
              isSender={item.isSender}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          onLayout={() => flatListRef.current?.scrollToEnd()}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          onSendHeart={handleSendHeart}
          onSendImage={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTextInfo: {
    marginLeft: 12,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  activeStatus: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  messagesList: {
    padding: 16,
  },
});