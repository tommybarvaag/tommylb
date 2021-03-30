import * as React from "react";
import { GitHub, LinkedIn, Mail } from "./icons";

export default function Footer({ ...other }) {
  return (
    <footer className="py-12 px-6" {...other}>
      <div className="flex justify-center items-center">
        <a
          className="p-2 mx-2"
          href="https://github.com/tommybarvaag"
          target="_blank"
          rel="noopener"
        >
          <GitHub />
        </a>
        <a
          className="p-2 mx-2"
          href="https://www.linkedin.com/in/tommybarvaag/"
          target="_blank"
          rel="noopener"
        >
          <LinkedIn />
        </a>
        <a className="p-2 mx-2" href="mailto:tommy@barvaag.com">
          <Mail />
        </a>
      </div>
    </footer>
  );
}
