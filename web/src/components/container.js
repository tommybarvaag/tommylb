import styled from "@emotion/styled";
import tw from "@tailwindcssinjs/macro";
import React from "react";

const StyledContainer = styled.div`
    ${props => props.maxWidth === "xs" && tw`max-w-xs mx-auto`}
    ${props => props.maxWidth === "sm" && tw`max-w-sm mx-auto`}
    ${props => props.maxWidth === "md" && tw`max-w-md mx-auto`}
    ${props => props.maxWidth === "lg" && tw`max-w-lg mx-auto`}
    ${props => props.maxWidth === "xl" && tw`max-w-xl mx-auto`}
    ${props => props.maxWidth === "2xl" && tw`max-w-2xl mx-auto`}
    ${props => props.maxWidth === "3xl" && tw`max-w-3xl mx-auto`}
    ${props => props.maxWidth === "4xl" && tw`max-w-4xl mx-auto`}
    ${props => props.maxWidth === "5xl" && tw`max-w-5xl mx-auto`}
    ${props => props.maxWidth === "6xl" && tw`max-w-6xl mx-auto`}
    ${props => props.maxWidth === "auto" && tw`container mx-auto`}
    ${props => props.maxWidth === "none" && tw`max-w-none`}
`;

export default function Container(props) {
  const { children, as = "div", maxWidth = "auto", ...other } = props;

  return (
    <StyledContainer as={as} maxWidth={maxWidth} {...other}>
      {children}
    </StyledContainer>
  );
}
