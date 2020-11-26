import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import store from "./store";
import { Provider } from "react-redux";

import "@shopify/polaris/dist/styles.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <AppProvider i18n={enTranslations}>
      <App />
    </AppProvider>
  </Provider>,
  document.getElementById("root")
);
