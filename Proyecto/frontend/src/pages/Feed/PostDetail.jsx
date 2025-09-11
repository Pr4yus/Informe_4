import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Posts from '../../api/posts.api.js';

import PostForm from '../../components/posts/PostForm.jsx'; 
import PostCard from '../../components/feed/PostCard.jsx';
import CommentForm from '../../components/posts/CommentForm.jsx';
import CommentList from '../../components/posts/CommentList.jsx';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await Posts.getById(id);
      setPost(data || null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-header center">
          <h2 className="card-title">Detalle de publicación</h2>
          <p className="card-description">Consulta el contenido y participa con tus comentarios</p>
        </div>

        <div className="card-content">
          {loading && (
            <div className="center muted" style={{ padding: '24px 0' }}>
              Cargando…
            </div>
          )}

          {!loading && !post && (
            <div className="center muted" style={{ padding: '24px 0' }}>
              No se encontró la publicación.
            </div>
          )}

          {!loading && post && (
            <>
              {/* Vista de la publicación */}
              <PostCard item={post} full />

              {/* Comentarios (si tus componentes manejan el API internamente, perfecto;
                  si no, adapta CommentForm para que al enviar llame a tu endpoint y luego haga load()) */}
              <div style={{ marginTop: 24 }}>
                <h3 style={{ margin: '0 0 12px 0' }}>Comentarios</h3>
                <CommentForm postId={id} onCreated={load} />
                <CommentList postId={id} />
              </div>
            </>
          )}

          <div className="center" style={{ marginTop: 16 }}>
            <Link to="/" className="btn" style={{ width: 'auto', padding: '0 16px' }}>
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
