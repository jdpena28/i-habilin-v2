import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";

import { InputForm } from "@/client/components/form";
import { HomeLayout } from "@/client/components/layout";

import { ssgHelper } from "@/server/utils/ssgHelper";
import { trpc } from "@/server/utils/trpc";
import { GetAccountSchema, getAccountSchema } from "@/server/schema/public";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ stall: string }>
) {
  await ssgHelper.public.getRegistrant.prefetch({
    slug: context.params?.stall,
  });

  return {
    props: {
      trpc: ssgHelper.dehydrate(),
      slug: context.params?.stall,
    },
  };
}

const Login = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { slug } = props;
  const { push, query } = useRouter();
  const { data, status } = trpc.public.getRegistrant.useQuery({ slug });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GetAccountSchema>({
    resolver: yupResolver(getAccountSchema),
  });

  const onSubmit = async (value: GetAccountSchema) => {
    const auth = await signIn("credentials", {
      email: value.email,
      password: value.password,
      loginFrom: slug,
      redirect: false,
    });
    if (auth?.error) {
      push({
        pathname: `/${slug}/auth/login`,
        query: { error: auth.error },
      });
    }
    if (auth?.ok) {
      push(`/${slug}/application/dashboard/`);
    }
  };
  if (!data && status === "success") {
    push("/404");
  }

  return (
    data && (
      <HomeLayout>
        <section
          id="login"
          className="mx-auto  mt-20 flex h-[70vh]  max-w-5xl flex-col drop-shadow-lg md:flex-row">
          <div className="h-full w-full bg-gradient-radial from-primary  via-secondary/70 to-secondary p-5 md:p-14">
            <div className="flex h-full flex-col justify-center gap-y-5 bg-white/30 p-14 backdrop-blur-sm">
              <p className="heading text-3xl">
                A revolutionize ordering system.
              </p>
              <p className="font-neuemachina">
                This site intended for{" "}
                <strong className="font-bold">{data?.name}</strong> to manage
                their orders and customers.
              </p>
            </div>
          </div>
          <div className="flex h-full w-full flex-col flex-wrap justify-center gap-y-5 bg-white p-5 md:px-14">
            <Image
              src={data?.logo?.cdnUrl}
              alt={data.name}
              height={150}
              width={150}
            />
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
              <Link
                className="text-right underline underline-offset-2"
                href="/">
                <p className="mt-5">Forgot Password?</p>
              </Link>
              <button className="w-full bg-primary" type="submit">
                Login
              </button>
            </form>
          </div>
        </section>
      </HomeLayout>
    )
  );
};

export default Login;