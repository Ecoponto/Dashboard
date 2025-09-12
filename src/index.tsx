import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Propriedades from './pages/propriedades';
import Registrar from './pages/registrar';
import ItemForm from './pages/objetos';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated } from './utils/auth';




const router = createBrowserRouter([
  {
    path: "/",
    element: (<Login />),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  {
    path: "/propriedades",
    element: (
      <ProtectedRoute>
        <Propriedades />
      </ProtectedRoute>
    )
  },
  {
    path: "/registrar",
    element: (
      <ProtectedRoute>
        <Registrar />
      </ProtectedRoute>
    )
  },
  {
    path: "/objetos",
    element: (
      <ProtectedRoute>
        <ItemForm />
      </ProtectedRoute>
    )
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <PrivateRoute isSignedIn={isAuthenticated()}>
      <RouterProvider router={router} />
    </PrivateRoute>
  </StrictMode>
);