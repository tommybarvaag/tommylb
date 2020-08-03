import styled from "@emotion/styled";
import { compose, lineHeight, textAlign } from "styled-system";
import { Box } from "./box";

export const composedHelpers = compose(lineHeight, textAlign);

export const Typography = styled(Box)`
  ${composedHelpers}
  ${props => props.textTransform && `text-transform: ${props.textTransform}`};
`;

Typography.defaultProps = {
  as: "p",
  fontSize: 2,
  fontWeight: 1,
  color: "text500"
};
