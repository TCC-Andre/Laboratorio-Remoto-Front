import { Backdrop, CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { Alunos } from "./pages/Alunos/alunos";
import { Experimentos } from "./pages/Experimentos/experimentos";
import { Home } from "./pages/Home/home";
import { HomeLogada } from "./pages/HomeLogada/homeLogada";
import { Turmas } from "./pages/Turmas/turmas";
import { Navbar } from "./shared/components/Navbar/navbar";

interface Props {
  component: React.ComponentType;
  path?: string;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const auth = useContext(AuthContext);

  if (auth.loading) {
    return (
      <Backdrop open={true} sx={{ backgroundColor: "#153C7A" }}>
        <CircularProgress size={50} sx={{ color: "#fff" }} />
      </Backdrop>
    );
  }

  return auth.isAuthenticated ? <RouteComponent /> : <Navigate to="/" />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route
          path="/inicio"
          element={<PrivateRoute component={HomeLogada} />}
        />
      </Routes>
      <Routes>
        <Route path="/alunos" element={<PrivateRoute component={Alunos} />} />
      </Routes>
      <Routes>
        <Route path="/turmas" element={<PrivateRoute component={Turmas} />} />
      </Routes>
      <Routes>
        <Route
          path="/Experimentos"
          element={<PrivateRoute component={Experimentos} />}
        />
      </Routes>
    </Router>
  );
}
