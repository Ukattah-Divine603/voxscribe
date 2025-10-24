"use client";
import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2>
          <img src="/images/logo.png" alt="VoxScribe Logo" />
          VoxScribe
        </h2>
        <div className="history">
          <h5>Your Transcribe History</h5>
          <div className="items">
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
            <div className="history-items"></div>
          </div>
        </div>
        <div className="user-info">
          <div className="profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0m16 0a8 8 0 1 0-16 0" />
              </g>
            </svg>
          </div>
          <div className="user-text">
            <h5>CODEVINE</h5>
            <p>Free Tier</p>
          </div>
        </div>
      </aside>

      <button
        className={`menu-btn ${isOpen ? "btn-shifted" : "btn-collapsed"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          // ❌ Close Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 21a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zM18 5h-8v14h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1"
            />
          </svg>
        ) : (
          // 🍔 Menu Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 21a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm8-16H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8z"
            />
          </svg>
        )}
      </button>
    </>
  );
}
