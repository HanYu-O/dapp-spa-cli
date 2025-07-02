import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>{{ PROJECT_NAME }}</h1>
        <p>欢迎使用 SPA CLI 创建的项目！</p>
      </header>

      <main className="app-main">
        <div className="counter-section">
          <p>计数器: {count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="counter-button"
          >
            点击 +1
          </button>
          <button onClick={() => setCount(0)} className="reset-button">
            重置
          </button>
        </div>

        <div className="info-section">
          <h2>快速开始</h2>
          <ul>
            <li>
              运行 <code>npm run dev</code> 启动开发服务器
            </li>
            <li>
              运行 <code>npm run build</code> 构建生产版本
            </li>
            <li>
              编辑 <code>src/App.tsx</code> 开始开发
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
