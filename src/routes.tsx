import { Backdrop, CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { Alunos } from "./pages/Alunos/alunos";
import { Experimento } from "./pages/Experimento/experimento";
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

export const AdminRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const auth = useContext(AuthContext);

  if (auth.loading) {
    return (
      <Backdrop open={true} sx={{ backgroundColor: "#153C7A" }}>
        <CircularProgress size={50} sx={{ color: "#fff" }} />
      </Backdrop>
    );
  }

  return auth.isAuthenticated && auth.user?.isAdmin ? (
    <RouteComponent />
  ) : (
    <Navigate to="/experimentos" />
  );
};

export default function AppRoutes() {
  const auth = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/experimentos"
          element={<PrivateRoute component={HomeLogada} />}
        />
        <Route
          path="/experimentos/:id"
          element={<PrivateRoute component={Experimento} />}
        />
        <Route
          path="/gerenciar/alunos"
          element={<AdminRoute component={Alunos} />}
        />
        <Route
          path="/gerenciar/turmas"
          element={<AdminRoute component={Turmas} />}
        />
        <Route
          path="/gerenciar/experimentos"
          element={<AdminRoute component={Experimentos} />}
        />
        <Route
          path="*"
          element={
            !auth.isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/experimentos" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
