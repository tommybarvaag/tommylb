import styled from "@emotion/styled";
import { Typography } from "./typography";

export const Heading = styled(Typography)`
  font-size: ${props => (props.as === "h1" ? "7.2rem" : props.as === "h2" ? "5.6rem" : "3.6rem")};
`;

Heading.defaultProps = {
  as: "h2",
  fontWeight: 0,
  color: "text500"
};
