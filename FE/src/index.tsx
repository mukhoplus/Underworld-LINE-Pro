import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import AxiosProvider from "axios";
import { BaseURL } from "./services/HostingService";

import App from "./App";
import "./index.css";

AxiosProvider.defaults.baseURL = `http://${BaseURL}/api/v2`; // `https://${BaseURL}/api/v2`;

const linepro = ReactDOM.createRoot(
  document.getElementById("mukho") as HTMLElement
);

linepro.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
