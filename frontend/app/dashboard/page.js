// frontend/app/dashboard/page.js
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [conditions, setConditions] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('conditions');
    if (stored) setConditions(JSON.parse(stored));

    const fav = localStorage.getItem('favorites');
    setFavorites(fav ? JSON.parse(fav) : []);
  }, []);

  function saveFavorite(item) {
    const next = [...favorites, item];
    // ensure unique by id (or title)
    const unique = Array.from(new Map(next.map(i => [i.id || i.title, i])).values());
    setFavorites(unique);
    localStorage.setItem('favorites', JSON.stringify(unique));
    alert('Saved to favorites ✓');
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui', padding: 30, maxWidth: 900, margin: '0 auto' }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2 style={{ margin: 0 }}>Your Health Dashboard 🧬</h2>
        <nav style={{ display:'flex', gap:12 }}>
          <Link href="/favorites" style={{ textDecoration:'none' }}>Favorites ({favorites.length})</Link>
          <Link href="/" style={{ textDecoration:'none' }}>Home</Link>
        </nav>
      </header>

      <p style={{ color:'#555', marginTop:12 }}>
        Based on your described symptoms, here are relevant clinical trials & experts:
      </p>

      {conditions.length === 0 ? (
        <p>No conditions detected yet. Go back and run detection first.</p>
      ) : (
        conditions.map((c, i) => {
          // create fake items per condition
          const trial = {
            id: `trial-${i}-${c}`,
            type: 'trial',
            title: `${c} Research Study at Apollo Hospital`,
            summary: `A clinical trial studying ${c} treatments. Phase II — recruiting.`,
            contact: `trials@apollo.example`
          };
          const expert = {
            id: `expert-${i}-${c}`,
            type: 'expert',
            title: `Dr. ${c.split(' ')[0]} Expert`,
            summary: `Specialist in ${c}. Works at ${['Bangalore','Hyderabad','Delhi'][i%3]}.`,
            contact: `dr.${c.split(' ')[0].toLowerCase()}@hospital.example`
          };

          return (
            <section key={i} style={{ marginTop: 22, padding: 16, border: '1px solid #e6e6e6', borderRadius: 10 }}>
              <h3 style={{ marginBottom: 6 }}>{c}</h3>

              <div style={{ display:'grid', gap:12 }}>
                <div style={{ padding:12, borderRadius:8, background:'#fafafa' }}>
                  <strong>{trial.title}</strong>
                  <p style={{ margin:6 }}>{trial.summary}</p>
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={() => saveFavorite(trial)} style={btnSmall}>Save Trial</button>
                    <a href={`mailto:${trial.contact}`} style={linkBtn}>Contact</a>
                  </div>
                </div>

                <div style={{ padding:12, borderRadius:8, background:'#fff' }}>
                  <strong>{expert.title}</strong>
                  <p style={{ margin:6 }}>{expert.summary}</p>
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={() => saveFavorite(expert)} style={btnSmall}>Save Expert</button>
                    <a href={`mailto:${expert.contact}`} style={linkBtn}>Request Meeting</a>
                  </div>
                </div>
              </div>
            </section>
          );
        })
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
