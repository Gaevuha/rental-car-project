// components/LoadMoreButton/LoadMoreButton.tsx
"use client";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
}

export default function LoadMoreButton({ onLoadMore }: LoadMoreButtonProps) {
  return (
    <div className="load-more-container">
      <button className="load-more-btn" onClick={onLoadMore}>
        Load More
      </button>
    </div>
  );
}
