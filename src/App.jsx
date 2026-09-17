import { useState } from "react";
import "./App.css";
import { SOCIALS_DATA } from "./data/socials";
import SocialModal from "./components/SocialModal";
import TouchFeedback from "./components/TouchFeedback";
import { SocialIcon } from "./components/SocialIcons";
import PWAInstallButton from "./components/PWAInstallButton";
import OfflineIndicator from "./components/OfflineIndicator";
import { triggerTapFeedback } from "./utils/feedback";
import {
  TrendingUp,
  Bot,
  ExternalLink,
  Code2,
  Share2,
} from "lucide-react";

export default function App() {
  const [selectedSocial, setSelectedSocial] = useState(null);

  const handleOpenSocial = (social) => {
    triggerTapFeedback("pop");
    setSelectedSocial(social);
  };

  const handleShareApp = async () => {
    triggerTapFeedback("light");
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Oybek Bekmirzayev - Contact & Portfolio",
          text: "Oybek Bekmirzayev (Ibrohimovich) profil kartasi, ijtimoiy tarmoqlari va loyihalari",
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Sahifa havolasi nusxalandi!");
      } catch {
        // ignore
      }
    }
  };

  const PROJECTS = [
    {
      title: "Forex Trading Bot",
      desc: "Avtomatlashtirilgan savdo strategiyalari & risk-menejment",
      icon: <TrendingUp size={18} className="project-icon" />,
      href: "https://github.com/ibrohimovich884",
      status: "Aktiv",
    },
    {
      title: "Telegram Signal Bot",
      desc: "Bozor tahlili va real vaqt signallarini jo'natuvchi bot",
      icon: <Bot size={18} className="project-icon" />,
      href: "https://t.me/ibrohimovich_o1",
      status: "Ishlamoqda",
    },
    {
      title: "React Web Dashboard",
      desc: "Savdo statistikasi va boshqaruv paneli interfeysi",
      icon: <Code2 size={18} className="project-icon" />,
      href: "https://github.com/ibrohimovich884",
      status: "Yangi",
    },
  ];

  return (
    <div className="page">
      {/* Offline banner notification when internet is disconnected */}
      <OfflineIndicator />

      {/* Screen-wide tactile touch ripple, vibration & micro-audio click */}
      <TouchFeedback />

      <div className="glass-card">
        <div className="sheen" />

        {/* Top bar with in-app PWA install button and share button */}
        <div className="card-top-bar">
          <PWAInstallButton />

          <button
            id="share-profile-btn"
            className="card-share-trigger"
            onClick={handleShareApp}
            title="Sahifani ulashish"
            aria-label="Sahifani ulashish"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="avatar-wrap">
          <div className="ring" />
          <div className="avatar-inner">
            <span className="avatar-initials">OY</span>
          </div>
        </div>

        {/* Header Info */}
        <h1 className="name">Ibrohimovich</h1>
        <div className="handle">@ibrohimovich_o1</div>

        {/* Status Indicator */}
        <div className="status-badge-container">
          <span className="status-badge">
            <span className="status-pulse-dot" />
            Yangi loyihalar uchun ochiq
          </span>
        </div>

        <p className="bio">
          Dasturchi &amp; algo-trading bilan qiziquvchi. Python, React va Forex
          bot loyihalari ustida ishlayman.
        </p>

        {/* Socials section */}
        <div className="eyebrow-row">
          <div className="eyebrow">Ijtimoiy tarmoqlar</div>
          <span className="eyebrow-hint">Batafsil ko'rish uchun bosing</span>
        </div>

        <div className="socials">
          {SOCIALS_DATA.map((s) => (
            <button
              key={s.id}
              id={`social-btn-${s.id}`}
              className="social-btn"
              onClick={() => handleOpenSocial(s)}
              type="button"
              aria-label={s.name}
              title={`${s.name} ma'lumotlari`}
            >
              <div className="social-btn-inner">
                <SocialIcon id={s.id} size={22} />
              </div>
              <span className="social-btn-label">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Projects Section */}
        <div className="eyebrow-row">
          <div className="eyebrow">Loyihalarim</div>
          <span className="eyebrow-hint">{PROJECTS.length} ta loyiha</span>
        </div>

        <div className="projects">
          {PROJECTS.map((p, i) => (
            <a
              key={p.title + i}
              id={`project-card-${i}`}
              className="project-card"
              href={p.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => triggerTapFeedback("light")}
            >
              <div className="project-header">
                <div className="project-icon-wrap">{p.icon}</div>
                <span className="project-status-tag">{p.status}</span>
              </div>
              <div className="project-content">
                <span className="project-title">{p.title}</span>
                <span className="project-desc">{p.desc}</span>
              </div>
              <div className="project-footer">
                <span className="project-num">0{i + 1}</span>
                <span className="project-arrow">
                  <ExternalLink size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="footer-note">
          <span>© 2026 Ibrohimovich</span>
          <span className="footer-dot">•</span>
          <span>Aloqa va Portfolio</span>
        </div>
      </div>

      {/* Detail Modal when any social button is clicked */}
      {selectedSocial && (
        <SocialModal
          social={selectedSocial}
          onClose={() => setSelectedSocial(null)}
        />
      )}
    </div>
  );
}
