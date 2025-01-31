import "./index.css";

import AxiosProvider from "axios";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App";
import { BaseURL } from "./services/HostingService";

AxiosProvider.defaults.baseURL = `http://${BaseURL}/api/v2`; // `https://${BaseURL}/api/v2`;

const linepro = ReactDOM.createRoot(
  document.getElementById("mukho") as HTMLElement
);

linepro.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
