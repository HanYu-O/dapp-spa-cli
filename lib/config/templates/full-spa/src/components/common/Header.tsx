import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // 提取导航信息
  const navItems = [
    { path: "/", label: "首页" },
    { path: "/about", label: "关于" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo-icon">
              <span className="logo-text">D</span>
            </div>
            <span className="brand-text">SPA CLI</span>
          </div>

          {/* Navigation */}
          <nav className="nav-container">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${
                  isActive(item.path) ? "nav-link-active" : ""
                }`}
              >
                {item.label}
                {isActive(item.path) && <span className="nav-indicator"></span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
