'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function FavoritesPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fav = localStorage.getItem('favorites');
    setItems(fav ? JSON.parse(fav) : []);
  }, []);

  function removeItem(id) {
    const next = items.filter(i => (i.id || i.title) !== id);
    setItems(next);
    localStorage.setItem('favorites', JSON.stringify(next));
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui', padding: 28, maxWidth: 900, margin: '0 auto' }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2 style={{ margin: 0 }}>Favorites</h2>
        <nav>
          <Link href="/" style={{ textDecoration:'none' }}>Home</Link>
        </nav>
      </header>

      {items.length === 0 ? (
        <p style={{ marginTop: 20 }}>You have no favorites yet. Save trials or experts from your dashboard.</p>
      ) : (
        <div style={{ marginTop: 18, display:'grid', gap:12 }}>
          {items.map((it) => (
            <div key={it.id || it.title} style={{ padding:14, border:'1px solid #e6e6e6', borderRadius:8 }}>
              <strong>{it.title}</strong>
              <p style={{ margin:6 }}>{it.summary}</p>
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={() => removeItem(it.id || it.title)} style={{ ...btnSmall, background:'#e53935' }}>Remove</button>
                {it.type === 'trial' ? (
                  <a href={`mailto:${it.contact}`} style={linkBtn}>Contact Trial</a>
                ) : (
                  <a href={`mailto:${it.contact}`} style={linkBtn}>Contact Expert</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const btnSmall = {
  padding: '8px 12px',
  borderRadius: 8,
  border: 'none',
  background: '#0b5cff',
  color: '#fff',
  cursor: 'pointer'
};

const linkBtn = {
  display: 'inline-block',
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid #ddd',
  textDecoration: 'none',
  color: '#111'
};
