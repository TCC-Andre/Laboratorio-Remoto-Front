import { Backdrop, CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { Alunos } from "./pages/alunos/alunos";
import { Home } from "./pages/home/home";

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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/alunas" element={<PrivateRoute component={Alunos} />} />
      </Routes>
    </Router>
  );
}
