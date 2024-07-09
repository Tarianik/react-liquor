import React from 'react';
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './scss/app.scss';

import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { MainLayout } from './assets/layouts/MainLayout';
import { ItemPage } from './pages/ItemPage';
import { Wishlist } from './pages/Wishlist';
import { Terms } from './pages/Terms';

const router = createBrowserRouter([
  //@ts-ignore
  // { path: '*', Component: Root },
  //@ts-ignore

  {
    path: '/',
    element: <MainLayout />,
    children: [
      // New blog index route
      //@ts-ignore

      { index: true, element: <Home /> },
      //@ts-ignore

      { path: 'wishlist', element: <Wishlist /> },
      //@ts-ignore

      { path: 'cart', element: <Cart /> },
      { path: 'terms', element: <Terms /> },
      //@ts-ignore

      { path: '*', element: <NotFound /> },
      //@ts-ignore

      { path: '/wine/:id', element: <ItemPage />, errorElement: <NotFound /> },
      //@ts-ignore

      // Blog subapp splat route added for /blog/posts matching
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
// function Root() {
//   return (
//     <Routes>
//       {/* <Route path="/" element={<MainLayout />}>
//         <Route path="" element={<Home />} />
//         <Route path="wishlist" element={<Wishlist />} />
//         <Route path="cart" element={<Cart />} />
//         <Route path="*" element={<NotFound />} />
//         <Route path="/wine/:id" element={<ItemPage />} />
//       </Route> */}
//     </Routes>
//   );
// }
