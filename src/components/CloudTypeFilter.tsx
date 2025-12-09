import React from 'react';
import { CloudType, SearchResult } from '@/types';
import { cloudNames, cloudColors } from '@/constants/cloudTypes';

interface CloudTypeFilterProps {
  result: SearchResult;
  selectedType: CloudType | null;
  onTypeToggle: (type: CloudType) => void;
}

export default function CloudTypeFilter({ result, selectedType, onTypeToggle }: CloudTypeFilterProps) {
  const getTypeCount = (type: CloudType): number => {
    return result?.merged_by_type?.[type]?.length || 0;
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800">网盘筛选</h3>
            <span className="text-xs text-gray-500 hidden sm:inline">按平台查看资源</span>
          </div>
        </div>
        {selectedType && (
          <button
            onClick={() => onTypeToggle(selectedType)}
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="hidden sm:inline">清除筛选</span>
            <span className="sm:hidden">清除</span>
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {Object.entries(cloudNames).map(([type, name]) => {
          const count = getTypeCount(type as CloudType);
          if (count === 0) return null;
          const isSelected = selectedType === type;
          const color = cloudColors[type as CloudType] || 'bg-gray-500';
          return (
            <button
              key={type}
              onClick={() => onTypeToggle(type as CloudType)}
              className={`group relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all inline-flex items-center gap-2 ${isSelected
                ? `${color} text-white shadow-lg scale-105`
                : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md active:scale-95 sm:hover:scale-105'
                }`}
            >
              <span className="text-sm sm:text-base font-semibold whitespace-nowrap">{name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold leading-none ${isSelected
                ? 'bg-white/30 text-white'
                : 'bg-white text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                }`}>
                {count}
              </span>
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl pointer-events-none"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
