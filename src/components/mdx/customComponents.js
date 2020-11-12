import Image from "next/image";
import * as React from "react";
import { Container, useThemeUI } from "theme-ui";

const customComponents = {
  img: props => {
    const {
      theme: { sizes }
    } = useThemeUI();

    const imageWidth = sizes?.container ?? 700;
    const imageHeight = imageWidth / (4 / 3);

    return (
      <Container>
        <Image width={imageWidth} height={imageHeight} layout="responsive" {...props} />
      </Container>
    );
  }
};

export default customComponents;
