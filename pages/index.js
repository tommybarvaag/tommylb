import Head from "next/head";
import React from "react";
import { CSSTransition } from "react-transition-group";
import ContactForm from "../components/contactForm";
import Footer from "../components/footer";
import Nav from "../components/nav";

export default function Home() {
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(() => {
    setShowButton(true);
  });

  return (
    <div>
      <Head>
        <title>Hi, I'm Tommy Lunde Barvåg 👋</title>
      </Head>
      <Nav />
      <CSSTransition in={showButton} timeout={300} classNames="fade" unmountOnExit onEnter={() => setShowButton(false)} onExited={() => setShowButton(true)}>
        <main>
          <div className="hero">
            <h1 className="title">Hi, I'm Tommy Lunde Barvåg 👋</h1>
            <p className="description">I’m a full stack developer. I’ve spent the last six years creating web solutions for great companies.</p>
          </div>

          <ContactForm />
        </main>
      </CSSTransition>
      <Footer />
      <style jsx>{`
        :global(:root) {
          font-size: 62.5%;
        }

        :global(body) {
          margin: 0;
          font: 400 1.6rem / 1.6 Arial, Helvetica, sans-serif;
        }

        .fade-enter {
          opacity: 0;
          transform: scale(0.9);
        }
        .fade-enter-active {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 300ms, transform 300ms;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 300ms, transform 300ms;
        }

        .hero {
          width: 100%;
          max-width: 78.4rem;
          margin: 0 auto;
        }

        .title,
        .description {
          text-align: center;
        }

        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          font-size: 4.8rem;
        }

        .description {
          font-size: 2.8rem;
          color: rgb(78, 78, 80);
        }

        @keyframes slide-up {
          from {
            transform: translateY(0);
            opacity: 0;
          }
          to {
            transform: translateY(-200px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
