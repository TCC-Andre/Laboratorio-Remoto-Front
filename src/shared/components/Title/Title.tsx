import styled from "styled-components";

interface TitleProps {
  fontSize: number;
  fontWeight: number;
  marginBottom?: string;
  marginTop?: string;
}

const Title = styled.h1<TitleProps>`
  font-size: ${(props) => `${props.fontSize}px`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
`;

export default Title;
