import "./Chat.css";

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
            <span>Private communication</span>
          </div>
        </div>


        {/* SEARCH */}

        <div className="search-wrapper">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search"
          />

          <span className="search-shortcut">
            /
          </span>
        </div>


        {/* SECTION HEADER */}

        <div className="conversation-header">

          <span>Conversations</span>

          <button className="add-button">
            +
          </button>

        </div>


        {/* EMPTY CONVERSATIONS */}

        <div className="conversation-empty">

          <div className="conversation-empty-icon">
            +
          </div>

          <h3>No conversations</h3>

          <p>
            Start a secure conversation with
            someone you know.
          </p>

        </div>


        {/* NEW CONVERSATION */}

        <button className="new-conversation">
          <span>+</span>
          New conversation
        </button>


        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">

          <button className="sidebar-item">
            <span className="item-icon">⚙</span>
            Settings
          </button>

          <button className="sidebar-item">
            <span className="item-icon">?</span>
            Help & support
          </button>


          <div className="account">

            <div className="account-avatar">
              U
            </div>

            <div className="account-info">
              <strong>Your account</strong>
              <span>SecureX user</span>
            </div>

            <button className="account-menu">
              ···
            </button>

          </div>

        </div>

      </aside>


      {/* =========================
          MAIN CHAT
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
                Your private conversations
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


        {/* WELCOME */}

        <section className="welcome">

          <div className="welcome-inner">

            <div className="welcome-mark">
              S
            </div>

            <div className="welcome-badge">
              <span className="badge-dot"></span>
              Private by design
            </div>

            <h1>
              Your conversations,
              <br />
              kept private.
            </h1>

            <p>
              Send messages and files securely.
              <br />
              Your data is encrypted before it leaves your device.
            </p>


            <button className="start-button">
              <span>+</span>
              Start a conversation
            </button>


            <div className="encryption-note">

              <span className="lock-icon">
                ◆
              </span>

              <span>
                End-to-end encrypted
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Chat;