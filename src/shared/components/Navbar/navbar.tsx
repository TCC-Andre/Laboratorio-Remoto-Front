import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const DivNavbar = styled.div`
  width: 100%;
  height: 80px;
  background: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
`;

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.white};
  font-size: 24px;
`;

export function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [pathname, setPath] = useState(window.location.pathname);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);

  const logout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <DivNavbar>
      <Logo>LabRemote</Logo>
      <div>
        {auth.isAuthenticated && (
          <Button
            onClick={() => navigate("/experimentos")}
            variant="text"
            sx={{ color: pathname === "/experimentos" ? "#ffbb18" : "white" }}
          >
            Experimentos
          </Button>
        )}
        {auth.user?.isAdmin && (
          <Button
            onClick={() => navigate("/gerenciar/alunos")}
            variant="text"
            sx={{
              color:
                pathname.slice(0, 10) === "/gerenciar" ? "#ffbb18" : "white",
            }}
          >
            Gerenciar
          </Button>
        )}
        {auth.isAuthenticated && (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 40, height: 40 }}></Avatar>
            </IconButton>
          </Tooltip>
        )}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <IoMdSettings size={30} />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <FiLogOut size={30} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </DivNavbar>
  );
}
