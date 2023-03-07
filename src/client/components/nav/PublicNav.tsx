import Link from "next/link";
import React from "react";

const PublicNav = () => {
  return (
    <nav className="sticky top-0 flex w-full justify-between px-24 pt-5">
      <div className="decorated-underline">
        <h3>I-Habilin</h3>
        <div />
      </div>
      <div>
        <Link className="nav-links" href="/">
          Home
        </Link>
        <Link className="nav-links" href="/">
          About
        </Link>
        <Link className="nav-links" href="/">
          Feature
        </Link>
        <Link className="nav-links" href="/">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default PublicNav;
