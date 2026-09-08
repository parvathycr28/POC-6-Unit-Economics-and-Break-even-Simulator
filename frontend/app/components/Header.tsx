"use client";

import {
  Info,
  Play,
  Share2,
  Upload,
} from "lucide-react";

type HeaderProps = {
  onInfo: () => void;
};

export default function Header({
  onInfo,
}: HeaderProps) {
  return (
    <header className="top-header">

      <div className="brand-area">

        <div className="brand-icon">
          ✳
        </div>

        <div>
          <div className="brand-title">
            InfoCreon Intership
          </div>

          <div className="brand-subtitle">
            UNIT ECONOMICS &amp; BREAK-EVEN SIMULATOR
          </div>
        </div>

      </div>

      <div className="header-actions">

        <button className="header-button">
          <Share2 size={15} />
          Share
        </button>

        <button className="header-button">
          <Upload size={15} />
          Export
        </button>

        <button className="run-button">
          <Play size={14} fill="currentColor" />
          Run simulation
        </button>

        <button
          type="button"
          onClick={onInfo}
          aria-label="Open information"
          className="profile-button"
        >
          <Info size={17} />
        </button>

      </div>

    </header>
  );
}