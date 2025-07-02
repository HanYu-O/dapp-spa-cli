import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "@/routes/index";

const Routing = () => {
  const routing = useRoutes(routes);
  return <>{routing}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

// App.whyDidYouRender = true; // 开启 why-did-you-render 调试

export default App;
