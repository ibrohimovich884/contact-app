export function PubgIcon({ size = 24, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Spetsnaz Level 3 Helmet Silhouette */}
      <path
        d="M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-4z"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <path d="M4 11a8 8 0 0 1 16 0v3H4v-3z" />
      <path d="M7 14h10v2a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-2z" />
      <line x1="7" y1="14" x2="17" y2="14" strokeWidth="2" />
      <line x1="9.5" y1="14" x2="9.5" y2="17" />
      <line x1="14.5" y1="14" x2="14.5" y2="17" />
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function StandoffIcon({ size = 24, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Tactical Shield with Crosshairs & Wings */}
      <path
        d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <circle cx="12" cy="11" r="3.5" strokeWidth="1.6" />
      <line x1="12" y1="5.5" x2="12" y2="8" strokeWidth="2" />
      <line x1="12" y1="14" x2="12" y2="16.5" strokeWidth="2" />
      <line x1="6.5" y1="11" x2="9" y2="11" strokeWidth="2" />
      <line x1="15" y1="11" x2="17.5" y2="11" strokeWidth="2" />
    </svg>
  );
}

export function EaFcIcon({ size = 24, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* EA Sports FC Iconic Inverted Triangle Crest */}
      <polygon
        points="3,4 21,4 12,20"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Inner Football Hexagon / Geometry */}
      <polygon
        points="8.5,8 15.5,8 12,14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="12" y1="14" x2="12" y2="18.5" strokeWidth="1.5" />
      <line x1="8.5" y1="8" x2="5" y2="5" strokeWidth="1.5" />
      <line x1="15.5" y1="8" x2="19" y2="5" strokeWidth="1.5" />
    </svg>
  );
}

export function GameIcon({ id, size = 24, className = "" }) {
  switch (id) {
    case "pubg":
      return <PubgIcon size={size} className={className} />;
    case "standoff":
      return <StandoffIcon size={size} className={className} />;
    case "fc":
      return <EaFcIcon size={size} className={className} />;
    default:
      return null;
  }
}
