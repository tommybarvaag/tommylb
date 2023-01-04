export default function Footer({ ...other }) {
  return (
    <footer className="py-4 px-6 border-gray-600 border-t text-base" {...other}>
      <div className="flex justify-between items-center max-w-xl mx-auto">
        <div>Tommy Lunde Barvåg</div>
        <div className="flex gap-2">
          <a
            href="https://github.com/tommybarvaag"
            target="_blank"
            rel="noreferrer"
            aria-label="View my code at GitHub"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/tommybarvaag/"
            target="_blank"
            rel="noreferrer"
            aria-label="View my profil at LinkedIn"
          >
            LinkedIn
          </a>
          <a href="mailto:tommy@barvaag.com" aria-label="Send me something at tommy@barvaag.com">
            Mail
          </a>
        </div>
      </div>
    </footer>
  );
}
