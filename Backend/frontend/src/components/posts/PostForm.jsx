import React, { useEffect, useState } from 'react';
import * as Catalog from '../../api/catalog.api.js';

export default function PostForm({ onSubmit, loading }) {
  const [type, setType] = useState('curso');
  const [message, setMessage] = useState('');
  const [courseId, setCourseId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [qCourse, setQCourse] = useState('');
  const [qTeacher, setQTeacher] = useState('');

  useEffect(()=>{ Catalog.getCourses(qCourse).then(r => setCourses(r.data)); }, [qCourse]);
  useEffect(()=>{ Catalog.getTeachers(qTeacher).then(r => setTeachers(r.data)); }, [qTeacher]);

  const submit = (e)=>{
    e.preventDefault();
    const payload = { type, message };
    if (type === 'curso') payload.courseId = Number(courseId);
    if (type === 'catedratico') payload.teacherId = Number(teacherId);
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={submit} className="col" style={{gap:12}}>
      <div className="row">
        <label><input type="radio" checked={type==='curso'} onChange={()=>setType('curso')} /> Curso</label>
        <label><input type="radio" checked={type==='catedratico'} onChange={()=>setType('catedratico')} /> Catedrático</label>
      </div>

      {type === 'curso' ? (
        <div className="col">
          <label>Curso</label>
          <input placeholder="Buscar curso..." value={qCourse} onChange={e=>setQCourse(e.target.value)} />
          <select value={courseId} onChange={e=>setCourseId(e.target.value)}>
            <option value="">-- Selecciona --</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.code} · {c.name} ({c.credits} cr.)</option>)}
          </select>
        </div>
      ) : (
        <div className="col">
          <label>Catedrático</label>
          <input placeholder="Buscar catedrático..." value={qTeacher} onChange={e=>setQTeacher(e.target.value)} />
          <select value={teacherId} onChange={e=>setTeacherId(e.target.value)}>
            <option value="">-- Selecciona --</option>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      )}

      <div className="col">
        <label>Mensaje</label>
        <textarea rows={5} value={message} onChange={e=>setMessage(e.target.value)} />
      </div>

      <button className="primary" disabled={loading || (type==='curso' ? !courseId : !teacherId) || !message.trim()}>
        {loading ? 'Enviando...' : 'Publicar'}
      </button>
    </form>
  );
}
