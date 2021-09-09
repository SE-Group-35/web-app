import "./App.css";
import Router from "./Router";
import ThemeConfig from "./theme";
import { HelmetProvider } from "react-helmet-async";

// components
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <HelmetProvider>
      <ThemeConfig>
        <ScrollToTop />
        <Router />
      </ThemeConfig>
    </HelmetProvider>
  );
}

export default App;
