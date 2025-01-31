import "./index.css";

import AxiosProvider from "axios";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App";
import { API_URL } from "./services/HostingService";

AxiosProvider.defaults.baseURL = API_URL;

const linepro = ReactDOM.createRoot(
  document.getElementById("mukho") as HTMLElement
);

linepro.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
