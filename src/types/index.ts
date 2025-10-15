export type CloudType = 'baidu' | 'aliyun' | 'quark' | 'tianyi' | 'uc' | 'mobile' | '115' | 'pikpak' | 'xunlei' | '123' | 'magnet' | 'ed2k';

export interface PanLink {
  url: string;
  password: string;
  note: string;
  datetime: string;
  source: string;
  images?: string[];
}

export interface SearchResult {
  total: number;
  merged_by_type: Partial<Record<CloudType, PanLink[]>>;
}

export interface HealthInfo {
  status: string;
  auth_enabled: boolean;
  plugins_enabled: boolean;
  plugins?: string[];
  plugin_count?: number;
  channels?: string[];
  channels_count?: number;
}
