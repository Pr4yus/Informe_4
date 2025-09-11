import React from 'react';
import { useParams } from 'react-router-dom';
import ApprovedCoursesList from '../../components/profile/ApprovedCoursesList.jsx'; 

export default function CoursesPublic() {
  const { registro } = useParams();

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-header center">
          <h2 className="card-title">Cursos del usuario</h2>
          <p className="card-description">Cursos asociados al registro {registro}</p>
        </div>

        <div className="card-content">
          {/* El componente puede aceptar un prop para cargar por registro público */}
          <ApprovedCoursesList mode="public" registro={registro} />
        </div>
      </div>
    </div>
  );
}
