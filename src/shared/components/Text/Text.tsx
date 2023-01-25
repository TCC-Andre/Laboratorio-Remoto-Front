import styled from "styled-components";

interface TextProps {
  fontSize: number;
  fontWeight: number;
  color?: string;
  marginTop?: string;
}

const Text = styled.h1<TextProps>`
  font-size: ${(props) => `${props.fontSize}px`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => (props.color ? props.color : props.theme.colors.black)};
  margin-top: ${(props) => props.marginTop};
`;

export default Text;
