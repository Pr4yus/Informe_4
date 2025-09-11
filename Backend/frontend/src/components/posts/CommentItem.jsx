import React from 'react';
import { fmt } from '../../lib/formatDate.js';

export default function CommentItem({ item }) {
  return (
    <li className="card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <strong>{item.author_name} ({item.author_registro})</strong>
        <span className="small">{fmt(item.created_at)}</span>
      </div>
      <p style={{marginTop:6, whiteSpace:'pre-wrap'}}>{item.message}</p>
    </li>
  );
}
