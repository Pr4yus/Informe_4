import React, { useState, useEffect } from 'react';
import api from '../api';
import '../custom.css';

const UserList = ({ updateList }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsers();
  }, [updateList]); // Dependencia para actualizar la lista

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 640 }}>
        <div className="card-header">
          <h2 className="card-title">Lista de Usuarios</h2>
          <p className="card-description">Usuarios registrados recientemente</p>
        </div>
        <div className="card-content">
          {users.length === 0 ? (
            <p className="muted">No hay usuarios registrados.</p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {users.map(user => (
                <li key={user._id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <strong>{user.nombres} {user.apellidos}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
