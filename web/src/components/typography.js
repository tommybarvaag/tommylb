import styled from "@emotion/styled";
import tw from "@tailwindcssinjs/macro";
import React from "react";

const TypographyStyled = styled.div(tw`
  relative
`);

const defaultVariantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p"
};

const Typography = React.forwardRef(function Typography(props, ref) {
  const {
    align = "inherit",
    classes,
    className,
    color = "initial",
    as,
    display = "initial",
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = "body1",
    variantMapping = defaultVariantMapping,
    ...other
  } = props;
  return (
    <TypographyStyled
      className={className}
      as={
        component ||
        (paragraph ? "p" : variantMapping[variant] || defaultVariantMapping[variant]) ||
        "span"
      }
      ref={ref}
      {...other}
    />
  );
});
