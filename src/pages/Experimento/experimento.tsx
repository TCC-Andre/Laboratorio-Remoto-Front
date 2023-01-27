import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 200px;
  height: 100%;
  border: none;
  background: ${(props) => props.theme.colors.white};
  padding-top: 10px;
`;

export function Experimento() {
  const { id } = useParams();

  return (
    <Container>
      <div>{id}</div>
    </Container>
  );
}

export default Experimento;
