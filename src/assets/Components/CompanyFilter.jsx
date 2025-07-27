import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  CircularProgress,
  Alert 
} from "@mui/material";

const CompanyFilterContainer = ({ 
  selectedCompany, 
  handleCompanyChange, 
  apiBaseUrl 
}) => {
  const [companyNames, setCompanyNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${apiBaseUrl}/api/companies`, {
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
        setCompanyNames(result.data || []);
      } else {
        throw new Error(result.message || 'Failed to fetch companies');
      }
    } catch (err) {
      console.error("Failed to fetch companies:", err);
      setError(err.message);
      setCompanyNames([""]);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="company-select-label">Filter by Company</InputLabel>
        <Select
          labelId="company-select-label"
          id="company-select"
          value={selectedCompany}
          label="Filter by Company"
          onChange={handleCompanyChange}
          data-testid="company-filter"
          disabled={loading}
        >
          {companyNames.map((company, index) => (
            <MenuItem key={index} value={company}>
              {company === '' ? 'All Companies' : company}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <Alert severity="warning" sx={{ mt: 1, fontSize: '0.75rem' }}>
            Failed to load companies
          </Alert>
        )}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <CircularProgress size={16} />
          </Box>
        )}
      </FormControl>
    </Box>
  );
};

export default CompanyFilterContainer;
