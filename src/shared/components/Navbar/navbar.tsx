import React, { useState } from "react";
import styled from "styled-components";
import { BiUser } from "react-icons/bi";

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

const AvatarUser = styled.span`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Navbar() {
  return (
    <DivNavbar>
      <Logo>LabRemote</Logo>
      <AvatarUser>
        <BiUser color={"#525252"} size={25} />
      </AvatarUser>
    </DivNavbar>
  );
}
