import React, { useState } from "react";
import { Sprout, Menu, X, Tractor, Store, Info, User, ArrowRight } from "lucide-react";

export default function Navbar({ activePage, setActivePage, produceCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: null },
    { id: "farmer", label: "Farmer Portal", icon: Tractor },
    { id: "retailer", label: "Retailer Portal", icon: Store, badge: produceCount },
    { id: "project-info", label: "Project Info", icon: Info },
    { id: "developer", label: "About Developer", icon: User },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Brand Logo */}
        <div className="logo-brand" onClick={() => handleNavClick("home")}>
          <div className="logo-icon-box">
            <Sprout className="logo-icon" size={22} />
          </div>
          <div className="logo-text-group">
            <span className="brand-name">ULAVU</span>
            <span className="brand-subtext">Direct Farm Link</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {Icon && <Icon size={16} className="nav-icon" />}
                <span>{item.label}</span>
                {item.badge > 0 && <span className="nav-count-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        {/* Header Right CTAs */}
        <div className="header-actions">
          <button
            onClick={() => handleNavClick("farmer")}
            className="btn btn-primary btn-sm"
          >
            <Tractor size={15} />
            <span>Post Produce</span>
          </button>

          <button
            onClick={() => handleNavClick("retailer")}
            className="btn btn-secondary btn-sm"
          >
            <Store size={15} />
            <span>Find Produce</span>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`mobile-nav-link ${isActive ? "active" : ""}`}
                >
                  <div className="mobile-link-left">
                    {Icon && <Icon size={18} />}
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && <span className="nav-count-badge">{item.badge}</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: rgba(250, 247, 242, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-medium);
        }
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }
        .logo-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }
        .logo-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-500) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(27, 67, 50, 0.2);
        }
        .logo-text-group {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--color-primary-900);
          line-height: 1;
        }
        .brand-subtext {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent-600);
          margin-top: 2px;
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .nav-link {
          background: transparent;
          border: none;
          padding: 0.55rem 0.95rem;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.92rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: all var(--transition-fast);
        }
        .nav-link:hover {
          color: var(--color-primary-800);
          background-color: var(--color-primary-50);
        }
        .nav-link.active {
          color: var(--color-primary-800);
          background-color: var(--color-primary-100);
          font-weight: 600;
        }
        .nav-count-badge {
          background: var(--color-accent-600);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          padding: 0.1rem 0.45rem;
          line-height: 1;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-main);
          cursor: pointer;
          padding: 0.4rem;
        }
        .mobile-nav-drawer {
          display: none;
        }

        @media (max-width: 960px) {
          .desktop-nav, .header-actions .btn {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
          .mobile-nav-drawer {
            display: block;
            background: var(--bg-surface);
            border-bottom: 1px solid var(--border-medium);
            box-shadow: var(--shadow-md);
            padding: 1rem 1.5rem 1.5rem;
          }
          .mobile-nav-inner {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          }
          .mobile-nav-link {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.8rem 1rem;
            border-radius: var(--radius-md);
            background: transparent;
            border: none;
            color: var(--text-main);
            font-size: 0.95rem;
            font-weight: 500;
            text-align: left;
            cursor: pointer;
          }
          .mobile-link-left {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          .mobile-nav-link.active {
            background-color: var(--color-primary-50);
            color: var(--color-primary-700);
            font-weight: 600;
          }
        }
      `}</style>
    </header>
  );
}
