import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  border: none;
  background: ${(props) => props.theme.colors.white};
`;

export function Dashboard() {
  const { id } = useParams();

  return (
    <Container>
      <iframe
        src="http://164.41.98.25:443/dashboard/c3a65c80-8c9c-11ed-9d4a-21d2142c9feb?publicId=ba042a80-0322-11ed-9f25-414fbaf2b065"
        width="100%"
        height="100%"
      ></iframe>
    </Container>
  );
}
