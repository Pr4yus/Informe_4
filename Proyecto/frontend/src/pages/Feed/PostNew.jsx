import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as Posts from '../../api/posts.api.js';
import PostForm from '../../components/posts/PostForm.jsx'; 

export default function PostNew() {
  const nav = useNavigate();

  const handleSubmit = async (values) => {

    const { data } = await Posts.create(values);

    if (data?.id) nav(`/post/${data.id}`, { replace: true });
    else nav('/', { replace: true });
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-header center">
          <h2 className="card-title">Nueva publicación</h2>
          <p className="card-description">Comparte algo con la comunidad</p>
        </div>

        <div className="card-content">
          <PostForm onSubmit={handleSubmit} />

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
