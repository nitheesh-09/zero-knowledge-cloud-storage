import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="brand">
          <div className="brand-icon">🛡️</div>

          <h1>SecureX</h1>

          <p>
            Create your account.<br />
            Your communication stays private.
          </p>
        </div>

        <form>

          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Create account
          </button>

        </form>

        <p className="signup-text">
          Already have an account?
          <Link to="/login"> Log in</Link>
        </p>

        <div className="security-box">

          <span>🔒</span>

          <div>
            <strong>Zero-Knowledge Protected</strong>

            <p>
              Your private data is encrypted
              before it leaves your device.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;