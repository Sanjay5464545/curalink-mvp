// frontend/app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ fontFamily: 'Inter, system-ui', padding: 28, maxWidth: 900, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>CuraLink</h1>
        <nav>
          <a href="https://t.me/+R-WNywM9ZOdhYmM1" target="_blank" rel="noreferrer" style={{ marginRight: 12 }}>Telegram</a>
          <a href="#" style={{ color: '#666' }}>Docs</a>
        </nav>
      </header>

      <section style={{ textAlign: 'center', marginTop: 48 }}>
        <h2 style={{ fontSize: 28, marginBottom: 8 }}>Discover clinical trials & health experts</h2>
        <p style={{ color: '#555' }}>AI-powered search & summaries for patients and researchers — simple MVP.</p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 36 }}>
          <Link href="/patient">
            <button style={btnStyle}>I am a Patient or Caregiver</button>
          </Link>
          <Link href="/researcher">
            <button style={{ ...btnStyle, background: '#fff', border: '1px solid #ddd' }}>I am a Researcher</button>
          </Link>
        </div>
      </section>

      <footer style={{ marginTop: 80, color: '#888', fontSize: 13 }}>
        <div>Built for Humanity Founders — CuraLink MVP</div>
      </footer>
    </main>
  );
}

const btnStyle = {
  padding: '14px 20px',
  borderRadius: 10,
  border: 'none',
  background: '#111',
  color: '#fff',
  fontWeight: 700,
  cursor: 'pointer'
};
