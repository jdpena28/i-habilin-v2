import { InputForm } from "@/client/components/form";
import { HomeLayout } from "@/client/components/layout";
import Link from "next/link";

const login = () => {
  return (
    <HomeLayout>
      <section
        id="login"
        className="mx-auto  mt-20 flex h-[70vh]  max-w-5xl flex-col drop-shadow-lg md:flex-row">
        <div className="h-full w-full bg-gradient-radial from-primary  via-secondary/70 to-secondary p-5 md:p-14">
          <div className="flex h-full flex-col justify-center gap-y-5 bg-white/30 p-14 backdrop-blur-sm">
            <p className="heading text-3xl">A revolutionize ordering system.</p>
            <p className="font-neuemachina">
              This site intended for Super Admin of I - Habilin
            </p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col flex-wrap justify-center gap-y-5 bg-white p-5 md:p-14">
          <div className="decorated-underline">
            <h3>I-Habilin</h3>
            <div />
          </div>
          <p className="font-brocha text-2xl">Hey, hello 👋</p>
          <p className="helper-text text-2xl">
            We&apos;ll never share your email with anyone else.
          </p>
          <form className="space-y-5">
            <InputForm
              id="email"
              type="text"
              labelText="Email"
              name="email"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
            <InputForm
              id="password"
              type="password"
              labelText="Password"
              name="Password"
            />
            <Link className="text-right underline underline-offset-2" href="/">
              <p className="mt-5">Forgot Password?</p>
            </Link>
            <button className="w-full bg-primary" type="submit">
              Login
            </button>
          </form>
        </div>
      </section>
    </HomeLayout>
  );
};

export default login;
