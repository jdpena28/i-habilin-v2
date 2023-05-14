import { useState, FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
  UpdatePasswordSchema,
} from "@/server/schema/public";
import { useRouter } from "next/router";
import Image from "next/image";
import { NextPage } from "next";
import { toast } from "react-hot-toast";

import { trpc } from "@/server/utils/trpc";

import { InputForm } from "@/client/components/form";
import { HomeLayout } from "@/client/components/layout";
import { SubmitButton } from "@/client/components/buttons";
import ModalTemplate from "@/client/components/modal/ModalTemplate";

const ForgotPassword: FC<NextPage> = () => {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [isEmailNotifModalOpen, setIsEmailNotifModalOpen] = useState(false);
  const { push, query } = useRouter();
  const { mutate } = trpc.public.forgotPasswordEmail.useMutation({
    onSuccess: () => {
      setSubmitIsLoading(false);
      setIsEmailNotifModalOpen(true);
    },
    onError: (error) => {
      setSubmitIsLoading(false);
      toast.error(error.message);
    },
  });
  const { mutate: updatePassword } = trpc.public.updatePassword.useMutation({
    onSuccess: () => {
      setSubmitIsLoading(false);
      toast.success("Password updated successfully");
      setTimeout(() => {
        push("/auth/login");
      }, 1000);
    },
    onError: (error) => {
      setSubmitIsLoading(false);
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const {
    register: updatePasswordRegister,
    handleSubmit: updatePasswordHandleSubmit,
    formState: { errors: updatePasswordErrors },
  } = useForm<UpdatePasswordSchema>({
    resolver: yupResolver(updatePasswordSchema),
  });

  const onSubmit = (value: ForgotPasswordSchema) => {
    setSubmitIsLoading(true);
    mutate({
      email: value.email,
      pageFrom: "Super Admin",
    });
  };

  const onSubmitUpdatePassword = (value: UpdatePasswordSchema) => {
    setSubmitIsLoading(true);
    updatePassword({
      id: query?.token as string,
      ...value,
    });
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
          <Image
            src="/i-habilin-logo.png"
            width={200.4}
            height={50.46}
            alt="I-Habilin logo"
          />
          <p className="font-brocha text-2xl">Forgot password?</p>
          {!query?.token ? (
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <InputForm
                id="email"
                type="email"
                labelText="Email*"
                name="email"
                register={register}
                error={errors}
                helperText="The instruction will be sent to your email"
              />
              <SubmitButton className="!w-full" isLoading={submitIsLoading} />
            </form>
          ) : (
            <form
              className="space-y-3"
              onSubmit={updatePasswordHandleSubmit(onSubmitUpdatePassword)}>
              <InputForm
                id="password"
                type="password"
                labelText="Password*"
                name="password"
                register={updatePasswordRegister}
                error={updatePasswordErrors}
              />
              <InputForm
                id="confirmPassword"
                type="password"
                labelText="Confirm Password*"
                name="confirmPassword"
                register={updatePasswordRegister}
                error={updatePasswordErrors}
              />
              <SubmitButton className="!w-full" isLoading={submitIsLoading} />
            </form>
          )}
        </div>
      </section>
      <ModalTemplate
        title="Forgot Password"
        isOpenModal={isEmailNotifModalOpen}
        setIsOpenModal={setIsEmailNotifModalOpen}
        bodyClassName="max-w-lg">
        <p>
          Please check your email for the instruction to reset your password.
        </p>
        <div className="flex flex-row-reverse">
          <button
            className="bg-primary text-white"
            type="button"
            onClick={() => {
              setIsEmailNotifModalOpen(false);
              push("/auth/login");
            }}>
            Okey
          </button>
        </div>
      </ModalTemplate>
    </HomeLayout>
  );
};

export default ForgotPassword;
