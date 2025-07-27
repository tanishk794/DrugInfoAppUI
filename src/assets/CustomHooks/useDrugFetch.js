// assets/CustomHooks/useDrugFetch.js
import { useState, useCallback, useEffect } from 'react';

const useDrugFetch = (apiBaseUrl, itemsPerPage = 20) => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch drugs from API
  const fetchDrugs = useCallback(
    async (page = 1, company = "", reset = false) => {
      try {
        if (page === 1) {
          setLoading(true);
          setError(null);
        } else {
          setLoadingMore(true);
        }

        const url = new URL(`${apiBaseUrl}/api/drug`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", itemsPerPage.toString());
        if (company && company.trim() !== "") {
          url.searchParams.append("company", company);
        }

        console.log("Fetching:", url.toString());

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          const newDrugs = result.data || [];

          if (reset || page === 1) {
            setDrugs(newDrugs);
          } else {
            setDrugs((prevDrugs) => [...prevDrugs, ...newDrugs]);
          }

          setHasMore(
            result.pagination?.hasMore || newDrugs.length === itemsPerPage
          );
          setTotalCount(result.pagination?.totalCount || 0);
          setCurrentPage(page);

          console.log(`Loaded page ${page}: ${newDrugs.length} items`);
        } else {
          throw new Error(result.message || "Failed to fetch data");
        }
      } catch (err) {
        console.error("Failed to fetch drug data:", err);
        setError(`Failed to load drug data: ${err.message}`);
        setHasMore(false);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [apiBaseUrl, itemsPerPage]
  );

  // Load more data
  const loadMore = useCallback((company = "") => {
    if (!loadingMore && !loading && hasMore) {
      fetchDrugs(currentPage + 1, company, false);
    }
  }, [fetchDrugs, currentPage, loadingMore, loading, hasMore]);

  // Reset and fetch with new company filter
  const resetAndFetch = useCallback((company = "") => {
    setCurrentPage(1);
    setHasMore(true);
    fetchDrugs(1, company, true);
  }, [fetchDrugs]);

  // Retry function for error handling
  const retry = useCallback(() => {
    setError(null);
    fetchDrugs(1, "", true);
  }, [fetchDrugs]);

  return {
    drugs,
    loading,
    loadingMore,
    error,
    currentPage,
    hasMore,
    totalCount,
    loadMore,
    resetAndFetch,
    retry,
    fetchDrugs
  };
};

export default useDrugFetch;
