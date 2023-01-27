import React, { useState } from "react";
import styled from "styled-components";
import {
  AiOutlineAudit,
  AiOutlineExperiment,
  AiOutlineHome,
} from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 200px;
  height: 100%;
  border: none;
  background: ${(props) => props.theme.colors.white};
  padding-top: 10px;
`;

const SidebarItem = styled(({ active, ...props }) => <Link {...props} />)`
  width: 200px;
  height: 60px;
  border: none;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px 0 0 5px;
  text-decoration: none;
  padding-left: ${(props) => props.active && "13px"};
  background: ${(props) =>
    props.active ? props.theme.colors.grey : props.theme.colors.white};
  color: ${(props) => (props.active ? props.theme.colors.primary : "#525252")};
  border-left: ${(props) =>
    props.active && "7px solid" + props.theme.colors.primary};
`;

const ItemText = styled.h1`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  padding-left: 10px;
`;

export function Sidebar() {
  const [pathname] = useState(window.location.pathname);

  const sidebarData = [
    {
      id: 1,
      name: "Alunos",
      path: "/gerenciar/alunos",
      icon: (
        <BiUser
          color={pathname === "/gerenciar/alunas" ? "#153C7A" : "#525252"}
          size={22}
        />
      ),
    },
    {
      id: 2,
      name: "Turmas",
      path: "/gerenciar/turmas",
      icon: (
        <AiOutlineAudit
          color={pathname === "/gerenciar/turmas" ? "#153C7A" : "#525252"}
          size={22}
        />
      ),
    },
    {
      id: 3,
      name: "Experimentos",
      path: "/gerenciar/experimentos",
      icon: (
        <AiOutlineExperiment
          color={pathname === "/gerenciar/experimentos" ? "#153C7A" : "#525252"}
          size={22}
        />
      ),
    },
  ];

  return (
    <Container>
      {sidebarData.map((itemData, index) => (
        <SidebarItem
          key={index}
          to={itemData.path}
          active={pathname === itemData.path}
        >
          {itemData.icon}
          <ItemText>{itemData.name}</ItemText>
        </SidebarItem>
      ))}
    </Container>
  );
}

export default Sidebar;
