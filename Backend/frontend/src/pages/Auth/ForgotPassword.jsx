
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';          
import '../../custom.css';          

export default function ForgotPassword() {
  const [registro, setRegistro] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (!registro.trim() || !email.trim() || !newPassword) {
      setErr('Completa todos los campos.');
      return;
    }

    setLoading(true);
    try {

      await api.post('/auth/forgot-password', {
        registro: registro.trim(),
        email: email.trim(),
        newPassword,
      });

      setMsg('Contraseña actualizada correctamente. Ya puedes iniciar sesión.');
      setRegistro('');
      setEmail('');
      setNewPassword('');
    } catch (error) {
      const apiMsg = error?.response?.data?.message;
      setErr(apiMsg || 'No se pudo actualizar la contraseña.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Olvidé mi contraseña</h2>
          <p className="card-description">Actualiza tu contraseña para acceder nuevamente</p>
        </div>

        <div className="card-content">
          {err && <div className="alert alert-error" style={{ marginBottom: 12 }}>{err}</div>}
          {msg && <div className="alert alert-success" style={{ marginBottom: 12 }}>{msg}</div>}

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="row" style={{ gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="registro" className="label">Registro</label>
                <input
                  id="registro"
                  type="text"
                  className="input"
                  value={registro}
                  onChange={(e) => setRegistro(e.target.value)}
                  placeholder="Tu registro"
                  required
                />
              </div>

              <div style={{ flex: 1 }}>
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
            </div>

            <div>
              <label htmlFor="newPassword" className="label">Nueva contraseña</label>
              <input
                id="newPassword"
                type="password"
                className="input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              className="btn"
              disabled={loading || !registro || !email || !newPassword}
            >
              {loading ? 'Actualizando…' : 'Actualizar'}
            </button>
          </form>

          {/* Volver al login */}
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
