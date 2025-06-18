export interface UserData {
  id: string;
  username: string;
  avatarUrl: string;
  isFollowing?: boolean;
  hasStory?: boolean;
  followerCount?: number;
  followingCount?: number;
}

export interface PostData {
  id: string;
  user: UserData;
  type: 'image' | 'video';
  thumbnailUrl: string;
  fullUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  timestamp: string;
}

export interface ReelData {
  id: string;
  user: UserData;
  videoUrl: string;
  posterUrl: string;
  caption: string;
  audioName?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

export interface CommentData {
  id: string;
  user: UserData;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  replies?: CommentData[];
}

export interface AudioData {
  id: string;
  name: string;
  artist: string;
  duration: number;
  coverUrl: string;
  usageCount: number;
}

export interface NotificationData {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: UserData;
  content?: string;
  timestamp: string;
  read: boolean;
  targetId?: string;
  targetType?: 'reel' | 'comment' | 'profile';
}