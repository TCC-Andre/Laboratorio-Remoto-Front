import React from "react";
import { Navbar } from "../../shared/components/Navbar/navbar";
import styled from "styled-components";
import PrimaryButton from "../../shared/components/PrimaryButton/PrimaryButton";
import Text from "../../shared/components/Text/Text";
import Title from "../../shared/components/Title/Title";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2% 4%;
  gap: 2%;
`;

const DivContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  padding-top: 50px;
`;

export function Home() {
  return (
    <div>
      <Container>
        <DivContent>
          <Title fontSize={28} fontWeight={400}>
            Projeto de Laboratórios Remotos
          </Title>
          <Text fontSize={18} fontWeight={400}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here, content
            here, making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for lorem ipsum will uncover many web sites
            still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </Text>
        </DivContent>
        <DivContent>
          <h1>Olá</h1>
        </DivContent>
      </Container>
    </div>
  );
}
