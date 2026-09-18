import { useState, useEffect } from "react";
import "./App.css";
import { getStoredData, syncDataWhenOnline } from "./utils/storage";
import SocialModal from "./components/SocialModal";
import TouchFeedback from "./components/TouchFeedback";
import { SocialIcon } from "./components/SocialIcons";
import GamesSection from "./components/GamesSection";
import ProjectsSection from "./components/ProjectsSection";
import { triggerTapFeedback } from "./utils/feedback";
import {
  Share2,
  ChevronDown,
  Sparkles,
  Check,
} from "lucide-react";

export default function App() {
  const [appData, setAppData] = useState(() => getStoredData());
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [showMoreSocials, setShowMoreSocials] = useState(false);
  const [shimmerKey, setShimmerKey] = useState(0);
  const [isReShimmering, setIsReShimmering] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Background sync: updates localStorage and app state whenever online/focused
  useEffect(() => {
    const cleanup = syncDataWhenOnline((freshData) => {
      setAppData(freshData);
    });
    return cleanup;
  }, []);

  const triggerCardShimmer = () => {
    setShimmerKey((prev) => prev + 1);
    setIsReShimmering(true);
    setTimeout(() => {
      setIsReShimmering(false);
    }, 2900);
  };

  const handleOpenSocial = (social) => {
    triggerTapFeedback("pop");
    setSelectedSocial(social);
  };

  const handleCloseSocial = () => {
    setSelectedSocial(null);
    triggerCardShimmer();
  };

  const handleToggleMoreSocials = () => {
    triggerTapFeedback("light");
    setShowMoreSocials((prev) => !prev);
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
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      } catch {
        // ignore
      }
    }
  };

  // Initially display first 6 primary socials, reveal others when "See more" is toggled
  const socialsList = appData.socials || [];
  const displayedSocials = showMoreSocials
    ? socialsList
    : socialsList.slice(0, 6);

  const profile = appData.profile;

  return (
    <div className="page">
      {/* Screen-wide tactile touch ripple, vibration & micro-audio click */}
      <TouchFeedback />

      <div className={`glass-card ${isReShimmering ? "card-re-shimmering" : ""}`}>
        {/* Dynamic re-shimmer & periodic luxury light sweep */}
        <div key={`sheen-${shimmerKey}`} className={`sheen ${isReShimmering ? "sheen-fresh" : ""}`} />
        <div className="card-border-gleam" />

        {/* Quick share button at top-right */}
        <button
          id="share-profile-btn"
          className={`card-share-trigger ${copiedLink ? "share-copied" : ""}`}
          onClick={handleShareApp}
          title={copiedLink ? "Havola nusxalandi!" : "Sahifani ulashish"}
          aria-label={copiedLink ? "Havola nusxalandi!" : "Sahifani ulashish"}
        >
          {copiedLink ? <Check size={16} color="#10b981" /> : <Share2 size={16} />}
        </button>

        {/* Profile Avatar */}
        <div className="avatar-wrap">
          <div className="ring" />
          <div className="avatar-inner">
            <span className="avatar-initials">OY</span>
          </div>
        </div>

        {/* Header Info */}
        <h1 className="name">{profile.name}</h1>
        <div className="handle">{profile.handle}</div>

        {/* Status Indicator */}
        <div className="status-badge-container">
          <span className="status-badge">
            <span className="status-pulse-dot" />
            {profile.status}
          </span>
        </div>

        {/* Professional Full-Stack Bio */}
        <p className="bio">
          Full-Stack veb dasturchi. <strong>React.js</strong>, <strong>Node.js</strong> va{" "}
          <strong>PostgreSQL</strong> asosida zamonaviy interfeyslar, ma&apos;lumotlar bazasi va
          yuqori tezlikdagi web ilovalar ishlab chiqaman.
        </p>

        {/* Tech skills pill tags */}
        <div className="tech-pills-row">
          {profile.skills?.map((skill, idx) => (
            <span key={skill} className="tech-pill">
              {idx === 0 && <Sparkles size={11} />} {skill}
            </span>
          ))}
        </div>

        {/* Socials section */}
        <div className="eyebrow-row">
          <div className="eyebrow">Ijtimoiy tarmoqlar</div>
          <span className="eyebrow-hint">
            {displayedSocials.length} / {socialsList.length} ta tarmoq
          </span>
        </div>

        <div className="socials">
          {displayedSocials.map((s) => (
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

        {/* See More / Show Less Button */}
        <div className="see-more-wrap">
          <button
            id="toggle-more-socials-btn"
            type="button"
            className="see-more-btn"
            onClick={handleToggleMoreSocials}
          >
            <span>
              {showMoreSocials
                ? "Kamroq ko'rsatish"
                : `Ko'proq ko'rish (${socialsList.length - 6} ta yangi tarmoq)`}
            </span>
            <ChevronDown
              size={15}
              className={`see-more-icon ${showMoreSocials ? "rotated" : ""}`}
            />
          </button>
        </div>

        {/* Games section above projects */}
        <GamesSection games={appData.games} onModalClose={triggerCardShimmer} />

        {/* Real projects section */}
        <ProjectsSection projects={appData.projects} />

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
          onClose={handleCloseSocial}
        />
      )}
    </div>
  );
}
