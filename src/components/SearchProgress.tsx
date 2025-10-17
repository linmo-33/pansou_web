'use client';

interface SearchProgressProps {
    loading: boolean;
}

export default function SearchProgress({ loading }: SearchProgressProps) {
    if (!loading) return null;

    return (
        <div className="fixed top-14 sm:top-16 left-0 right-0 z-50">
            <div className="h-1 bg-gray-200">
                <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-progress-bar origin-left"></div>
            </div>
        </div>
    );
}
