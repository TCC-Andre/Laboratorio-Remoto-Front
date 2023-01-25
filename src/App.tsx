import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/theme";
import AppRoutes from "./routes";
import { Navbar } from "./shared/components/Navbar/navbar";
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
