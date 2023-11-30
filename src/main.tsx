import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/store";
import { ThemeProvider } from "@/context/theme-provider.tsx";
import App from "./App.tsx";

import "./index.css";
import "./assets/disney-font.ttf";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
