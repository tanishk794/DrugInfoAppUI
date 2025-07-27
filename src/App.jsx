import React, { useState, useCallback, useEffect } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import config from './config.js';

import LoadingSpinner from "./assets/Components/LoadingSpinner.jsx";
import ErrorMessage from "./assets/Components/ErrorMessage.jsx";
import CompanyFilter from "./assets/Components/CompanyFilter.jsx";
import DrugInfoTable from "./assets/Components/DrugInfoTable.jsx";

import useDrugFetch from "./assets/CustomHooks/useDrugFetch.js";
import useInfiniteScroll from "./assets/CustomHooks/useInfiniteScroll.js";

// API Configuration
const API_BASE_URL = config.API_BASE_URL;
const ITEMS_PER_PAGE = 20;

function App() {
  const [selectedCompany, setSelectedCompany] = useState("");

  // Custom hooks
  const {
    drugs,
    loading,
    loadingMore,
    error,
    hasMore,
    totalCount,
    loadMore,
    resetAndFetch,
    retry,
  } = useDrugFetch(API_BASE_URL, ITEMS_PER_PAGE);

  const scrollContainerRef = useInfiniteScroll(
    () => loadMore(selectedCompany),
    hasMore,
    loadingMore
  );


  useEffect(() => {
    resetAndFetch(selectedCompany);
  }, [selectedCompany, resetAndFetch]);

  // Handle company filter change
  const handleCompanyChange = useCallback((event) => {
    setSelectedCompany(event.target.value);
  }, []);

  if (loading && drugs.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={retry} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4, fontWeight: "bold", color: "#4A90E2" }}
      >
        Drug Information Dashboard
      </Typography>

      <CompanyFilter
        selectedCompany={selectedCompany}
        handleCompanyChange={handleCompanyChange}
        apiBaseUrl={API_BASE_URL}
      />

      {/* Results summary */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {totalCount > 0
            ? `Showing ${drugs.length} of ${totalCount} drugs ${
                selectedCompany ? `for "${selectedCompany}"` : ""
              }`
            : "No drugs found"}
        </Typography>
      </Box>

      {/* Scrollable container */}
      <Box
        ref={scrollContainerRef}
        sx={{
          maxHeight: "70vh",
          overflowY: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: 1,
        }}
      >
        <DrugInfoTable drugs={drugs} />

        {/* Loading more indicator */}
        {loadingMore && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
              backgroundColor: "background.paper",
            }}
          >
            <CircularProgress size={24} sx={{ mr: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Loading more drugs...
            </Typography>
          </Box>
        )}

        {/* End of data message */}
        {!hasMore && drugs.length > 0 && !loading && (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              backgroundColor: "background.paper",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              You've reached the end of the list
            </Typography>
          </Box>
        )}
      </Box>

      {!loading && drugs.length === 0 && !error && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No drugs found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {selectedCompany
              ? `No drugs found for "${selectedCompany}"`
              : "No drugs available in the database"}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default App;
