import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

function AuthLayout({ children, title, subtitle, userType }) {
  return (
    <div className="auth-container">
      {/* Background decoration */}
      <div className="auth-bg-decoration top-right"></div>
      <div className="auth-bg-decoration bottom-left"></div>

      {/* Theme toggle */}
      <ThemeToggle />

      <div className="auth-wrapper">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <UtensilsCrossed size={28} color="white" />
            </div>
            <span className="logo-text">
              Zomato<span>Reel</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card">
          {/* User type badge */}
          <div className="user-badge">
            <span>{userType}</span>
          </div>

          {/* Title */}
          <div className="auth-header">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          {/* Form content */}
          {children}
        </div>

        {/* Footer links */}
        <div className="footer-link">
          {userType === 'User' ? (
            <p>
              Are you a restaurant?{' '}
              <Link to="/food-partner/login">Partner with us</Link>
            </p>
          ) : (
            <p>
              Looking to order food?{' '}
              <Link to="/user/login">Login as User</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
