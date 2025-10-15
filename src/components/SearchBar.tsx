import React from 'react';

interface SearchBarProps {
  keyword: string;
  loading: boolean;
  onKeywordChange: (keyword: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export default function SearchBar({ keyword, loading, onKeywordChange, onSearch }: SearchBarProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="flex-1 relative group">
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="搜索你想要的资源..."
            className="w-full h-12 sm:h-14 px-4 sm:px-6 pl-11 sm:pl-14 bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm hover:shadow-md text-base sm:text-lg"
          />
          <svg className="w-5 h-5 sm:w-6 sm:h-6 absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {keyword && (
            <button
              type="button"
              onClick={() => onKeywordChange('')}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="w-full sm:w-auto px-6 sm:px-10 h-12 sm:h-14 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              搜索中
            </div>
          ) : '搜索'}
        </button>
      </form>
    </div>
  );
}
