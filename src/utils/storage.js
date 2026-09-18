import { SOCIALS_DATA } from "../data/socials";
import { PROJECTS_DATA } from "../data/projects";
import { GAMES_DATA } from "../data/games";

const STORAGE_KEYS = {
  SOCIALS: "oybek_portfolio_socials_v1",
  PROJECTS: "oybek_portfolio_projects_v1",
  GAMES: "oybek_portfolio_games_v1",
  PROFILE: "oybek_portfolio_profile_v1",
};

export const DEFAULT_PROFILE = {
  name: "Ibrohimovich",
  handle: "@ibrohimovich_o1",
  status: "Yangi loyihalar uchun ochiq",
  bio: "Full-Stack veb dasturchi. React.js, Node.js va PostgreSQL asosida zamonaviy interfeyslar, ma'lumotlar bazasi va yuqori tezlikdagi web ilovalar ishlab chiqaman.",
  skills: ["React.js", "Node.js", "PostgreSQL", "JavaScript"],
};

function safeGetItem(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    return parsed || fallback;
  } catch {
    return fallback;
  }
}

function safeSetItem(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota/security errors
  }
}

/**
 * Loads cached data from localStorage or seeds it immediately for offline access.
 */
export function getStoredData() {
  const socials = safeGetItem(STORAGE_KEYS.SOCIALS, SOCIALS_DATA);
  const projects = safeGetItem(STORAGE_KEYS.PROJECTS, PROJECTS_DATA);
  const games = safeGetItem(STORAGE_KEYS.GAMES, GAMES_DATA);
  const profile = safeGetItem(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);

  // Guarantee that data is stored in localStorage right away
  safeSetItem(STORAGE_KEYS.SOCIALS, socials);
  safeSetItem(STORAGE_KEYS.PROJECTS, projects);
  safeSetItem(STORAGE_KEYS.GAMES, games);
  safeSetItem(STORAGE_KEYS.PROFILE, profile);

  return { socials, projects, games, profile };
}

/**
 * Automatically updates localStorage with latest data when device is online.
 */
export function syncDataWhenOnline(onUpdate) {
  if (typeof window === "undefined") return () => {};

  const handleSync = () => {
    // If online, refresh localStorage with latest dataset
    safeSetItem(STORAGE_KEYS.SOCIALS, SOCIALS_DATA);
    safeSetItem(STORAGE_KEYS.PROJECTS, PROJECTS_DATA);
    safeSetItem(STORAGE_KEYS.GAMES, GAMES_DATA);
    safeSetItem(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);

    if (typeof onUpdate === "function") {
      onUpdate({
        socials: SOCIALS_DATA,
        projects: PROJECTS_DATA,
        games: GAMES_DATA,
        profile: DEFAULT_PROFILE,
      });
    }
  };

  // Perform initial sync
  handleSync();

  // Listen for browser reconnect event
  window.addEventListener("online", handleSync);
  window.addEventListener("focus", handleSync);

  return () => {
    window.removeEventListener("online", handleSync);
    window.removeEventListener("focus", handleSync);
  };
}
