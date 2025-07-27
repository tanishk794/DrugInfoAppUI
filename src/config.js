const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://druginfoappback-3.onrender.com/'  // We'll replace this with actual server IP later
    : 'http://localhost:3000'
};

export default config;
