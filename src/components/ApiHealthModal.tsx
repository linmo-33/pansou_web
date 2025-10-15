import React from 'react';
import { HealthInfo } from '@/types';

interface ApiHealthModalProps {
  show: boolean;
  healthInfo: HealthInfo | null;
  onClose: () => void;
}

export default function ApiHealthModal({ show, healthInfo, onClose }: ApiHealthModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* 固定头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">API 服务状态</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 可滚动内容区域 */}
        <div className="overflow-y-auto px-6 py-6 flex-1">
          {healthInfo ? (
            <div className="space-y-4">
              {/* 主要状态卡片 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-0.5">服务状态</div>
                    <div className="text-2xl font-bold text-green-600">
                      {healthInfo.status === 'ok' ? '正常运行' : healthInfo.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* 功能状态 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div className="text-sm font-medium text-gray-600">认证功能</div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {healthInfo.auth_enabled ? (
                      <span className="text-green-600">✓ 已启用</span>
                    ) : (
                      <span className="text-gray-400">未启用</span>
                    )}
                  </div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <div className="text-sm font-medium text-gray-600">插件功能</div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {healthInfo.plugins_enabled ? (
                      <span className="text-green-600">✓ 已启用</span>
                    ) : (
                      <span className="text-gray-400">未启用</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 插件列表 */}
              {healthInfo.plugins && healthInfo.plugins.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <div className="font-semibold text-gray-700 text-sm">
                      已启用插件
                      <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white rounded-full text-xs font-semibold">
                        {healthInfo.plugin_count}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {healthInfo.plugins.map((plugin: string, index: number) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-white border-2 border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:border-blue-400 transition-colors"
                      >
                        {plugin}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 频道列表 */}
              {healthInfo.channels && healthInfo.channels.length > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div className="font-semibold text-gray-700 text-sm">
                      Telegram 频道
                      <span className="ml-2 px-2 py-0.5 bg-purple-500 text-white rounded-full text-xs font-semibold">
                        {healthInfo.channels_count}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {healthInfo.channels.map((channel: string, index: number) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-white border-2 border-purple-200 text-purple-700 rounded-lg text-sm font-medium hover:border-purple-400 transition-colors"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">无法连接到 API 服务</div>
              <div className="text-sm text-gray-500">请检查网络连接或稍后重试</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
