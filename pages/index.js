import Head from "next/head";
import React from "react";
import Nav from "../components/nav";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hi, I'm Tommy Lunde Barvåg 👋</title>
      </Head>
      <Nav />
      <div className="hero">
        <h1 className="title">Hi, I'm Tommy Lunde Barvåg 👋</h1>
        <p className="description">I’m a full stack developer. I’ve spent the last six years creating web solutions for great companies.</p>
      </div>
      <div className="contact-info"></div>
      <style jsx>{`
        :global(:root) {
          font-size: 62.5%;
        }

        :global(body) {
          margin: 0;
          font: 400 1.6rem / 1.6 Arial, Helvetica, sans-serif;
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
      `}</style>
    </div>
  );
}
