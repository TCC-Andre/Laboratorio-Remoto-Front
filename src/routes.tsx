import { Backdrop, CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { GerenciarAlunos } from "./pages/GerenciarAlunos/gerenciarAlunos";
import { Experimento } from "./pages/Experimento/experimento";
import { GerenciarExperimentos } from "./pages/GerenciarExperimentos/gerenciarExperimentos";
import { Home } from "./pages/Home/home";
import { HomeLogada } from "./pages/HomeLogada/homeLogada";
import { GerenciarTurmas } from "./pages/GerenciarTurmas/gerenciarTurmas";
import { Navbar } from "./shared/components/Navbar/navbar";
import { Dashboard } from "./pages/Experimento/Dashboard/dashboard";
import { Agendamento } from "./pages/Experimento/Agendamento/agendamento";
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
          path="/experimentos/:id/dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route
          path="/experimentos/:id/agendamento"
          element={<PrivateRoute component={Agendamento} />}
        />
        <Route
          path="/gerenciar/alunos"
          element={<AdminRoute component={GerenciarAlunos} />}
        />
        <Route
          path="/gerenciar/turmas"
          element={<AdminRoute component={GerenciarTurmas} />}
        />
        <Route
          path="/gerenciar/experimentos"
          element={<AdminRoute component={GerenciarExperimentos} />}
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
