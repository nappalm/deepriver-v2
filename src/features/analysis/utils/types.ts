export interface MetricsData {
  documents: number;
  likes: number;
  authors: number;
  valuationMXN: number;
}

export interface MetricsProps {
  data: MetricsData;
}

export interface MetricCardProps {
  icon: any;
  label: string;
  value: string | number;
  iconColor: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface ChartProps {
  data: ChartDataPoint[];
  title?: string;
  color?: string;
}

export interface Topic {
  id: string;
  image: string;
  title: string;
  description: string;
  newsCount: number;
  type: string;
}

export interface TopicsProps {
  topics: Topic[];
  onTopicClick?: () => void;
}

export interface NewsItem {
  id: string;
  image: string;
  title: string;
  description: string;
  newsCount: number;
  type: string;
  date?: string;
}

export interface NewsProps {
  news: NewsItem[];
  onNewsClick?: () => void;
}
