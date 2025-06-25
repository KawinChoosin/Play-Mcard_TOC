// index.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import ARpage from './ARpage'
import './index.css'
import ARsummarypage from './ARsummarypage'
import StarsCollectionPage from './StarsCollectionPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ar" element={<ARpage />} />
        <Route path="/arsummary" element={<ARsummarypage />} />
        <Route path="/starscollection" element={<StarsCollectionPage />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
