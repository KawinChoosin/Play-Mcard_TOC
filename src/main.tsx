// index.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import ARPage from './ARPage'
import './index.css'
import ARsummaryPage from './ARsummaryPage'
import StarsCollectionPage from './StarsCollectionPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ar" element={<ARPage />} />
        <Route path="/arsummary" element={<ARsummaryPage />} />
        <Route path="/starscollection" element={<StarsCollectionPage />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
