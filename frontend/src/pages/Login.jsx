import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-page">
      
      <div className="auth-card">

        <div className="brand">
          <div className="brand-icon">🛡️</div>
          <h1>SecureX</h1>
          <p>Private communication.<br />Secure file transfer.</p>
        </div>

        <form>

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
              placeholder="Enter your password"
            />
          </div>

          <div className="options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn">
            Log in
          </button>

        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-buttons">
          <button>🌐 Google</button>
          <button>◉ GitHub</button>
        </div>

        <p className="signup-text">
          Don't have an account?
          <Link to="/register"> Sign up</Link>
        </p>

        <div className="security-box">
          <span>🔒</span>
          <div>
            <strong>Zero-Knowledge Protected</strong>
            <p>Your data is encrypted before it leaves your device.</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Login;