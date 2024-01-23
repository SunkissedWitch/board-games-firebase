import { createBrowserRouter } from "react-router-dom"
import { RootLayout } from "./RootLayout"
import { rootLoader, Root } from "./pages/home"
import { ProductPage, getCurrentProduct } from "./pages/product"
import { Orders } from "./pages/orders"
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"
import { Cart } from "./pages/cart"
import { CartProvider } from "./contexts/CartContext"
import { SuccessPage } from "./pages/cartSuccess"
import { OrderPage } from "./pages/order"
import { ProductsList, allProductsLoader, productsListLoader } from "./components/Products"
import { RootBoundary } from "./pages/errorPage"

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
        loader: rootLoader,
        id: 'root',
        element: <Root />,
        children: [
          {
            index: true,
            loader: allProductsLoader,
            element: <ProductsList />
          },
          {
            path: ':category',
            loader: productsListLoader,
            element: <ProductsList />
          }
        ],
        errorElement: <RootBoundary />
      },
      {
        path: '/:category/:productId',
        loader: getCurrentProduct,
        element: <ProductPage />,
        errorElement: <RootBoundary />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/orders/:orderId',
        element: <OrderPage />
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