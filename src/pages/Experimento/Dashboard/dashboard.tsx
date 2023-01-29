import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Grid, Paper } from "@mui/material";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  background: ${(props) => props.theme.colors.white};
  padding: 5%;
`;

export function Dashboard() {
  const { id } = useParams();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={12}>Dashboard do experimento {id}</Grid>
      </Grid>
    </Container>
  );
}
