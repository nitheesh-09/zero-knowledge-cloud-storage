import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Chat.css";

import FileUpload from "../components/files/FileUpload";

function Chat() {
  const navigate = useNavigate();

  const [conversationStarted, setConversationStarted] =
    useState(false);

  return (
    <div className="chat-app">

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside className="sidebar">

        {/* =====================================
            BRAND
        ===================================== */}

        <div className="sidebar-brand">

          <div className="brand-mark">
            S
          </div>

          <div className="brand-text">

            <h2>
              SecureX
            </h2>

            <span>
              Zero-knowledge storage
            </span>

          </div>

        </div>


        {/* =====================================
            SEARCH
        ===================================== */}

        <div className="search-wrapper">

          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search files"
          />

          <span className="search-shortcut">
            /
          </span>

        </div>


        {/* =====================================
            STORAGE TITLE
        ===================================== */}

        <div className="conversation-header">

          <span>
            Storage
          </span>

        </div>


        {/* =====================================
            NAVIGATION
        ===================================== */}

        <div className="conversation-list">

          {/* Dashboard */}

          <button
            className="sidebar-item active"
            type="button"
            onClick={() => navigate("/chat")}
          >

            <span className="item-icon">
              ⌂
            </span>

            <span>
              Dashboard
            </span>

          </button>


          {/* My Files */}

          <button
            className="sidebar-item"
            type="button"
            onClick={() => navigate("/files")}
          >

            <span className="item-icon">
              ▣
            </span>

            <span>
              My Files
            </span>

          </button>


          {/* Received Files */}

          <button
            className="sidebar-item"
            type="button"
            onClick={() => navigate("/received")}
          >

            <span className="item-icon">
              ↗
            </span>

            <span>
              Received Files
            </span>

          </button>


          {/* Activity */}

          <button
            className="sidebar-item"
            type="button"
            onClick={() => {
              alert(
                "Activity will be connected later."
              );
            }}
          >

            <span className="item-icon">
              ◷
            </span>

            <span>
              Activity
            </span>

          </button>

        </div>


        {/* =====================================
            START CONVERSATION
        ===================================== */}

        <button
          className="new-conversation"
          type="button"
          onClick={() =>
            setConversationStarted(true)
          }
        >

          <span className="new-conversation-icon">
            +
          </span>

          <span>
            Start conversation
          </span>

        </button>


        {/* =====================================
            SIDEBAR BOTTOM
        ===================================== */}

        <div className="sidebar-bottom">


          {/* Settings */}

          <button
            className="sidebar-item"
            type="button"
            onClick={() => {
              alert(
                "Settings will be connected later."
              );
            }}
          >

            <span className="item-icon">
              ⚙
            </span>

            <span>
              Settings
            </span>

          </button>


          {/* Help */}

          <button
            className="sidebar-item"
            type="button"
            onClick={() => {
              alert(
                "Help & support will be connected later."
              );
            }}
          >

            <span className="item-icon">
              ?
            </span>

            <span>
              Help & support
            </span>

          </button>


          {/* =================================
              ACCOUNT
          ================================= */}

          <div className="account">

            <div className="account-avatar">
              U
            </div>


            <div className="account-info">

              <strong>
                Your account
              </strong>

              <span>
                SecureX user
              </span>

            </div>


            <button
              className="account-menu"
              type="button"
              onClick={() => {
                alert(
                  "Account menu will be connected later."
                );
              }}
            >
              ···
            </button>

          </div>

        </div>

      </aside>


      {/* =========================================
          MAIN AREA
      ========================================= */}

      <main className="chat-main">


        {/* =====================================
            HEADER
        ===================================== */}

        <header className="chat-header">

          <div className="chat-header-info">

            <div className="header-mark">
              S
            </div>


            <div className="header-text">

              <h3>
                SecureX
              </h3>

              <span>
                Private & secure
              </span>

            </div>

          </div>


          {/* Protection status */}

          <div className="header-security">

            <span className="security-dot"></span>

            <span>
              Protected
            </span>

          </div>

        </header>


        {/* =====================================
            MAIN CONTENT
        ===================================== */}

        <section className="welcome">

          <div className="welcome-inner">


            {/* =================================
                SECUREX LOGO
            ================================= */}

            <div className="welcome-mark">
              S
            </div>


            {/* =================================
                SECURITY BADGE
            ================================= */}

            <div className="welcome-badge">

              <span className="badge-dot"></span>

              <span>
                Zero-knowledge protected
              </span>

            </div>


            {/* =================================
                BEFORE CONVERSATION
            ================================= */}

            {!conversationStarted && (

              <>

                <h1>
                  Start a conversation
                </h1>


                <p>
                  Communicate privately and securely.
                  <br />
                  Your files remain protected
                  throughout the process.
                </p>


                <button
                  className="start-button"
                  type="button"
                  onClick={() =>
                    setConversationStarted(true)
                  }
                >

                  Start conversation

                </button>

              </>

            )}


            {/* =================================
                AFTER CONVERSATION
            ================================= */}

            {conversationStarted && (

              <>

                <h1>
                  Upload a file
                </h1>


                <p>
                  Select a file to securely share.
                  <br />
                  Your file will be scanned before
                  encryption.
                </p>


                {/* =============================
                    FILE UPLOAD
                ============================= */}

                <div className="upload-section">

                  <FileUpload />

                </div>


                {/* =============================
                    SECURITY FLOW
                ============================= */}

                <div className="encryption-note">

                  <span className="lock-icon">
                    ◆
                  </span>

                  <span>
                    YARA scan
                  </span>

                  <span className="flow-arrow">
                    →
                  </span>

                  <span>
                    Encryption
                  </span>

                  <span className="flow-arrow">
                    →
                  </span>

                  <span>
                    Secure storage
                  </span>

                </div>

              </>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Chat;