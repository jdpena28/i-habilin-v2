import Link from "next/link";
import Image from "next/image";
import React from "react";

const PublicNav = () => {
  return (
    <nav className="sticky top-0 z-50 flex w-full justify-between bg-tertiary px-5 py-5 drop-shadow-sm 2xl:px-24">
      <Image
        src="/i-habilin-logo.png"
        width={200.4}
        height={50.46}
        alt="I-Habilin logo"
      />
      <div className="hidden md:block">
        <Link className="nav-links" href="/#home">
          Home
        </Link>
        <Link className="nav-links" href="/#about">
          About
        </Link>
        <Link className="nav-links" href="/#feature">
          Feature
        </Link>
        <Link className="nav-links" href="/#register">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default PublicNav;
