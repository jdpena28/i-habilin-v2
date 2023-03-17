import { ApplicationHeader } from "@/client/components/header";
import { AppLayout } from "@/client/components/layout";
import Link from "next/link";

const Settings = () => {
  return (
    <AppLayout>
      <ApplicationHeader title="Settings" />
      <section
        id="settings"
        className="flex flex-col items-center justify-center gap-y-5 rounded-md bg-white p-5">
        <div className="flex w-full max-w-md items-center gap-x-20">
          <p className="subheading flex-[.8]">Maintenance Mode</p>
          <Link
            href="settings/maintenance"
            className="flex-[.3] rounded-lg bg-primary p-3 text-center font-poppins font-medium tracking-wider text-white">
            View
          </Link>
        </div>
        <div className="flex w-full max-w-md items-center gap-x-20">
          <p className="subheading flex-[.8]">Super Admin Password</p>
          <Link
            href="settings/admin-password"
            className="flex-[.3] rounded-lg bg-primary p-3 text-center font-poppins font-medium tracking-wider text-white">
            View
          </Link>
        </div>
      </section>
    </AppLayout>
  );
};

export default Settings;
