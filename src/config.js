const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'http://your-server-ip:3000'  // We'll replace this with actual server IP later
    : 'http://localhost:3000'
};

export default config;
