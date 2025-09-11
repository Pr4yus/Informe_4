import React from 'react';
import PostCard from './PostCard.jsx';

export default function PostList({ items=[] }) {
  if (!items.length) return <p className="small">No hay publicaciones.</p>;
  return (
    <div className="col" style={{gap:12}}>
      {items.map(p => <PostCard key={p.id} post={p} />)}
    </div>
  );
}
