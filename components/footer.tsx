import Link from "./link";

export default function Footer({ ...other }) {
  return (
    <footer className="py-4 px-6 border-zinc-700 border-t text-sm" {...other}>
      <div className="flex justify-between items-center max-w-xl mx-auto">
        <div>Tommy Lunde Barvåg</div>
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
