import React from 'react';
import CommentItem from './CommentItem.jsx';

export default function CommentList({ items=[] }) {
  if (!items.length) return <p className="small">Sé el primero en comentar.</p>;
  return (
    <ul className="unstyled col" style={{gap:8}}>
      {items.map(c => <CommentItem key={c.id} item={c} />)}
    </ul>
  );
}
