import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    {/* wrapping the shop context makes it available all through your app */}
    <ShopContextProvider>
     <App />
    </ShopContextProvider>
    
  </BrowserRouter>,
)
