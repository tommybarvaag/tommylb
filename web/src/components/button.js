import styled from "@emotion/styled";
import * as React from "react";
import { Flex } from "./flex";

const StyledButton = styled(Flex)`
  font-family: inherit;
  font-size: 100%;
  border: none;
  font-size: 1.6rem;
  line-height: 2.1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  user-select: none;

  ${props => props.borderRadius === "rounded" && `border-radius: 0.4rem;`}
`;

export default function Button({ children, borderRadius = "rounded", ...other }) {
  return (
    <StyledButton
      py={2}
      px={5}
      color="bg500"
      backgroundColor="text500"
      justifyContent="center"
      alignItems="center"
      borderRadius={borderRadius}
      {...other}
    >
      {children}
    </StyledButton>
  );
}
