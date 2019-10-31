import Link from "next/link";
import React from "react";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Tommy Lunde Barvåg</a>
        </Link>
      </li>
    </ul>

    <style jsx>{`
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        text-decoration: none;
        font-size: 1.6rem;
      }
    `}</style>
  </nav>
);

export default Nav;
