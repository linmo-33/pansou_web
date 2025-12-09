'use client';

import { useVirtualScroll } from '@/hooks/useVirtualScroll';
import { PanLink } from '@/types';

interface VirtualListProps {
    items: PanLink[];
    renderItem: (item: PanLink, index: number) => React.ReactNode;
    itemHeight: number;
    containerHeight: number;
}

export default function VirtualList({
    items,
    renderItem,
    itemHeight,
    containerHeight,
}: VirtualListProps) {
    const { containerRef, visibleItems, totalHeight, offsetY, startIndex } =
        useVirtualScroll(items, {
            itemHeight,
            containerHeight,
            overscan: 3,
        });

    return (
        <div
            ref={containerRef}
            style={{ height: containerHeight, overflow: 'auto' }}
            className="relative"
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div style={{ transform: `translateY(${offsetY}px)` }}>
                    {visibleItems.map((item, index) =>
                        renderItem(item, startIndex + index)
                    )}
                </div>
            </div>
        </div>
    );
}
