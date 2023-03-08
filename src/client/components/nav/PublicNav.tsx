import Link from "next/link";
import React from "react";

const PublicNav = () => {
  return (
    <nav className="sticky top-0 z-50 flex w-full justify-between bg-tertiary px-5 pt-5 drop-shadow-sm 2xl:px-24">
      <div className="decorated-underline">
        <h3>I-Habilin</h3>
        <div />
      </div>
      <div className="hidden md:block">
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
