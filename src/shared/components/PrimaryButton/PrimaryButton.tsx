/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React from "react";
import styled from "styled-components";

interface ButtonProps {
  handleClick?: () => void;
  children: React.ReactNode;
  fontSize?: string;
  width?: string;
  height?: string;
  marginBottom?: string;
}

const Button = styled.button<ButtonProps>`
  font-size: 18px;
  font-weight: 400;
  width: auto;
  min-width: 150px;
  height: 50px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  margin-bottom: ${(props) => props.marginBottom};
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.primary};
  &:hover {
    background-color: #4362ab;
  }
`;

export function PrimaryButton({
  children,
  handleClick,
  height,
  width,
  fontSize,
}: ButtonProps) {
  return (
    <Button
      type="submit"
      onClick={handleClick}
      style={{ height, minWidth: width, fontSize }}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
