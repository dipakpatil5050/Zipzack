import { ReelData, CommentData, UserData } from '../types';

// Mock Users
export const mockUsers: UserData[] = [
  {
    id: 'user1',
    username: 'jessicahayes',
    avatarUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    isFollowing: false,
    hasStory: true,
    followerCount: 1543000,
    followingCount: 123
  },
  {
    id: 'user2',
    username: 'michaeldance',
    avatarUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    isFollowing: true,
    hasStory: false,
    followerCount: 456000,
    followingCount: 234
  },
  {
    id: 'user3',
    username: 'travelwithsam',
    avatarUrl: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    isFollowing: false,
    hasStory: true,
    followerCount: 2100000,
    followingCount: 165
  },
  {
    id: 'user4',
    username: 'fitnesstrainer',
    avatarUrl: 'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    isFollowing: true,
    hasStory: true,
    followerCount: 789000,
    followingCount: 345
  },
  {
    id: 'user5',
    username: 'creativecook',
    avatarUrl: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    isFollowing: false,
    hasStory: false,
    followerCount: 356000,
    followingCount: 275
  }
];

// Mock Reels
export const mockReels: ReelData[] = [
  {
    id: 'reel1',
    user: mockUsers[0],
    videoUrl: 'https://assets.mixkit.co/videos/47005/47005-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/47005/47005-720.mp4',
    caption: 'Money Money 🤑💴💸! ☀️ #morningvibes #selfcare',
    audioName: 'Original Sound - Yo Yo hony sing ',
    likes: 124500,
    comments: 1200,
    shares: 450,
    isLiked: false
  },
  {
    id: 'reel2',
    user: mockUsers[1],
    videoUrl: 'https://assets.mixkit.co/qi90kl6bw08frnw8zklcpfyzzowk',
    posterUrl: 'https://assets.mixkit.co/qi90kl6bw08frnw8zklcpfyzzowk',
    caption: 'When the beat drops 🔥 #dance #streetdance',
    audioName: 'Beat It - Michael Jackson',
    likes: 987600,
    comments: 5600,
    shares: 12300,
    isLiked: true
  },
  {
    id: 'reel3',
    user: mockUsers[2],
    videoUrl: 'https://assets.mixkit.co/videos/1038/1038-720.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/1038/1038-720.mp4',
    caption: 'Found this hidden gem in Norway 🏔️ #travel #norway #nature',
    audioName: 'Adventure - Sam Smith',
    likes: 456700,
    comments: 3400,
    shares: 5600,
    isLiked: false
  },
  {
    id: 'reel4',
    user: mockUsers[3],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-on-a-terrace-4820-large.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-on-a-terrace-4820-large.mp4',
    caption: 'Morning yoga routine for beginners 🧘‍♀️ #yoga #fitness #wellness',
    audioName: 'Calm Morning - Yoga Vibes',
    likes: 234500,
    comments: 1700,
    shares: 3400,
    isLiked: false
  },
  {
    id: 'reel5',
    user: mockUsers[4],
    videoUrl: 'https://assets.mixkit.co/videos/2385/2385-360.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/2385/2385-360.mp4',
    caption: 'Easy 15-minute dinner recipe 🍳 #food #cooking #quickrecipe',
    audioName: 'Kitchen Beats - Food Network',
    likes: 345600,
    comments: 2300,
    shares: 4500,
    isLiked: true
  },
  {
    id: 'reel6',
    user: mockUsers[0],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-shot-of-a-watches-mechanisms-42622-large.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-shot-of-a-watches-mechanisms-42622-large.mp4',
    caption: 'The art of watchmaking ⌚ #craft #watches #luxury',
    audioName: 'Tick Tock - Timepiece',
    likes: 156700,
    comments: 890,
    shares: 2300,
    isLiked: false
  },
  {
    id: 'reel7',
    user: mockUsers[1],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-in-a-disco-4765-large.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-in-a-disco-4765-large.mp4',
    caption: 'Weekend vibes 🎧 #dj #music #nightlife',
    audioName: 'Club Mix - DJ Beat',
    likes: 789000,
    comments: 4500,
    shares: 8900,
    isLiked: true
  },
  {
    id: 'reel8',
    user: mockUsers[2],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-flowing-down-a-cliff-to-the-ocean-4858-large.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-flowing-down-a-cliff-to-the-ocean-4858-large.mp4',
    caption: 'The power of nature 🌊 #ocean #waves #coast',
    audioName: 'Ocean Sounds - Nature Relaxation',
    likes: 567800,
    comments: 2100,
    shares: 3400,
    isLiked: false
  },
  {
    id: 'reel9',
    user: mockUsers[3],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-with-a-kettlebell-4506-large.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-with-a-kettlebell-4506-large.mp4',
    caption: 'Kettlebell workout for strength 💪 #fitness #workout #strength',
    audioName: 'Workout Motivation - Fitness Tracks',
    likes: 345600,
    comments: 1900,
    shares: 2800,
    isLiked: true
  },
  {
    id: 'reel10',
    user: mockUsers[4],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-making-a-smoothie-in-a-blender-40804-large.mp4',
    posterUrl: 'https://assets.mixkit.co/videos/preview/mixkit-making-a-smoothie-in-a-blender-40804-large.mp4',
    caption: 'Healthy breakfast smoothie recipe 🥤 #breakfast #healthy #smoothie',
    audioName: 'Morning Bliss - Health Channel',
    likes: 234500,
    comments: 1500,
    shares: 3400,
    isLiked: false
  }
];

// Mock Comments
export const mockComments: CommentData[] = [
  {
    id: 'comment1',
    user: mockUsers[1],
    text: 'This looks amazing! 😍',
    timestamp: '2023-06-15T10:23:00Z',
    likes: 45,
    isLiked: true
  },
  {
    id: 'comment2',
    user: mockUsers[2],
    text: 'I need to try this! Which location is this?',
    timestamp: '2023-06-15T11:34:00Z',
    likes: 23,
    isLiked: false
  },
  {
    id: 'comment3',
    user: mockUsers[3],
    text: 'Your content is always so inspiring!',
    timestamp: '2023-06-15T12:45:00Z',
    likes: 67,
    isLiked: true
  },
  {
    id: 'comment4',
    user: mockUsers[4],
    text: 'Great job! Keep it up 👏',
    timestamp: '2023-06-15T14:12:00Z',
    likes: 19,
    isLiked: false
  },
  {
    id: 'comment5',
    user: mockUsers[0],
    text: 'Thanks for sharing your tips!',
    timestamp: '2023-06-15T15:23:00Z',
    likes: 34,
    isLiked: true
  }
];