import React from 'react';
import ApprovedCoursesList from '../../components/profile/ApprovedCoursesList.jsx'; 

export default function CoursesMe() {
  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-header center">
          <h2 className="card-title">Mis cursos</h2>
          <p className="card-description">Lista de cursos asignados y aprobados</p>
        </div>

        <div className="card-content">
          {/* Este componente debería encargarse de llamar al endpoint que corresponda (ej: /api/courses/me) */}
          <ApprovedCoursesList mode="me" />
        </div>
      </div>
    </div>
  );
}
