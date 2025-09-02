import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from './Pages/404'
import Home from './Pages/Home'
import Layout from './Layout'
import Install from './Pages/Install'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "install",
        element: <Install />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)