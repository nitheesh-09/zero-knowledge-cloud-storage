import "./Chat.css";
import FileUpload from "../components/files/FileUpload";

function Chat() {
  return (
    <div className="chat-app">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        {/* BRAND */}
        <div className="sidebar-brand">
          <div className="brand-mark">
            S
          </div>

          <div>
            <h2>SecureX</h2>
            <span>Zero-knowledge storage</span>
          </div>
        </div>


        {/* SEARCH */}
        <div className="search-wrapper">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search files"
          />

          <span className="search-shortcut">
            /
          </span>
        </div>


        {/* NAVIGATION */}
        <div className="conversation-header">
          <span>Storage</span>
        </div>


        <div className="conversation-list">

          <button className="sidebar-item active">
            <span className="item-icon">⌂</span>
            Dashboard
          </button>

          <button className="sidebar-item">
            <span className="item-icon">▣</span>
            My Files
          </button>

          <button className="sidebar-item">
            <span className="item-icon">↗</span>
            Shared Files
          </button>

          <button className="sidebar-item">
            <span className="item-icon">◷</span>
            Activity
          </button>

        </div>


        {/* UPLOAD */}
        <button
          className="new-conversation"
          type="button"
        >
          <span>+</span>
          Upload file
        </button>


        {/* SIDEBAR BOTTOM */}
        <div className="sidebar-bottom">

          <button
            className="sidebar-item"
            type="button"
          >
            <span className="item-icon">⚙</span>
            Settings
          </button>

          <button
            className="sidebar-item"
            type="button"
          >
            <span className="item-icon">?</span>
            Help & support
          </button>


          {/* ACCOUNT */}
          <div className="account">

            <div className="account-avatar">
              U
            </div>

            <div className="account-info">
              <strong>Your account</strong>
              <span>SecureX user</span>
            </div>

            <button
              className="account-menu"
              type="button"
            >
              ···
            </button>

          </div>

        </div>

      </aside>


      {/* =========================
          MAIN AREA
      ========================= */}

      <main className="chat-main">

        {/* HEADER */}

        <header className="chat-header">

          <div className="chat-header-info">

            <div className="header-mark">
              S
            </div>

            <div>
              <h3>SecureX</h3>

              <span>
                Your private cloud storage
              </span>
            </div>

          </div>


          <div className="header-security">

            <span className="security-dot"></span>

            <span>
              Protected
            </span>

          </div>

        </header>


        {/* =========================
            DASHBOARD
        ========================= */}

        <section className="welcome">

          <div className="welcome-inner">

            {/* LOGO */}

            <div className="welcome-mark">
              S
            </div>


            {/* SECURITY BADGE */}

            <div className="welcome-badge">

              <span className="badge-dot"></span>

              Zero-knowledge storage

            </div>


            {/* TITLE */}

            <h1>
              Your files,
              <br />
              kept private.
            </h1>


            <p>
              Store and manage your files securely.
              <br />
              Your files are encrypted before they leave your device.
            </p>


            {/* =========================
                STORAGE CARD
            ========================= */}

            <div className="storage-card">

              <div className="storage-card-header">

                <div>

                  <span className="storage-label">
                    Storage
                  </span>

                  <strong>
                    0 GB
                  </strong>

                </div>


                <div className="storage-limit">
                  0 GB / 10 GB
                </div>

              </div>


              {/* STORAGE PROGRESS */}

              <div className="storage-progress">

                <div
                  className="storage-progress-fill"
                  style={{ width: "0%" }}
                ></div>

              </div>


              <span className="storage-description">
                Your encrypted storage usage
              </span>

            </div>


            {/* =========================
                ACTIONS
            ========================= */}

            <div className="storage-actions">

              <FileUpload />

              <button
                className="secondary-button"
                type="button"
              >
                View my files
              </button>

            </div>


            {/* =========================
                SECURITY NOTE
            ========================= */}

            <div className="encryption-note">

              <span className="lock-icon">
                ◆
              </span>

              <span>
                Files are encrypted before upload
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Chat;