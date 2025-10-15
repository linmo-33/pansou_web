'use client';

import { useState, useEffect } from 'react';
import { CloudType, SearchResult, HealthInfo } from '@/types';
import SearchBar from '@/components/SearchBar';
import ApiHealthModal from '@/components/ApiHealthModal';
import SearchStats from '@/components/SearchStats';
import CloudTypeFilter from '@/components/CloudTypeFilter';
import SearchResults from '@/components/SearchResults';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState<CloudType | null>(null);
  const [searchTime, setSearchTime] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [displayLimit, setDisplayLimit] = useState<Record<string, number>>({});
  const [apiStatus, setApiStatus] = useState<'checking' | 'ok' | 'error'>('checking');
  const [healthInfo, setHealthInfo] = useState<HealthInfo | null>(null);
  const [showHealthModal, setShowHealthModal] = useState(false);

  // API配置 - 使用代理路由隐藏后端地址
  const apiUrl = '/api/proxy';
  const apiUsername = process.env.NEXT_PUBLIC_API_USERNAME || '';
  const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD || '';
  const [apiToken, setApiToken] = useState('');
  const [lastSearchTime, setLastSearchTime] = useState(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    // 防止频繁搜索：限制2秒内只能搜索一次
    const now = Date.now();
    if (now - lastSearchTime < 2000) {
      setError('搜索频率过快，请稍后再试');
      setTimeout(() => setError(''), 2000);
      return;
    }

    // 防止重复点击：如果正在加载中，直接返回
    if (loading) {
      return;
    }

    setLastSearchTime(now);
    setLoading(true);
    setError('');
    setResult(null);
    const startTime = Date.now();

    try {
      const params: Record<string, string> = {
        kw: keyword,
        res: 'merge',
        src: 'all',
      };

      if (selectedType) {
        params.cloud_types = selectedType;
      }

      const query = new URLSearchParams(params).toString();

      // 构建请求头
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // 如果有Token，添加认证头
      if (apiToken) {
        headers['Authorization'] = `Bearer ${apiToken}`;
      }

      const response = await fetch(`${apiUrl}?path=/api/search&${query}`, {
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('认证失败,请检查API Token');
        }
        throw new Error('搜索失败');
      }

      const response_data = await response.json();
      const data = response_data.data || response_data;

      setResult(data);
      setSearchTime(Date.now() - startTime);

      // 重置显示限制,每个网盘类型初始显示10条
      const initialLimits: Record<string, number> = {};
      if (data.merged_by_type) {
        Object.keys(data.merged_by_type).forEach(type => {
          initialLimits[type] = 10;
        });
      }
      setDisplayLimit(initialLimits);
    } catch (err) {
      setError(err instanceof Error ? err.message : '搜索出错,请重试');
    } finally {
      setLoading(false);
    }
  };

  const toggleCloudType = (type: CloudType) => {
    setSelectedType(prev => prev === type ? null : type);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const loadMore = (type: string) => {
    setDisplayLimit(prev => ({
      ...prev,
      [type]: (prev[type] || 10) + 20
    }));
  };

  // 检查API健康状态
  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${apiUrl}?path=/api/health`);
      if (response.ok) {
        const data = await response.json();
        setHealthInfo(data);
        setApiStatus('ok');
      } else {
        setApiStatus('error');
        setHealthInfo(null);
      }
    } catch (err) {
      setApiStatus('error');
      setHealthInfo(null);
    }
  };

  // 自动登录获取Token
  const autoLogin = async () => {
    if (!apiUsername || !apiPassword) return;

    // 检查本地缓存的token
    const cachedToken = localStorage.getItem('api_token');
    const tokenExpiry = localStorage.getItem('api_token_expiry');

    if (cachedToken && tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
      setApiToken(cachedToken);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}?path=/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: apiUsername,
          password: apiPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setApiToken(data.token);
        // 缓存token，设置24小时过期
        localStorage.setItem('api_token', data.token);
        localStorage.setItem('api_token_expiry', (Date.now() + 24 * 60 * 60 * 1000).toString());
      }
    } catch (err) {
      console.error('自动登录失败:', err);
    }
  };

  // 组件加载时检查API状态并自动登录
  useEffect(() => {
    checkApiHealth();
    autoLogin();
    // 将健康检查间隔改为5分钟
    const interval = setInterval(checkApiHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 复制成功提示 */}
      {copySuccess && (
        <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-2xl z-50 animate-fade-in flex items-center gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm sm:text-base">复制成功!</span>
        </div>
      )}

      {/* API健康状态弹窗 */}
      <ApiHealthModal
        show={showHealthModal}
        healthInfo={healthInfo}
        onClose={() => setShowHealthModal(false)}
      />

      {/* 顶部导航栏 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl"></div>
                <span className="text-white font-bold text-lg sm:text-xl relative z-10">云</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">云寻</h1>
                <span className="text-[9px] sm:text-[10px] text-gray-400 -mt-1 block">CloudSeeker</span>
              </div>
            </div>
            <span className="text-xs text-gray-500 hidden md:block ml-1">多网盘资源聚合搜索</span>
          </div>
          <button
            onClick={() => setShowHealthModal(true)}
            className="flex items-center gap-1.5 sm:gap-2 hover:bg-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors"
          >
            {apiStatus === 'ok' ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">服务正常</span>
              </>
            ) : apiStatus === 'error' ? (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">服务异常</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">检查中...</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* 搜索框 */}
        <SearchBar
          keyword={keyword}
          loading={loading}
          onKeywordChange={setKeyword}
          onSearch={handleSearch}
        />

        {/* 搜索结果统计 */}
        {result && <SearchStats total={result.total} searchTime={searchTime} />}

        {/* 网盘类型筛选 */}
        {result && (
          <CloudTypeFilter
            result={result}
            selectedType={selectedType}
            onTypeToggle={toggleCloudType}
          />
        )}

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-lg mb-6 flex items-center gap-3 shadow-sm">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* 搜索结果 */}
        {result && result.merged_by_type && Object.entries(result.merged_by_type).map(([type, links]) => {
          if (!links || links.length === 0) return null;
          if (selectedType && selectedType !== type) return null;

          return (
            <SearchResults
              key={type}
              type={type as CloudType}
              links={links}
              displayLimit={displayLimit[type] || 10}
              onLoadMore={() => loadMore(type)}
              onCopy={copyToClipboard}
            />
          );
        })}

        {/* 空状态 */}
        {!loading && !result && !error && (
          <div className="text-center py-12 sm:py-20">
            <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-base sm:text-lg text-gray-500 px-4">输入关键词开始搜索网盘资源</p>
          </div>
        )}
      </div>
    </div>
  );
}
