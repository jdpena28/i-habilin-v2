import Link from "next/link";
import Image from "next/image";

const PublicFooter = () => {
  return (
    <footer aria-label="Site Footer" className="bg-gray-100">
      <div className="relative mx-auto px-5 py-16 lg:pt-24 2xl:px-24">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
          <Link
            className="inline-block rounded-full bg-primary/80 p-2 text-white shadow transition hover:bg-primary/100 sm:p-3 lg:p-4"
            href="/#home">
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <Image
              className="mx-auto lg:mx-0"
              src="/i-habilin-logo.png"
              width={200.4}
              height={50.46}
              alt="I-Habilin logo"
            />
            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
              A revolutionize ordering system. An innovative solution that
              transforms the traditional way of ordering in food stalls.
            </p>
          </div>

          <nav aria-label="Footer Nav" className="mt-12 lg:mt-0">
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12">
              <Link href="/#home" className="footer-links">
                Home
              </Link>

              <Link href="/#about" className="footer-links">
                About
              </Link>

              <Link href="/#features" className="footer-links">
                Features
              </Link>

              <Link href="/#register" className="footer-links">
                Register
              </Link>
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; 2023. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default PublicFooter;
