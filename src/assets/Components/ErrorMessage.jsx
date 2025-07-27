import{
Paper,Typography,Container} from "@mui/material"


const ErrorMessage = ({ message }) => (
  <Container maxWidth="lg" sx={{ mt: 4 }}>
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h6" color="error">
        {message}
      </Typography>
    </Paper>
  </Container>
);



export default ErrorMessage