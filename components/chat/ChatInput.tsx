import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Image, Heart, Send } from 'lucide-react-native';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendImage?: () => void;
  onSendHeart?: () => void;
}

export default function ChatInput({ onSendMessage, onSendImage, onSendHeart }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton} onPress={onSendImage}>
          <Image color="#FFFFFF" size={24} />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message..."
            placeholderTextColor="#888888"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={1000}
          />

          {!message.trim() && (
            <TouchableOpacity style={styles.heartButton} onPress={onSendHeart}>
              <Heart color="#FFFFFF" size={24} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.disabledSendButton]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Send color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  iconButton: {
    padding: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 20,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    minHeight: 40,
    maxHeight: 100,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 8,
    fontFamily: 'Inter-Regular',
  },
  heartButton: {
    padding: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF375F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#333333',
  },
});