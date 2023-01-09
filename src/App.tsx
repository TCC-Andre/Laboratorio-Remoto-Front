import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/theme";
import AppRoutes from "./routes";
import { Navbar } from "./shared/components/Navbar/navbar";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Navbar />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
