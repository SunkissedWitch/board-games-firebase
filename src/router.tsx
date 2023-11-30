import { createBrowserRouter } from "react-router-dom"
import { RootLayout } from "./RootLayout"
import { Home } from "./pages/home"
import { ProductPage, getCurrentProduct } from "./pages/product"
import { Orders } from "./pages/order"
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"
import { auth } from './firebase'
console.log(auth)

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/',
        index: true,
        element: <Home />
      },
      {
        path: '/:category/:productId',
        loader: getCurrentProduct,
        element: <ProductPage />
      },
      {
        path: '/orders',
        element: <Orders />
      }
    ]
  }
])