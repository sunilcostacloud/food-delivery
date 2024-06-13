import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth0ProviderWithNavigate>
          <App />
          <ToastContainer />
        </Auth0ProviderWithNavigate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
