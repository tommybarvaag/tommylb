import styled from "@emotion/styled";
import { compose, flexbox } from "styled-system";
import { Box } from "./box";

const composedHelpers = compose(flexbox);

export const Flex = styled(Box)`
  display: flex;

  ${composedHelpers}
`;

Flex.defaultProps = {};
