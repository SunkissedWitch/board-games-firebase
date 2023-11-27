import { createBrowserRouter } from "react-router-dom"
import { RootLayout } from "./RootLayout"
import { Home } from "./pages/home"
import { ProductPage, getCurrentProduct } from "./pages/product"

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />
      },
      {
        path: '/:category/:productId',
        loader: getCurrentProduct,
        element: <ProductPage />
      }
    ]
  }
])