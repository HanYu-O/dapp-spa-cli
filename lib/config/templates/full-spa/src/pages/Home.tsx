const HomePage = () => {
  const features = [
    {
      icon: "⚡",
      title: "一键创建",
      description: "快速生成完整的 SPA 项目结构",
    },
    {
      icon: "🔥",
      title: "现代技术栈",
      description: "React 19 + TypeScript + Webpack 5",
    },
    {
      icon: "📱",
      title: "开箱即用",
      description: "预配置开发服务器和生产构建",
    },
  ];

  return (
    <div className="home-container">
      <div className="home-wrapper">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-icon">
            <span className="hero-icon-text">D</span>
          </div>
          <h1 className="hero-title">SPA CLI</h1>
          <p className="hero-description">快速创建现代化单页应用的命令行工具</p>
          <div className="hero-command">
            <span className="hero-command-prompt">$</span> spa-cli create my-app
          </div>
        </div>

        {/* Features */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Start */}
        <div className="quickstart-section">
          <h2 className="quickstart-title">快速开始</h2>
          <div className="quickstart-grid">
            <div className="quickstart-step">
              <h3 className="quickstart-step-title">
                <span className="quickstart-step-number">1</span>
                安装 CLI
              </h3>
              <div className="quickstart-command">npm install -g spa-cli</div>
            </div>
            <div className="quickstart-step">
              <h3 className="quickstart-step-title">
                <span className="quickstart-step-number2">2</span>
                创建项目
              </h3>
              <div className="quickstart-command">
                spa-cli create my-project
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
