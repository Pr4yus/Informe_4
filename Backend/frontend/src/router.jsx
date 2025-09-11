import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute.jsx';

// Auth
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';

// Feed
import Home from './pages/Feed/Home.jsx';
import PostNew from './pages/Feed/PostNew.jsx';
import PostDetail from './pages/Feed/PostDetail.jsx';

// Profile
import ProfileMe from './pages/Profile/ProfileMe.jsx';
import ProfilePublic from './pages/Profile/ProfilePublic.jsx';
import CoursesMe from './pages/Profile/CoursesMe.jsx';
import CoursesPublic from './pages/Profile/CoursesPublic.jsx';

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Rutas privadas */}
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/post/new" element={<PrivateRoute><PostNew /></PrivateRoute>} />
      <Route path="/post/:id" element={<PrivateRoute><PostDetail /></PrivateRoute>} />

      <Route path="/profile/me" element={<PrivateRoute><ProfileMe /></PrivateRoute>} />
      <Route path="/profile/me/courses" element={<PrivateRoute><CoursesMe /></PrivateRoute>} />
      <Route path="/profile/:registro" element={<PrivateRoute><ProfilePublic /></PrivateRoute>} />
      <Route path="/profile/:registro/courses" element={<PrivateRoute><CoursesPublic /></PrivateRoute>} />

      {/* Ruta para manejar cualquier URL no definida */}
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
    </Routes>
  );
}

