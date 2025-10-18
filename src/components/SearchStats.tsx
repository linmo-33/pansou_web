import React from 'react';

interface SearchStatsProps {
  total: number;
  searchTime: number;
}

export default function SearchStats({ total, searchTime }: SearchStatsProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-500">搜索结果</div>
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {total} 个资源
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{searchTime}ms</span>
        </div>
      </div>
    </div>
  );
}
