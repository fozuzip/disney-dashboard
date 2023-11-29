import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import "./assets/disney-font.ttf";

import { store } from "@/store/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "./components/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
