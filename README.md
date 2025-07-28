Drug Information Dashboard - Frontend
A React application for browsing pharmaceutical drug data with infinite scroll and company filtering.

Features
Infinite Scroll - Load data as you scroll

Company Filtering - Filter drugs by pharmaceutical company

Responsive Design - Works on all devices

Modern UI - Material-UI components

Tech Stack
React 18 + Vite

Material-UI (MUI)

Custom Hooks

date-fns

📁 Project Structure
text
src/
├── assets/
│   ├── Components/          # UI components
│   └── CustomHooks/         # Business logic hooks
├── App.jsx                  # Main component
└── config.js               # API configuration


Quick Start
Install dependencies

bash
npm install
Configure API URL

javascript
// src/config.js
const config = {
  API_BASE_URL: 'http://localhost:3000' // Your backend URL
};
Start development

bash
npm run dev
📝 Scripts
bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
🔧 API Endpoints
GET /api/drug - Paginated drug data

GET /api/companies - Company list

Deployment
Render/Vercel/Netlify:

Build: npm install && npm run build

Publish: dist folder

