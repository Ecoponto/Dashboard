import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import PrivateRoute from './components/PrivateRoute';
import Propriedades from './pages/propriedades';
import Registrar from './pages/registrar';
import PublicRoute from './components/PublicRoute';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/propriedades"
          element={
            <PrivateRoute>
              <Propriedades />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrar"
          element={
            <PrivateRoute>
              <Registrar />
            </PrivateRoute> 
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


