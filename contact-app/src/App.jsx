import "./App.css";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com/ibrohimovich_o1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/ibrohimovich_o1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 4 3 11l6 2m12-9-4 17-8-6m12-11L9 13" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@ibrohimovich_o1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 3v10.5a3.5 3.5 0 1 1-3-3.46" />
        <path d="M14 3c.4 2.2 2 4 5 4.2" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20l1.3-3.8A8 8 0 1 1 8.8 19L4 20Z" />
        <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 9h3V6h-3a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h3l1-3h-4V9a1 1 0 0 1 1-1Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/ibrohimovich884",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.6 2.8 5.5 3.1 5.5 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7.5 10.5v6M7.5 7.7v.1M11.5 16.5v-3.4c0-1.5 1-2.6 2.5-2.6s2.5 1.1 2.5 2.6v3.4" />
      </svg>
    ),
  },
];

const PROJECTS = [
  { title: "Forex Trading Bot", href: "#" },
  { title: "Loyiha nomi", href: "#" },
  { title: "Loyiha nomi", href: "#" },
  { title: "Loyiha nomi", href: "#" },
];

export default function App() {
  return (
    <div className="page">
      <div className="glass-card">
        <div className="sheen" />

        <div className="avatar-wrap">
          <div className="ring" />
          <div className="avatar-inner">
            {/* <img src="/avatar.jpg" alt="Profil rasmi" /> */}
            <span className="avatar-initials">OY</span>
          </div>
        </div>

        <h1 className="name">Ibrohimovich</h1>
        <div className="handle">@ibrohimovich_o1</div>
        <p className="bio">
          Dasturchi &amp; algo-trading bilan qiziquvchi. Python, React va Forex
          bot loyihalari ustida ishlayman.
        </p>

        <div className="eyebrow">Ijtimoiy tarmoqlar</div>
        <div className="socials">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              className="social-btn"
              href={s.href}
              target="_blank"
              rel="noreferrer"
              title={s.name}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="eyebrow">Loyihalarim</div>
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <a key={p.title + i} className="project-card" href={p.href} target="_blank" rel="noreferrer">
              <span className="project-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="project-title">{p.title}</span>
            </a>
          ))}
        </div>

        <div className="footer-note">© 2026 Ibrohimovich</div>
      </div>
    </div>
  );
}