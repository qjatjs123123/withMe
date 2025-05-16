import React, { useState, useRef } from "react";

type VirtualizedListProps = {
  items: React.ReactNode[];
  itemHeight: number;
  windowHeight: number;
};

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  itemHeight,
  windowHeight,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);

  const visibleItemCount = Math.ceil(windowHeight / itemHeight);
  const totalHeight = items.length * itemHeight;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemCount + 1, items.length);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const displayItems = () => {
    const visibleItems = [];
    

    for (let i = startIndex; i < endIndex; i++) {
      const item = items[i];
      const itemStyle: React.CSSProperties = {
        position: "absolute",
        top: `${i * itemHeight}px`,
        height: `${itemHeight}px`,
        left: 0,
        right: 0,
      };
      visibleItems.push(
        <li key={i} style={itemStyle}>
          {item}
        </li>
      );
    }

    return visibleItems;
  };

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      style={{
        height: `${windowHeight}px`,
        overflowY: "auto",
        position: "relative",
      }}
    >
      <ul style={{ height: `${totalHeight}px`, position: "relative", listStyle:'none' }}>
        {displayItems()}
      </ul>
    </div>
  );
};
