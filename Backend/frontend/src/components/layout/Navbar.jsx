import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider.jsx';

export default function Navbar() {
  const { token, logout } = useAuth();
  const [registro, setRegistro] = useState('');
  const nav = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    if (!registro.trim()) return;
    nav(`/profile/${encodeURIComponent(registro.trim())}`);
    setRegistro('');
  };

  return (
    <div className="nav">
      <div className="nav-inner">
        <Link to="/">Campus</Link>
        <Link to="/post/new" className="badge">Nueva publicación</Link>
        <div className="spacer" />
        <form onSubmit={onSearch} className="row" style={{gap:8}}>
          <input
            placeholder="Buscar por registro..."
            value={registro}
            onChange={(e)=>setRegistro(e.target.value)}
            style={{width:220}}
          />
          <button type="submit">Buscar</button>
        </form>
        {token ? (
          <>
            <Link to="/profile/me" className="badge">Mi perfil</Link>
            <Link to="/profile/me/courses" className="badge">Mis cursos</Link>
            <button onClick={logout} style={{marginLeft:8}}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/login" className="badge">Ingresar</Link>
            <Link to="/register" className="badge">Registrarse</Link>
          </>
        )}
      </div>
    </div>
  );
}
