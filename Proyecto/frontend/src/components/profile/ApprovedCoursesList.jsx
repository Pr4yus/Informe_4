import React from 'react';

export default function ApprovedCoursesList({ items=[], total=0, onRemove }) {
  return (
    <div className="card">
      <h3>Cursos aprobados</h3>
      <ul className="unstyled col">
        {items.map(c => (
          <li key={c.id} className="row" style={{justifyContent:'space-between'}}>
            <span>{c.code} · {c.name} ({c.credits} cr.)</span>
            {onRemove && <button className="danger" onClick={()=>onRemove(c.id)}>Quitar</button>}
          </li>
        ))}
      </ul>
      <hr />
      <div className="row" style={{justifyContent:'space-between'}}>
        <strong>Total créditos</strong>
        <strong>{total}</strong>
      </div>
    </div>
  );
}
