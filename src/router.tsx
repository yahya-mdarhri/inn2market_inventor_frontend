import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      // {
      //   index: true,
      //   element: <Home />,
      // },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
} 