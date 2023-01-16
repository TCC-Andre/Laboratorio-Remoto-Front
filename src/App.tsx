import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/theme";
import AppRoutes from "./routes";
import { Navbar } from "./shared/components/Navbar/navbar";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <Navbar />
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
