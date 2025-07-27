// assets/CustomHooks/useInfiniteScroll.js
import { useCallback, useEffect, useRef } from 'react';

const useInfiniteScroll = (loadMore, hasMore, loading, threshold = 100) => {
  const scrollContainerRef = useRef(null);

  // Scroll event handler
  const handleScroll = useCallback(
    (event) => {
      const target = event.target;
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;

      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom < threshold && hasMore && !loading) {
        loadMore();
      }
    },
    [hasMore, loading, loadMore, threshold]
  );

  // Set up scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return scrollContainerRef;
};

export default useInfiniteScroll;
