import { CloudType } from '@/types';

export const cloudNames: Record<CloudType, string> = {
  baidu: '百度网盘',
  aliyun: '阿里云盘',
  quark: '夸克网盘',
  tianyi: '天翼云盘',
  uc: 'UC网盘',
  mobile: '移动云盘',
  '115': '115网盘',
  pikpak: 'PikPak',
  xunlei: '迅雷云盘',
  '123': '123云盘',
  magnet: '磁力链接',
  ed2k: 'ED2K链接'
};

export const cloudColors: Record<CloudType, string> = {
  baidu: 'bg-blue-600',
  aliyun: 'bg-emerald-500',
  quark: 'bg-purple-600',
  tianyi: 'bg-red-500',
  uc: 'bg-orange-500',
  mobile: 'bg-green-600',
  '115': 'bg-orange-600',
  pikpak: 'bg-indigo-500',
  xunlei: 'bg-blue-500',
  '123': 'bg-cyan-500',
  magnet: 'bg-gray-700',
  ed2k: 'bg-gray-600'
};
