import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SESSION_KEY = 'adminSession';
const SESSION_DURATION = 3 * 60 * 60 * 1000;
const TOAST_KEY = 'adminToast';
const LOGOUT_TOAST_KEY = 'adminLogoutToast';

const getSession = () => {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;
    const parsed = JSON.parse(session);
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const setSession = (token, email) => {
  const session = {
    token,
    email,
    expiresAt: Date.now() + SESSION_DURATION,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

const getPersistentToast = () => {
  try {
    const raw = sessionStorage.getItem(TOAST_KEY);
    if (!raw) return null;
    const toast = JSON.parse(raw);
    sessionStorage.removeItem(TOAST_KEY);
    return toast;
  } catch {
    return null;
  }
};

const getLogoutToast = () => {
  try {
    const raw = sessionStorage.getItem(LOGOUT_TOAST_KEY);
    if (!raw) return null;
    const toast = JSON.parse(raw);
    sessionStorage.removeItem(LOGOUT_TOAST_KEY);
    return toast;
  } catch {
    return null;
  }
};

const setPersistentToast = (message, type = 'success') => {
  sessionStorage.setItem(TOAST_KEY, JSON.stringify({ message, type }));
};

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showPasswordField = isEmailValid && email.length > 0;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validateEmail = (value) => {
    if (value.length === 0) {
      setEmailError('');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Incorrect email');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    if (emailError) setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    if (!showPasswordField) return;
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        if (data.errorType === 'email') {
          setEmailError(data.message);
        } else if (data.errorType === 'password') {
          setPasswordError(data.message);
        }
        return;
      }
      setSession(data.token, data.email);
      setPersistentToast('Login successful', 'success');
      navigate('/admin-dashboard');
    } catch (err) {
      setPasswordError('Login failed. Please try again.');
      setToast({ message: 'Login failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const session = getSession();
    if (session) {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    const pending = getLogoutToast();
    if (pending) {
      setToast(pending);
      setTimeout(() => setToast(null), 3000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-800 rounded-2xl p-8 ring-1 ring-zinc-50/5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-50">Admin Login</h1>
            <p className="text-zinc-400 text-sm mt-1">Sign in to manage portfolio content</p>
          </div>
          <a
            href="/"
            className="btn btn-outline text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Website
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="admin@example.com"
              className="text-field"
              autoComplete="email"
            />
            {emailError && (
              <p className="text-red-400 text-xs mt-2">{emailError}</p>
            )}
          </div>

          {showPasswordField && (
            <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  placeholder="Enter your password"
                  className="text-field pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  <span className="material-symbols-rounded text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {passwordError && (
                <p className="text-red-400 text-xs mt-2">{passwordError}</p>
              )}
              <button
                type="submit"
                disabled={loading || !password}
                className="btn btn-primary w-full mt-4"
              >
                {loading ? 'Signing in...' : 'Admin Login'}
              </button>
            </div>
          )}
        </form>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 ${
              toast.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30'
                : 'bg-red-500/20 text-red-400 ring-1 ring-red-500/30'
            }`}
          >
            <span className="material-symbols-rounded text-[18px]">
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export { AdminLogin, getSession, clearSession };
export default AdminLogin;
