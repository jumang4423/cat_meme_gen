import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Projects from "./pages/projects/Index.tsx";
import Slash from "./pages/Index.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import Project from "./pages/project/Index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Slash />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/project/:id",
    element: <Project />,
  },
]);

const theme = createTheme({
  shadows: ["none"],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      maxWidth: "600px",
      margin: "0 auto",
    }}
  >
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  </div>
);
