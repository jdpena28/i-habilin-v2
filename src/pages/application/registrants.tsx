import Image from "next/image";

import { AppLayout } from "@/client/components/layout";
import { ApplicationHeader } from "@/client/components/header";
import { ActionDropdown } from "@/client/components/dropdown";

const registrants = () => {
  return (
    <AppLayout>
      <ApplicationHeader title="Registrants" search tabs filter />
      <section id="registrants" className="bg-white">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Stall Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="flex items-center gap-x-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full">
                    <Image src="/jollibee-logo.jpg" alt="Jollibee" fill />
                  </div>
                  <div>
                    <p className="font-medium">Jollibee</p>
                    <p className="text-xs">ihabilin.com/jollibee</p>
                  </div>
                </td>
                <td>jollibeecorp@gmail.com</td>
                <td>
                  <div className="badge-lime">Active</div>
                </td>
                <td>November 30, 2022</td>
                <td>
                  <ActionDropdown />
                </td>
              </tr>
              <tr>
                <td className="flex items-center gap-x-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full">
                    <Image src="/jollibee-logo.jpg" alt="Jollibee" fill />
                  </div>
                  <div>
                    <p className="font-medium">Jollibee</p>
                    <p className="text-xs">ihabilin.com/jollibee</p>
                  </div>
                </td>
                <td>jollibeecorp@gmail.com</td>
                <td>
                  <div className="badge-red">Expired</div>
                </td>
                <td>November 30, 2022</td>
                <td>
                  <ActionDropdown />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </AppLayout>
  );
};

export default registrants;
