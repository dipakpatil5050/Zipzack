import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  isSender: boolean;
}

export default function ChatBubble({ message, timestamp, isSender }: ChatBubbleProps) {
  return (
    <View style={[
      styles.container,
      isSender ? styles.senderContainer : styles.receiverContainer
    ]}>
      <Text style={[
        styles.messageText,
        isSender ? styles.senderText : styles.receiverText
      ]}>
        {message}
      </Text>
      <Text style={[
        styles.timestamp,
        isSender ? styles.senderTimestamp : styles.receiverTimestamp
      ]}>
        {timestamp}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 20,
  },
  senderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF375F',
    borderBottomRightRadius: 4,
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#333333',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  senderText: {
    color: '#FFFFFF',
  },
  receiverText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  senderTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  receiverTimestamp: {
    color: '#888888',
  },
});