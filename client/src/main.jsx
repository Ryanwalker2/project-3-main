import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import SearchProducts from './pages/SearchProducts.jsx';
import FavoriteProducts from './pages/FavoriteProducts.jsx';
import Order from './pages/Order.jsx';
import Product from './pages/Product.jsx';
import Profile from './pages/Profile.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
   errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchProducts />
      }
      ,{
        path: '/favorites',
        element: <FavoriteProducts />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/shoppingcart',
        element: <ShoppingCart />
      },
      {
        path: '/profile/order/:orderId',
        element: <Order />
      },
      {
        path: '/product/:productId',
        element: <Product />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
