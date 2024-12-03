import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <MantineProvider
    theme={{
      colors: {
        blueLigth: Array(10).fill("#6b8afd"),
      },
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    <Provider store={store}>
      <App />
    </Provider>
  </MantineProvider>
  // </StrictMode>
);
