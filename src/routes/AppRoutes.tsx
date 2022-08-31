import { lazy, Suspense } from "react";
import { Routes, Route, } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import LinearProgress from '@mui/material/LinearProgress';
const SignIn = lazy(() => import('../pages/SignIn'));
const Products = lazy(() => import('../pages/Products'));
const ProductCreate = lazy(() => import('../pages/Products/ProductCreate'));
const ProductList = lazy(() => import('../pages/Products/ProductList'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route element={<RequireAuth />}>
          <Route path="products" element={<Products />}>
            <Route index element={<ProductList />} />
            <Route path="list" element={<ProductList />} />
            <Route path="create" element={<ProductCreate />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;