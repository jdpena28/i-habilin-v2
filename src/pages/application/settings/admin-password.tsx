/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/server/utils/trpc";
import toast from "react-hot-toast";
import {
  createSuperAdminPassword,
  CreateSuperAdminPassword,
} from "@/server/schema/public";

import { ApplicationHeader } from "@/client/components/header";
import { AppLayout } from "@/client/components/layout";
import { InputForm } from "@/client/components/form";

const AdminPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSuperAdminPassword>({
    resolver: zodResolver(createSuperAdminPassword),
  });

  const { mutate } =
    trpc.application.settings.createSuperAdminPassword.useMutation({
      onSuccess: () => {
        toast.success("Password changed successfully");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const onSubmitSuperAdminPassword = (values: CreateSuperAdminPassword) => {
    mutate(values);
  };

  return (
    <AppLayout>
      <ApplicationHeader title="Admin Password" goBack />
      <section
        id="admin-password"
        className="flex flex-col items-center justify-center gap-y-5 rounded-md bg-white p-5">
        <form
          className="mx-auto w-full max-w-lg space-y-3"
          onSubmit={handleSubmit(onSubmitSuperAdminPassword)}>
          <label className="label-text" htmlFor="password">
            Reset Super Admin Password.
          </label>
          <InputForm
            id="password"
            type="password"
            labelText="Password*"
            name="password"
            error={errors}
            register={register}
          />
          <InputForm
            id="confirmPassword"
            type="password"
            labelText="Confirm Password*"
            name="confirmPassword"
            error={errors}
            register={register}
          />
          <div className="flex justify-end">
            <button className="bg-primary">Submit</button>
          </div>
        </form>
      </section>
    </AppLayout>
  );
};

export default AdminPassword;
