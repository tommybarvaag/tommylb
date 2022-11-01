import Terminal from "./icons/terminal";
import Link from "./link";
import Text from "./text";

export default function Nav({ ...other }) {
  return (
    <nav
      className="my-0 mx-auto flex w-full max-w-4xl items-center justify-between bg-black bg-opacity-60 px-8 py-4 md:my-8"
      {...other}
    >
      <div>
        <Link className="block" href="/">
          <Text className="flex items-center justify-start" noMargin>
            <Terminal className="mr-3" />
          </Text>
        </Link>
      </div>
    </nav>
  );
}
