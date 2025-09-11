import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';

export default function ProfilePublic() {
  const { registro } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {

      const { data } = await api.get(`/users`, { params: { registro } });

      setProfile(Array.isArray(data) ? data[0] : data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [registro]);

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-header center">
          <h2 className="card-title">Perfil público</h2>
          <p className="card-description">Información visible para todos</p>
        </div>

        <div className="card-content">
          {loading && <p className="muted center">Cargando…</p>}
          {!loading && !profile && <p className="muted center">No se encontró el usuario.</p>}

          {!loading && profile && (
            <div className="col" style={{ gap: 8 }}>
              <div><strong>Registro:</strong> {profile.registro}</div>
              <div><strong>Nombre:</strong> {profile.nombres} {profile.apellidos}</div>
              <div><strong>Email:</strong> {profile.email}</div>
            </div>
          )}

          <div className="center" style={{ marginTop: 16 }}>
            <Link to="/" className="btn" style={{ width: 'auto', padding: '0 16px' }}>
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
