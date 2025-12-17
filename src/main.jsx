import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // <-- Import important
import './index.css'
import App from './App.jsx'
import AdminDashboard from './AdminDashboard.jsx' // <-- Import de ta page admin

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 1. Le site public (Accueil) */}
        <Route path="/" element={<App />} />

        {/* 2. La page Admin Secrète */}
        {/* Tu peux changer "/admin" par "/dashboard-prive-client" pour le cacher encore plus */}
        <Route path="/admin" element={<AdminDashboard />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)