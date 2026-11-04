import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { usePageTitle } from '../App.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  usePageTitle('Sign In');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/explore';

  const [userType, setUserType] = useState('citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);

    setTimeout(() => {
      login({
        email,
        role: userType,
        displayName: userType === 'citizen' ? 'Verified Citizen' : 'Municipal Officer'
      });
      setLoading(false);
      navigate(from, { replace: true });
    }, 600);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '36px 16px 64px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border-color, #e2e8f0)',
          borderRadius: '20px',
          padding: '36px 32px',
          boxShadow: '0 12px 36px -4px rgba(15, 23, 42, 0.08)'
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.86rem',
            color: 'var(--text-muted, #64748b)',
            textDecoration: 'none',
            fontWeight: '600',
            marginBottom: '20px'
          }}
        >
          ← Back to home
        </Link>

        <h1
          style={{
            fontSize: '1.9rem',
            fontWeight: '800',
            color: 'var(--text-main, #0f172a)',
            margin: '0 0 6px 0',
            letterSpacing: '-0.02em'
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted, #64748b)',
            lineHeight: '1.5',
            margin: '0 0 22px 0'
          }}
        >
          Sign in to access verified water records, grievance tracking, and AI assistant.
        </p>

        {/* Role Switcher Pill */}
        <div
          style={{
            display: 'flex',
            background: 'var(--bg-surface, #f8fafc)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '22px'
          }}
        >
          <button
            type="button"
            onClick={() => setUserType('citizen')}
            style={{
              flex: 1,
              background: userType === 'citizen' ? 'var(--primary, #0284c7)' : 'transparent',
              color: userType === 'citizen' ? '#ffffff' : 'var(--text-muted, #64748b)',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '7px',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Citizen
          </button>
          <button
            type="button"
            onClick={() => setUserType('official')}
            style={{
              flex: 1,
              background: userType === 'official' ? 'var(--primary, #0284c7)' : 'transparent',
              color: userType === 'official' ? '#ffffff' : 'var(--text-muted, #64748b)',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '7px',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            PHED / Municipal Official
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main, #334155)', marginBottom: '6px' }}>
              {userType === 'citizen' ? 'Email address or Mobile number' : 'Government Officer Email / ID'}
            </label>
            <input
              type={userType === 'citizen' ? 'text' : 'email'}
              required
              placeholder={userType === 'citizen' ? 'you@example.com or 9876543210' : 'officer.phed@nagpur.gov.in'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border-color, #cbd5e1)',
                background: 'var(--bg-surface, #ffffff)',
                color: 'var(--text-main, #0f172a)',
                fontSize: '0.92rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main, #334155)', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 44px 11px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color, #cbd5e1)',
                  background: 'var(--bg-surface, #ffffff)',
                  color: 'var(--text-main, #0f172a)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted, #64748b)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted, #64748b)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span>Remember me</span>
            </label>
            <a
              href="#forgot"
              onClick={(e) => { e.preventDefault(); alert("Enter your registered email or phone to reset password."); }}
              style={{ color: 'var(--text-muted, #64748b)', textDecoration: 'none' }}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'var(--accent-btn, #f59e0b)',
              color: '#000000',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 18px',
              fontWeight: '800',
              fontSize: '0.94rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '4px',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.25)',
              transition: 'all 0.15s ease'
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color, #e2e8f0)' }}></div>
            <span style={{ padding: '0 12px', fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted, #94a3b8)', letterSpacing: '0.05em' }}>
              OR CONTINUE WITH
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color, #e2e8f0)' }}></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={() => {
              login({
                email: 'google.citizen@nagpur.in',
                role: userType,
                displayName: 'Google Verified User'
              });
              navigate(from, { replace: true });
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'var(--bg-surface, #f8fafc)',
              border: '1px solid var(--border-color, #cbd5e1)',
              borderRadius: '10px',
              padding: '11px 16px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'var(--text-main, #0f172a)',
              cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Switch to Register */}
          <div style={{ textAlign: 'center', fontSize: '0.86rem', color: 'var(--text-muted, #64748b)', marginTop: '4px' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary, #0284c7)', fontWeight: '700', textDecoration: 'none' }}>
              Sign up free
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}