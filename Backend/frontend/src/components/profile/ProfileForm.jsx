import React, { useState, useEffect } from 'react';

export default function ProfileForm({ initial={}, onSubmit, loading }) {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    bio: '',
    avatar_url: ''
  });

  useEffect(()=>{
    setForm({
      nombres: initial.nombres || '',
      apellidos: initial.apellidos || '',
      email: initial.email || '',
      bio: initial.bio || '',
      avatar_url: initial.avatar_url || ''
    });
  }, [initial]);

  const set = (k,v)=> setForm(s => ({...s, [k]: v}));
  const submit = (e)=>{ e.preventDefault(); onSubmit?.(form); };

  return (
    <form onSubmit={submit} className="col" style={{gap:12}}>
      <div className="row">
        <div className="col">
          <label>Nombres</label>
          <input value={form.nombres} onChange={e=>set('nombres', e.target.value)} />
        </div>
        <div className="col">
          <label>Apellidos</label>
          <input value={form.apellidos} onChange={e=>set('apellidos', e.target.value)} />
        </div>
      </div>
      <div className="col">
        <label>Email</label>
        <input type="email" value={form.email} onChange={e=>set('email', e.target.value)} />
      </div>
      <div className="col">
        <label>Bio</label>
        <textarea rows={4} value={form.bio} onChange={e=>set('bio', e.target.value)} />
      </div>
      <div className="col">
        <label>Avatar URL</label>
        <input value={form.avatar_url} onChange={e=>set('avatar_url', e.target.value)} />
      </div>
      <button className="primary" disabled={loading}>Guardar</button>
    </form>
  );
}
