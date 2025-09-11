import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider.jsx';  // Usamos el login del AuthProvider
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../../custom.css';  // Estilos personalizados

export default function Login() {
  const { login } = useAuth();  // Usamos el login del AuthProvider
  const [registro, setRegistro] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';  // Redirige a /home por defecto

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      // Llamamos al método login del contexto para hacer la solicitud de login
      await login(registro.trim(), password);  
      nav(from, { replace: true });  // Redirige al usuario a la página de destino
    } catch (error) {
      const msg = error?.response?.data?.message || 'Error de inicio de sesión';
      setErr(msg);  // Muestra el mensaje de error si no se puede iniciar sesión
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Iniciar sesión</h2>
          <p className="card-description">Accede a tu cuenta</p>
        </div>
        <div className="card-content">
          {err && <div className="alert alert-error">{err}</div>}  {/* Muestra el error si es necesario */}

          <form onSubmit={submit} className="form">
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
                <label htmlFor="password" className="label">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn"
              disabled={loading || !registro || !password}
            >
              {loading ? 'Ingresando…' : 'Ingresar'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Link to="/forgot-password" className="btn btn-outline">Olvidé mi contraseña</Link>
            <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
