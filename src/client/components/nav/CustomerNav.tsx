import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

import { useCustomerOrderStore } from "@/client/store";

import { HiMenu, HiShoppingCart } from "react-icons/hi";
import { MdFoodBank, MdTableBar } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const CustomerNav = () => {
  const { customerOrder, updateCustomerOrder } = useCustomerOrderStore();
  const { pathname } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-primary px-2">
        <div className="flex items-center gap-x-2">
          {isMenuOpen ? (
            <IoCloseSharp
              className="cursor-pointer fill-white"
              size={24}
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <HiMenu
              className="cursor-pointer fill-white"
              size={24}
              onClick={() => setIsMenuOpen(true)}
            />
          )}
          <Image
            src="/i-habilin-logo.svg"
            alt="I-Habilin Logo"
            height={124 * 0.5}
            width={198 * 0.5}
          />
        </div>
        <div>
          <HiShoppingCart className="fill-white" size={24} />
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed left-0 z-30 h-screen w-2/5  bg-primary pt-16">
          <Links href="/stalls" text="Stalls" pathname={pathname}>
            <MdFoodBank className="fill-white" size={24} />
          </Links>
          <div
            className="flex items-center gap-2 border-l-[3px] !border-transparent px-4 py-3 text-white"
            aria-hidden
            onClick={() => {
              if (pathname === "/stalls") {
                updateCustomerOrder({
                  ...customerOrder,
                  isTableModalOpen: true,
                });
              } else {
                toast.error("Please go to stalls first", {
                  id: "table-number",
                  duration: 3000,
                });
                setTimeout(() => {
                  toast.remove("table-number");
                }, 3000);
              }
            }}>
            <MdTableBar className="fill-white" size={24} />
            <span className="font-poppins text-sm font-medium tracking-wider">
              Table Number
            </span>
          </div>
        </div>
      )}
    </>
  );
};

const Links = ({
  href,
  children,
  text,
  pathname,
}: {
  href: string;
  text: string;
  children: ReactNode;
  pathname: string;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 border-l-[3px] border-transparent px-4 py-3 text-white ${
        pathname.split("/")[1] === "stalls" ? "border-white" : null
      }`}>
      {children}
      <span className="font-poppins text-sm font-medium tracking-wider">
        {" "}
        {text}{" "}
      </span>
    </Link>
  );
};

export default CustomerNav;
