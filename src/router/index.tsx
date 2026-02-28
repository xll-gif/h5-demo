import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ForgotPassword from '../pages/ForgotPassword'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
])
