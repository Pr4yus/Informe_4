import React, { useState } from 'react';
import api from '../../api';
import { useAuth } from '../../auth/AuthProvider.jsx';
import ProfileForm from '../../components/profile/ProfileForm.jsx';

export default function ProfileMe() {
  const { user, setUser } = useAuth(); 
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="page">
        <div className="card">
          <div className="card-header center">
            <h2 className="card-title">Mi perfil</h2>
            <p className="card-description">Cargando usuario…</p>
          </div>
        </div>
      </div>
    );
  }

  const id = user._id ?? user.id;

  const handleSubmit = async (values) => {
    setError('');
    setSaving(true);
    try {
      const { data } = await api.put(`/users/${id}`, values);
      setUser?.(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-header center">
          <h2 className="card-title">Mi perfil</h2>
          <p className="card-description">Edita tu información personal</p>
        </div>

        <div className="card-content">
          {error && (
            <div style={{ background:'#fee2e2', border:'1px solid #fecaca', color:'#b91c1c', padding:12, borderRadius:6, marginBottom:12 }}>
              {error}
            </div>
          )}

          {/* Si no usas ProfileForm, puedes reemplazar por inputs nativos */}
          <ProfileForm
            initialValues={{
              registro: user.registro || '',
              nombres: user.nombres || '',
              apellidos: user.apellidos || '',
              email: user.email || '',
            }}
            onSubmit={handleSubmit}
            submitting={saving}
          />
        </div>
      </div>
    </div>
  );
}
