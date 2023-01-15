/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineHome, AiOutlineAudit } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 200px;
  height: 100%;
  border: none;
  background: ${(props) => props.theme.colors.white};
`;

const SidebarItem = styled(Link)<{ isActive?: boolean }>`
  width: 200px;
  height: 60px;
  border: none;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px 0 0 5px;
  text-decoration: none;
  padding-left: ${(props) => props.isActive && "13px"};
  background: ${(props) =>
    props.isActive ? props.theme.colors.grey : props.theme.colors.white};
  color: ${(props) =>
    props.isActive ? props.theme.colors.primary : "#525252"};
  border-left: ${(props) =>
    props.isActive && "7px solid" + props.theme.colors.primary};
`;

const ItemText = styled.h1`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  padding-left: 10px;
`;

const Logo = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
`;

export function Sidebar() {
  const [pathname] = useState(window.location.pathname);

  const sidebarData = [
    {
      id: 1,
      name: "Visão geral",
      path: "/",
      icon: (
        <AiOutlineHome
          color={pathname === "/geral" ? "#153C7A" : "#525252"}
          size={22}
        />
      ),
    },
    {
      id: 2,
      name: "Alunas",
      path: "/alunas",
      icon: (
        <BiUser
          color={pathname === "/alunas" ? "#153C7A" : "#525252"}
          size={22}
        />
      ),
    },
    {
      id: 3,
      name: "Turmas",
      path: "/turmas",
      icon: (
        <AiOutlineAudit
          color={pathname === "/turmas" ? "#153C7A" : "#525252"}
          size={22}
        />
      ),
    },
    {
      id: 4,
      name: "Relatórios",
      path: "/relatorios",
      icon: (
        <HiOutlineDocumentReport
          color={pathname === "/relatorios" ? "#153C7A" : "#525252"}
          size={22}
        />
      ),
    },
  ];

  return (
    <Container>
      <Logo>AMIS</Logo>
      {sidebarData.map((itemData, index) => (
        <SidebarItem
          key={index}
          isActive={pathname === itemData.path}
          to={itemData.path}
        >
          {itemData.icon}
          <ItemText>{itemData.name}</ItemText>
        </SidebarItem>
      ))}
    </Container>
  );
}

export default Sidebar;
