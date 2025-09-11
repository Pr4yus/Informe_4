import React, { useState } from 'react';

export default function CommentForm({ onSubmit, loading }) {
  const [message, setMessage] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSubmit?.({ message });
    setMessage('');
  };
  return (
    <form onSubmit={submit} className="row" style={{gap:8}}>
      <input placeholder="Escribe un comentario..." value={message} onChange={e=>setMessage(e.target.value)} />
      <button className="primary" disabled={loading || !message.trim()}>
        {loading ? 'Enviando...' : 'Comentar'}
      </button>
    </form>
  );
}
