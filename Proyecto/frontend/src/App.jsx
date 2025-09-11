import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Router from './router.jsx'; 


const HIDE_NAV_ROUTES = ['/login', '/register', '/forgot-password'];

export default function App() {
  const { pathname } = useLocation();
  const showNavbar = !HIDE_NAV_ROUTES.some((p) => pathname.startsWith(p));

  return (
    <>
      {showNavbar && <Navbar />}
      <Router />
    </>
  );
}
