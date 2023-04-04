import Link from "./link";

export default function Footer({ ...other }) {
  return (
    <footer className="border-t border-zinc-700 px-6 py-4 text-sm" {...other}>
      <div className="mx-auto flex max-w-xl items-center justify-between ">
        <Link href="/" underline={false}>
          Tommy Lunde Barvåg
        </Link>
        <div className="flex gap-2">
          <Link href="https://github.com/tommybarvaag" aria-label="View my code at GitHub">
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/tommybarvaag/"
            aria-label="View my profil at LinkedIn"
          >
            LinkedIn
          </Link>
          <Link href="mailto:tommy@barvaag.com" aria-label="Send me something at tommy@barvaag.com">
            Mail
          </Link>
        </div>
      </div>
    </footer>
  );
}
