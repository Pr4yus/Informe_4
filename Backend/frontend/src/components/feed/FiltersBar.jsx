import React from 'react';

export default function FiltersBar({ filters, onChange }) {
  const set = (k,v)=> onChange({ ...filters, [k]: v });

  return (
    <div className="card" style={{marginBottom:12}}>
      <div className="row">
        <input placeholder="Nombre de curso..." value={filters.courseName||''} onChange={e=>set('courseName', e.target.value)} />
        <input placeholder="Nombre de catedrático..." value={filters.teacherName||''} onChange={e=>set('teacherName', e.target.value)} />
        <button onClick={()=>onChange({})}>Limpiar</button>
      </div>
    </div>
  );
}
