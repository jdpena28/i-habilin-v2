import { AppLayout } from "@/client/components/layout";
import { BsArrowLeft, BsSearch } from "react-icons/bs";

const registrants = () => {
  return (
    <AppLayout>
      <header className="sticky top-0 mb-5 w-full border-b-2 border-gray-200 py-5">
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-center gap-x-5">
            <BsArrowLeft className="h-7 w-7" />
            <div className="decorated-underline">
              <h5>Registrants</h5>
              <div />
            </div>
          </div>
          {/* Search Icon */}
          <div className="flex items-center gap-x-1 rounded-md bg-white p-2">
            <BsSearch className="h-5 w-5" />
            <input
              className="border-none font-poppins outline-none focus:border-transparent focus:outline-none focus:ring-0"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex w-full font-brocha">
          <div className="border-b-2 border-secondary p-2 text-secondary">
            All
          </div>
          <div className="border-b-2 border-transparent p-2">Approved</div>
          <div className="border-b-2 border-transparent p-2">Pending</div>
          <div className="border-b-2 border-transparent p-2">Expired</div>
        </div>
      </header>
      <section id="registrants" className="bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Date of Birth
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Role
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Salary
                </th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  John Doe
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Developer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="/application/registrants/view"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                    View
                  </a>
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Jane Doe
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  04/11/1980
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Designer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $100,000
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="/application/registrants/view"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                    View
                  </a>
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Gary Barlow
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Singer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $20,000
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="/application/registrants/view"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                    View
                  </a>
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
