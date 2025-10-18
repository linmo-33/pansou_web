'use client';

interface SearchProgressProps {
    loading: boolean;
}

export default function SearchProgress({ loading }: SearchProgressProps) {
    if (!loading) return null;

    return (
        <div className="mb-6 overflow-hidden rounded-full bg-gray-100" role="progressbar" aria-label="搜索进度">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-progress-bar origin-left shadow-lg shadow-blue-500/30 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
        </div>
    );
}
