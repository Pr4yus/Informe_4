import React, { useEffect, useState } from 'react';
import * as Catalog from '../../api/catalog.api.js';

export default function CoursePicker({ onAdd }) {
  const [q, setQ] = useState('');
  const [list, setList] = useState([]);
  const [sel, setSel] = useState('');

  useEffect(()=>{ Catalog.getCourses(q).then(r => setList(r.data)); }, [q]);

  const add = ()=> {
    if (!sel) return;
    onAdd?.(Number(sel));
    setSel('');
  };

  return (
    <div className="card">
      <h3>Agregar curso aprobado</h3>
      <div className="row">
        <input placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
        <select value={sel} onChange={e=>setSel(e.target.value)}>
          <option value="">-- Selecciona --</option>
          {list.map(c => <option key={c.id} value={c.id}>{c.code} · {c.name} ({c.credits} cr.)</option>)}
        </select>
        <button className="primary" onClick={add} disabled={!sel}>Agregar</button>
      </div>
    </div>
  );
}
