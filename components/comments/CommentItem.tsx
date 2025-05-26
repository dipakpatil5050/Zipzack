import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from '../ui/Avatar';
import { CommentData } from '../../types';
import { Heart } from 'lucide-react-native';
import IconButton from '../ui/IconButton';

interface CommentItemProps {
  comment: CommentData;
  onLike?: () => void;
}

export default function CommentItem({ comment, onLike }: CommentItemProps) {
  const timeAgo = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval}y ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval}mo ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval}d ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval}h ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval}m ago`;
    
    return `${Math.floor(seconds)}s ago`;
  };

  return (
    <View style={styles.container}>
      <Avatar source={{ uri: comment.user.avatarUrl }} size={36} />
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>{comment.user.username}</Text>
          <Text style={styles.timestamp}>{timeAgo(new Date(comment.timestamp))}</Text>
        </View>
        
        <Text style={styles.text}>{comment.text}</Text>
        
        <View style={styles.actions}>
          <Text style={styles.reply}>Reply</Text>
          <Text style={styles.likes}>{comment.likes > 0 ? `${comment.likes} likes` : ''}</Text>
        </View>
      </View>
      
      <IconButton 
        icon={Heart} 
        size={16} 
        color={comment.isLiked ? '#FF375F' : '#777777'} 
        onPress={onLike || (() => {})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    color: '#888888',
    marginLeft: 8,
  },
  text: {
    fontSize: 14,
    color: '#EEEEEE',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  reply: {
    fontSize: 12,
    color: '#888888',
    marginRight: 16,
  },
  likes: {
    fontSize: 12,
    color: '#888888',
  },
});