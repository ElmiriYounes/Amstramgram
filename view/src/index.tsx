import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./globalStyles";
import { CookiesProvider } from "react-cookie";
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <GlobalStyle />
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </>
);

serviceWorkerRegistration.register();
reportWebVitals();