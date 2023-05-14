import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { animateVariants } from "@/client/constant";

import { HiMenu } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

const PublicNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center gap-x-3 bg-tertiary px-5 py-5 drop-shadow-sm md:justify-between 2xl:px-24">
      <HiMenu
        className="block cursor-pointer fill-primary md:hidden"
        size={24}
        onClick={() => setIsMenuOpen(true)}
      />
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={animateVariants}
            initial="mobileHidden"
            animate="mobileVisible"
            exit="mobileExit"
            className="fixed top-0 left-0 z-30 block h-screen  w-2/5 bg-primary md:hidden">
            <IoCloseSharp
              className="m-6 ml-3 mt-8 fill-white"
              size={24}
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="flex flex-col md:hidden">
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default PublicNav;
