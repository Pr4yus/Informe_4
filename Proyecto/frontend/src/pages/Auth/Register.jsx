// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';          // ⬅️ desde pages/Auth sube 2 niveles a src/api
import '../../custom.css';            // ⬅️ si lo tienes en src/styles, usa: '../../styles/custom.css'

export default function Register({ onSuccess }) {
  const [registro, setRegistro] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (!registro.trim() || !nombres.trim() || !apellidos.trim() || !email.trim() || !contraseña) {
      setErr('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/users', {
        registro: registro.trim(),
        nombres: nombres.trim(),
        apellidos: apellidos.trim(),
        contraseña,
        email: email.trim(),
      });

      setMsg('Usuario registrado correctamente.');

      // limpiar
      setRegistro('');
      setNombres('');
      setApellidos('');
      setContraseña('');
      setEmail('');

      onSuccess && onSuccess();
    } catch (error) {
      const apiMsg = error?.response?.data?.message;
      setErr(apiMsg || 'Error al registrar usuario. Intenta nuevamente.');
      console.error('Error al registrar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Registrarse</h2>
          <p className="card-description">Crea tu cuenta para comenzar</p>
        </div>

        <div className="card-content">
          {err && <div className="alert alert-error" style={{ marginBottom: 12 }}>{err}</div>}
          {msg && <div className="alert alert-success" style={{ marginBottom: 12 }}>{msg}</div>}

          <form onSubmit={handleSubmit} className="form" noValidate>
            <div>
              <label htmlFor="registro" className="label">Registro</label>
              <input
                id="registro"
                type="text"
                className="input"
                value={registro}
                onChange={(e) => setRegistro(e.target.value)}
                placeholder="Ingresa tu registro"
                required
              />
            </div>

            <div>
              <label htmlFor="nombres" className="label">Nombres</label>
              <input
                id="nombres"
                type="text"
                className="input"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Ingresa tus nombres"
                required
              />
            </div>

            <div>
              <label htmlFor="apellidos" className="label">Apellidos</label>
              <input
                id="apellidos"
                type="text"
                className="input"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Ingresa tus apellidos"
                required
              />
            </div>

            <div>
              <label htmlFor="contraseña" className="label">Contraseña</label>
              <input
                id="contraseña"
                type="password"
                className="input"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Crea una contraseña segura"
                minLength={6}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="btn"
              disabled={loading || !registro || !nombres || !apellidos || !email || !contraseña}
            >
              {loading ? 'Registrando…' : 'Registrar'}
            </button>
          </form>

          {/* Botón para volver al login */}
          <Link
            to="/login"
            className="btn btn-outline"
            style={{ display: 'inline-block', marginTop: 10, textAlign: 'center' }}
          >
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
