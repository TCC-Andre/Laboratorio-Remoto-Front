import styled from "styled-components";

interface TextProps {
  fontSize: number;
  fontWeight: number;
}

const Text = styled.h1<TextProps>`
  font-size: ${(props) => `${props.fontSize}px`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.theme.colors.black};
`;

export default Text;
