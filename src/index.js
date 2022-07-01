import { TypographyStylesProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { store } from "./store/configureStore";
import { Provider } from "react-redux";
import { NotificationsProvider } from "@mantine/notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TypographyStylesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <NotificationsProvider position='top-center' autoClose='true'>
          <App />
        </NotificationsProvider>
      </BrowserRouter>
    </Provider>
  </TypographyStylesProvider>
);
