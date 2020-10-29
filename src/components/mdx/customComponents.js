import Image from "next/image";
import * as React from "react";

const customComponents = {
  img: props => <Image unsized {...props} />
};

export default customComponents;
