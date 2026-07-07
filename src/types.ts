export interface CircularStage {
  id: string;
  name: string;
  emoji: string;
  description: string;
  input: string;
  output: string;
  efficiency: string;
  details: string;
  imageUrl?: string;
}

export interface HarvestProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface IoTDevice {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'inactive';
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  details: string;
}

export interface InstagramFeedItem {
  id: string;
  type: 'video' | 'image';
  thumbnail: string;
  caption: string;
  likes: string;
  comments: string;
}

export interface ConsultationLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  date: string;
  status: 'Unread' | 'Followed Up' | 'Closed';
}

export interface FaqItemCMS {
  id: string;
  category: string;
  question: string;
  answer: string;
  iconName: string; // 'sprout' | 'cpu' | 'zap' | 'landmark' | 'help'
}

export interface IoTModuleCMS {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  price?: string;
  isReady?: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'click' | 'lead' | 'sensor' | 'admin' | 'system';
  user?: string;
}

