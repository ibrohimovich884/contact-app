import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export default function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="pwa-offline-indicator"
      className="offline-banner"
      role="status"
      aria-live="polite"
    >
      <div className="offline-banner-inner">
        <WifiOff size={15} className="offline-icon" />
        <span>Oflayn rejim — Keshdagi ma'lumotlar ko'rsatilmoqda</span>
      </div>
    </div>
  );
}
