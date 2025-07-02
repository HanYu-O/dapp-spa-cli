const AboutPage = () => {
  const techStack = [
    { name: "React", version: "19.x", purpose: "用户界面库", color: "blue" },
    {
      name: "TypeScript",
      version: "5.7.x",
      purpose: "类型安全",
      color: "indigo",
    },
    {
      name: "Webpack",
      version: "5.99.x",
      purpose: "模块打包",
      color: "purple",
    },
    { name: "SWC", version: "1.12.x", purpose: "快速编译", color: "green" },
  ];

  const highlights = [
    { icon: "🚀", text: "快速构建", desc: "SWC 编译器提升构建速度" },
    { icon: "🔥", text: "热更新", desc: "开发时实时刷新页面" },
    { icon: "📦", text: "生产优化", desc: "自动压缩和资源优化" },
    { icon: "📱", text: "响应式", desc: "完美适配各种设备" },
  ];

  return (
    <div className="about-container">
      <div className="about-wrapper">
        {/* Header */}
        <div className="about-header">
          <h1 className="about-title">关于 SPA CLI</h1>
          <p className="about-description">专为现代前端开发设计的脚手架工具</p>
        </div>

        <div className="about-content-grid">
          {/* Tech Stack */}
          <div className="tech-stack-card">
            <h2 className="card-title">技术栈</h2>
            <div className="tech-stack-list">
              {techStack.map((tech, index) => (
                <div key={index} className="tech-item">
                  <div className="tech-item-left">
                    <div className={`tech-dot tech-dot-${tech.color}`}></div>
                    <div>
                      <div className="tech-name">{tech.name}</div>
                      <div className="tech-purpose">{tech.purpose}</div>
                    </div>
                  </div>
                  <div className="tech-version">{tech.version}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="features-card">
            <h2 className="card-title">核心特性</h2>
            <div className="highlights-list">
              {highlights.map((feature, index) => (
                <div key={index} className="highlight-item">
                  <div className="highlight-icon">{feature.icon}</div>
                  <div>
                    <div className="highlight-text">{feature.text}</div>
                    <div className="highlight-desc">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="project-info-card">
          <h2 className="project-info-title">项目信息</h2>
          <div className="project-info-grid">
            <div className="info-item">
              <div className="info-icon info-icon-blue">
                <span className="info-icon-text">💡</span>
              </div>
              <h3 className="info-title">设计理念</h3>
              <p className="info-desc">遵循最佳实践，提供开箱即用的开发体验</p>
            </div>
            <div className="info-item">
              <div className="info-icon info-icon-purple">
                <span className="info-icon-text">🎯</span>
              </div>
              <h3 className="info-title">适用场景</h3>
              <p className="info-desc">快速原型、中小型项目、技术学习</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
