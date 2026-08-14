import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Temporary frontend navigation.
    // Real authentication will be connected to the backend later.
    navigate("/chat");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="brand">

          <div className="brand-icon">
            🛡️
          </div>

          <h1>SecureX</h1>

          <p>
            Private communication.
            <br />
            Secure file transfer.
          </p>

        </div>


        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />

          </div>


          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              required
            />

          </div>


          <div className="options">

            <label className="remember">

              <input
                type="checkbox"
              />

              Remember me

            </label>


            <a
              href="#"
              onClick={(event) => event.preventDefault()}
            >
              Forgot password?
            </a>

          </div>


          <button
            type="submit"
            className="login-btn"
          >
            Log in
          </button>

        </form>


        <div className="divider">
          <span>or continue with</span>
        </div>


        <div className="social-buttons">

          <button
            type="button"
            onClick={() => alert("Google login will be connected later.")}
          >
            🌐 Google
          </button>

          <button
            type="button"
            onClick={() => alert("GitHub login will be connected later.")}
          >
            ◉ GitHub
          </button>

        </div>


        <p className="signup-text">

          Don't have an account?

          <Link to="/register">
            {" "}Sign up
          </Link>

        </p>


        <div className="security-box">

          <span>🔒</span>

          <div>

            <strong>
              Zero-Knowledge Protected
            </strong>

            <p>
              Your data is encrypted before it
              leaves your device.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;