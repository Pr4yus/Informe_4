// src/pages/Feed/Home.jsx
import React, { useEffect, useState } from 'react';
import * as Posts from '../../api/posts.api.js';
import FiltersBar from '../../components/feed/FiltersBar.jsx';
import PostList from '../../components/feed/PostList.jsx';

export default function Home() {
  const [filters, setFilters] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Posts.getAll(filters)
      .then((r) => {
        if (!alive) return;
        setItems(Array.isArray(r?.data) ? r.data : []);
      })
      .catch(() => {
        if (!alive) return;
        setItems([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => { alive = false; };
  }, [JSON.stringify(filters)]);

  const hasItems = items && items.length > 0;

  return (
    <div className="page">
      <div className="card">
        <div className="card-header center">
          <h2 className="card-title">Publicaciones</h2>
          <p className="card-description">Explora las últimas novedades del campus</p>
        </div>

        <div className="card-content">
          {/* Filtros */}
          <div style={{ marginBottom: 12 }}>
            <FiltersBar filters={filters} onChange={setFilters} />
          </div>

          {/* Estados */}
          {loading && (
            <div className="center muted" style={{ padding: '24px 0' }}>
              Cargando…
            </div>
          )}

          {!loading && !hasItems && (
            <div className="center muted" style={{ padding: '24px 0' }}>
              No hay publicaciones que coincidan con tu búsqueda.
            </div>
          )}

          {/* Lista */}
          {!loading && hasItems && <PostList items={items} />}
        </div>
      </div>
    </div>
  );
}
