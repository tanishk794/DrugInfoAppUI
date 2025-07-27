import React from 'react'; 
import{
CircularProgress,Typography,Container} from "@mui/material"

const LoadingSpinner = () => (
  <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
    <CircularProgress />
    <Typography variant="h6" sx={{ ml: 2 }}>Loading drug data...</Typography>
  </Container>
);


export default LoadingSpinner