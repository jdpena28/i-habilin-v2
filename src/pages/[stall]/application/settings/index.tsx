import Link from "next/link";
import { useRouter } from "next/router";

import { StallLayout } from "@/client/components/layout";
import { StallHeader } from "@/client/components/header";

const Index = () => {
  const { query, pathname } = useRouter();
  return (
    <StallLayout>
      <StallHeader title="Settings" />
      <section
        id="settings"
        className="flex flex-col items-center justify-center gap-y-5 rounded-md bg-white p-5">
        <div className="flex w-full max-w-md items-center gap-x-20">
          <p className="subheading flex-[.8]">QR Code</p>
          <Link
            href={{
              pathname: `${pathname}/qr-code`,
              query: {
                stall: query.stall,
              },
            }}
            className="flex-[.3] rounded-lg bg-primary p-3 text-center font-poppins font-medium tracking-wider text-white">
            View
          </Link>
        </div>
        <div className="flex w-full max-w-md items-center gap-x-20">
          <p className="subheading flex-[.8]">Operating Hours</p>
          <Link
            href={{
              pathname: `${pathname}/operating-hours`,
              query: {
                stall: query.stall,
              },
            }}
            className="flex-[.3] rounded-lg bg-primary p-3 text-center font-poppins font-medium tracking-wider text-white">
            View
          </Link>
        </div>
      </section>
    </StallLayout>
  );
};

export default Index;
