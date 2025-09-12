import { Link, createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './utils/RootLayout'
import { rootLoader, Root } from './pages/home'
import { ProductPage, getCurrentProduct } from './pages/product'
import { Orders } from './pages/orders'
import { Login } from './pages/login'
import { Signup } from './pages/signup'
import { Cart } from './pages/cart'
import { SuccessPage } from './pages/cartSuccess'
import { OrderPage } from './pages/order'
import { ProductsList, allProductsLoader, productsListLoader } from './components/Products'
import { RootBoundary } from './pages/errorPage'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { DynamicNameCrumb } from './components/Breadcrumbs/DynamicNameCrumb'
import { BreadcrumbsLayout } from './components/Breadcrumbs/BreadCrumbsLayout'
import { AccountPage } from './pages/account'
import { AccountSettings } from './pages/accountSettings'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    handle: { crumb: () => <Link to='/'>Home</Link> },
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />,
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
        element: <PrivateRoutes />,
        children: [
          {
            // path: '/account',
            element: <BreadcrumbsLayout />,
            handle: { crumb: () => <Link to='/account'>Account</Link> },
            children: [
              {
                path: 'account',
                element: <AccountPage />,
              },
              {
                path: 'account/settings',
                element: <AccountSettings />,
                handle: { crumb: () => <Link to='/account/settings'>Settings</Link> }
              },
            ]
          },
          {
            element: <BreadcrumbsLayout />,
            handle: { crumb: () => <Link to='/orders'>Orders</Link> },
            children: [
              {
                path: 'orders',
                element: <Orders />,
              },
              {
                path: 'orders/:orderId',
                element: <OrderPage />,
                // handle: { crumb: () => 'order' }
                handle: { crumb: () => <DynamicNameCrumb /> }
              },

            ]
          }
        ]
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