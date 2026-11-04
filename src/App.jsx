import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import LocationPage from './pages/LocationPage.jsx';
import MapPage from './pages/MapPage.jsx';
import HealthPage from './pages/Health.jsx';
import AssistantPage from './pages/Assistant.jsx';
import MethodologyPage from './pages/Methodology.jsx';
import AboutPage from './pages/About.jsx';
import ComplaintPage from './pages/ComplaintPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

import { UIProvider, useUI } from './context/UIContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { FULL_DICTIONARY } from './utils/translator.js';

export function usePageTitle(t) {
  useEffect(() => {
    document.title = `${t} · Jal Sense India`;
  }, [t]);
}

function MainHeader() {
  const { theme, toggleTheme, language, setLanguage, t } = useUI();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    ['/explore', t('Explore')],
    ['/map', t('Map')],
    ['/health', t('Health')],
    ['/assistant', t('Assistant')],
    ['/methodology', t('Sources')],
    ['/about', t('About')],
    ['/complaint', t('File Complaint')]
  ];

  return (
    <header className="site-header">
      <div className="header-bar wrap">
        <Link to="/" className="site-brand">
          <span className="brand-badge-circle">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </span>
          <span className="brand-text">{t('Jal Sense India')}</span>
        </Link>

        <nav aria-label="Main" className="site-nav">
          <ul>
            <li><NavLink to="/" end>{language === 'mr' ? 'मुख्यपृष्ठ' : language === 'hi' ? 'होम' : 'Home'}</NavLink></li>
            {navItems.map(([path, label]) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    path === '/complaint'
                      ? (isActive ? 'active nav-complaint-btn' : 'nav-complaint-btn')
                      : (isActive ? 'active' : undefined)
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-controls">
          <div className="lang-select-shell">
            <span className="lang-globe-icon">🌐</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="lang-select-menu"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
          

          
            

          {isAuthenticated ? (
            <div className="user-profile-badge">
              <span className="user-name-tag">{user?.displayName || 'Citizen'}</span>
              <button onClick={logout} className="btn-header-logout">{t('Logout')}</button>
            </div>
          ) : (
            <div className="auth-buttons-group">
              <Link to="/login" className="btn-header-login">
                {t('Log In')}
              </Link>
              <button
  onClick={() => navigate('/register')}
  className="btn-header-get-started"
>
  {t('Get Started')}
</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function AppContent() {
  const { language } = useUI();

  // Full-website live DOM translation watcher
  useEffect(() => {
    if (language === 'en') return;

    const translateDOM = () => {
      const walker = document.createTreeWalker(
        document.getElementById('main') || document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      let node;
      while ((node = walker.nextNode())) {
        const text = node.nodeValue.trim();
        if (text && FULL_DICTIONARY[text] && FULL_DICTIONARY[text][language]) {
          node.nodeValue = node.nodeValue.replace(text, FULL_DICTIONARY[text][language]);
        }
      }
    };

    translateDOM();
    const timer = setTimeout(translateDOM, 300); // Catches dynamic API data loads
    return () => clearTimeout(timer);
  }, [language]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <MainHeader />

      <main id="main" className="wrap" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/location/:id" element={<LocationPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/complaint"
            element={
              <ProtectedRoute>
                <ComplaintPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p style={{ padding: '60px 0', textAlign: 'center' }}>Page not found. <Link to="/">Go home</Link></p>} />
        </Routes>
      </main>

      <footer className="site-foot wrap">
        {language === 'mr'
          ? 'जल सेन्स भारत सार्वजनिक शासकीय नोंदी दर्शवतो. हे पाणी पिण्यायोग्य असल्याचे प्रमाणपत्र देत नाही.'
          : language === 'hi'
          ? 'जल सेन्स इंडिया सार्वजनिक शासकीय डेटा प्रदर्शित करता है। यह किसी भी पानी को सुरक्षित प्रमाणित नहीं करता।'
          : 'Jal Sense India displays verified public records. It does not certify any water as safe and does not diagnose illness.'}
      </footer>
    </>
  );
}

export default function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </UIProvider>
  );
}