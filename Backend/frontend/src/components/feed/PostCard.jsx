import React from 'react';
import { Link } from 'react-router-dom';
import { fmt } from '../../lib/formatDate.js';

export default function PostCard({ post }) {
  return (
    <div className="card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <div className="row" style={{gap:8}}>
          <span className="badge">{post.type === 'curso' ? 'Curso' : 'Catedrático'}</span>
          {post.course_name && <span className="badge">{post.course_code} · {post.course_name}</span>}
          {post.teacher_name && <span className="badge">{post.teacher_name}</span>}
        </div>
        <span className="small">{fmt(post.created_at)}</span>
      </div>
      <p style={{marginTop:8, whiteSpace:'pre-wrap'}}>{post.message}</p>
      <div className="row" style={{justifyContent:'space-between'}}>
        <span className="small">por {post.author_name} ({post.author_registro})</span>
        <Link to={`/post/${post.id}`} className="badge">{post.comments_count} comentarios</Link>
      </div>
    </div>
  );
}
