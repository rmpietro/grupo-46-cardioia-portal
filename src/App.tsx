import { Routes, Route, Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Login from './pages/Login';

export default function App(){
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout(){
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}