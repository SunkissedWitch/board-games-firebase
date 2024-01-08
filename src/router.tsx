import { createBrowserRouter } from "react-router-dom"
import { RootLayout } from "./RootLayout"
import { Home } from "./pages/home"
import { ProductPage, getCurrentProduct } from "./pages/product"
import { Orders } from "./pages/orders"
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"
import { Cart } from "./pages/cart"
import { CartProvider } from "./contexts/CartContext"
import { SuccessPage } from "./pages/cartSuccess"

export const router = createBrowserRouter([
  {
    element: <CartProvider><RootLayout /></CartProvider>,
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
        element: <Orders />,
      },
      {
        path: '/orders/:orderId',
        element: <div>New Order</div>
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/cart/success/:orderId',
        element: <SuccessPage />
      }
    ]
  }
])