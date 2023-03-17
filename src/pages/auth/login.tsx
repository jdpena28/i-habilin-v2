import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetAccountSchema, getAccountSchema } from "@/server/schema/public";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { InputForm } from "@/client/components/form";
import { HomeLayout } from "@/client/components/layout";
import Link from "next/link";

const Login = () => {
  const { push, query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GetAccountSchema>({
    resolver: zodResolver(getAccountSchema),
  });

  const onSubmit = async (value: GetAccountSchema) => {
    const auth = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false,
    });
    if (auth?.error) {
      push({
        pathname: `/auth/login`,
        query: { error: auth.error },
      });
    }
    if (auth?.ok) {
      push(`/application/dashboard`);
    }
  };

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
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              id="email"
              type="email"
              labelText="Email*"
              name="email"
              register={register}
              error={errors}
            />
            <InputForm
              id="password"
              type="password"
              labelText="Password*"
              name="Password"
              register={register}
              error={errors}
            />
            <p className="helper-text text-right font-medium !text-red-400">
              {query.error}
            </p>
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

export default Login;
