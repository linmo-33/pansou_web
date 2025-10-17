import React from 'react';
import { CloudType, PanLink } from '@/types';
import { cloudNames, cloudColors } from '@/constants/cloudTypes';

interface SearchResultsProps {
  type: CloudType;
  links: PanLink[];
  displayLimit: number;
  onLoadMore: () => void;
  onCopy: (text: string) => void;
}

export default function SearchResults({ type, links, displayLimit, onLoadMore, onCopy }: SearchResultsProps) {
  const color = cloudColors[type] || 'bg-gray-500';
  const name = cloudNames[type] || type;

  return (
    <section
      className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      aria-labelledby={`${type}-heading`}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${color} flex items-center justify-center shadow-lg`} aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl"></div>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div>
            <h2 id={`${type}-heading`} className="text-lg sm:text-xl font-bold text-gray-800">{name}</h2>
            <span className="text-xs sm:text-sm text-gray-500" aria-label={`共${links.length}个资源`}>{links.length} 个资源</span>
          </div>
        </div>
        <div className={`min-w-[50px] sm:min-w-[60px] h-[50px] sm:h-[60px] rounded-xl sm:rounded-2xl ${color} flex items-center justify-center shadow-lg`} aria-hidden="true">
          <span className="text-2xl sm:text-3xl font-bold text-white">{links.length}</span>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4" role="list">
        {links.slice(0, displayLimit).map((link, index) => (
          <article
            key={index}
            className="group bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-5 transition-all hover:shadow-md hover:border-blue-300"
            role="listitem"
          >
            {link.note && (
              <div className="flex items-start gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-gray-500 block mb-0.5">资源名称</span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base break-words">{link.note}</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span className={`px-2 sm:px-3 py-0.5 sm:py-1 ${link.source.startsWith('tg:') ? 'bg-blue-500' : 'bg-emerald-500'} text-white rounded-full text-xs font-medium shadow-sm flex items-center gap-1`}>
                {link.source.startsWith('tg:') ? (
                  <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                    <span className="hidden sm:inline">{link.source.replace('tg:', '')}</span>
                    <span className="sm:hidden">TG</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
                    </svg>
                    <span className="hidden sm:inline">{link.source}</span>
                    <span className="sm:hidden">Plugin</span>
                  </>
                )}
              </span>
              <span className="text-gray-500 flex items-center gap-1 text-xs">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="hidden sm:inline">{new Date(link.datetime).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                <span className="sm:hidden">{new Date(link.datetime).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })}</span>
              </span>
              <span className={`${color} text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium shadow-sm`}>
                {name}
              </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-xs text-gray-500">分享链接</span>
              </div>
              <code className="block text-xs sm:text-sm text-blue-600 break-all font-mono pl-0 sm:pl-6">
                {link.url}
              </code>
            </div>

            {link.password && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span className="text-xs sm:text-sm text-amber-800 font-medium">提取码:</span>
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-600 text-white rounded-md font-mono text-xs sm:text-sm font-bold tracking-wider">
                    {link.password}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 justify-between mt-3 sm:mt-4 flex-wrap">
              {link.images && link.images.length > 0 && (
                <div className="flex gap-1.5 sm:gap-2" role="group" aria-label="资源预览图">
                  {link.images.slice(0, 3).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`资源预览图 ${i + 1}`}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors shadow-sm"
                      loading="lazy"
                    />
                  ))}
                  {link.images.length > 3 && (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center" aria-label={`还有${link.images.length - 3}张图片`}>
                      <span className="text-xs text-gray-500 font-medium">+{link.images.length - 3}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                <button
                  onClick={() => onCopy(link.url)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 text-xs sm:text-sm font-medium transition-all flex items-center gap-1"
                  aria-label="复制链接到剪贴板"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">复制</span>
                </button>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-1"
                  aria-label={`在新窗口打开${link.note || '资源'}`}
                >
                  打开
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 加载更多按钮 */}
      {links.length > displayLimit && (
        <div className="mt-6 text-center">
          <button
            onClick={onLoadMore}
            className="group px-8 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-400 text-blue-600 rounded-xl hover:from-blue-500 hover:to-purple-500 hover:text-white font-medium transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2"
            aria-label={`加载更多${name}资源，还有${links.length - displayLimit}个`}
          >
            <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span>加载更多</span>
            <span className="px-2 py-0.5 bg-blue-100 group-hover:bg-white/20 text-blue-600 group-hover:text-white rounded-full text-xs font-bold" aria-hidden="true">
              {links.length - displayLimit}
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
