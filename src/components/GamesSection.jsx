import { useState } from "react";
import { Gamepad2, Lock } from "lucide-react";
import { GAMES_DATA } from "../data/games";
import { triggerTapFeedback } from "../utils/feedback";
import { GameIcon } from "./GameIcons";
import GameModal from "./GameModal";

export default function GamesSection({ onModalClose, games = GAMES_DATA }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleOpenGame = (game) => {
    triggerTapFeedback("pop");
    setSelectedGame(game);
  };

  const handleCloseGame = () => {
    setSelectedGame(null);
    if (onModalClose) {
      onModalClose();
    }
  };

  return (
    <section className="games-section" aria-labelledby="games-heading">
      <div className="eyebrow-row">
        <div id="games-heading" className="eyebrow">
          <Gamepad2 size={15} className="inline-icon" />
          <span>O'yinlar</span>
        </div>
        <span className="eyebrow-hint">
          <Lock size={10} className="inline-lock-hint" /> Tez kunda
        </span>
      </div>

      <div className="games-social-grid">
        {games.map((game) => (
          <button
            key={game.id}
            id={`game-btn-${game.id}`}
            className="game-square-btn"
            onClick={() => handleOpenGame(game)}
            type="button"
            aria-label={`${game.name} - Tez kunda`}
            title={`${game.name} - Profil tez kunda`}
            style={{
              "--game-accent": game.color,
              "--game-glow": game.glowColor,
            }}
          >
            {/* Inner Icon Box matching Social Button style */}
            <div
              className="game-square-inner"
              style={{ background: game.gradient }}
            >
              <GameIcon id={game.id} size={22} />

              {/* Corner Lock Pin */}
              <div className="game-corner-lock" title="Tez kunda">
                <Lock size={10} />
              </div>
            </div>

            {/* Game Name */}
            <span className="game-square-label">{game.name}</span>

            {/* "Tez kunda" Status Badge with Lock */}
            <span className="game-square-status">
              <Lock size={9} />
              <span>Tez kunda</span>
            </span>
          </button>
        ))}
      </div>

      {/* Game Detail / Coming Soon Card Modal */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={handleCloseGame} />
      )}
    </section>
  );
}
