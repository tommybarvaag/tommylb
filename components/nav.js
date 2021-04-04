import { useTheme } from "next-themes";
import * as React from "react";
import { Moon, Sun } from "./icons";
import Terminal from "./icons/terminal";
import Link from "./link";
import Text from "./text";

export default function Nav({ ...other }) {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  React.useEffect(() => setMounted(true), []);

  return (
    <nav
      className="flex justify-between items-center max-w-4xl w-full px-8 py-4 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60"
      {...other}
    >
      <div>
        <Link className="block" href="/">
          <Text className="flex justify-start items-center !mb-0">
            <Terminal className="mr-3" /> Tommy Lunde Barvåg
          </Text>
        </Link>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          aria-label="Toggle color mode"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted ? theme === "light" ? <Moon /> : <Sun /> : null}
        </button>
      </div>
    </nav>
  );
}
