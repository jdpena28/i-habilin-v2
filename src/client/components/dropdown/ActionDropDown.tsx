import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  BsFillTrash3Fill,
  BsFillPencilFill,
  BsFillEyeFill,
  BsFillGearFill,
} from "react-icons/bs";

const ActionDropdown = () => {
  return (
    <div className="w-32">
      <Menu as="div" className="inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full">
            <BsFillGearFill className="h-5 w-5 fill-gray-900" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute z-30 divide-y-2 divide-white bg-primary focus:outline-none">
            <div className="font-tertiary z-30 divide-y divide-gray-100 font-normal">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "" : "bg-primary"
                    } w-full cursor-pointer gap-x-1 rounded-none p-1.5 hover:bg-orange-600`}
                    type="button">
                    <BsFillEyeFill className="h-4 w-4" />
                    Details
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "" : "bg-primary"
                    } w-full cursor-pointer gap-x-1 rounded-none p-1.5 hover:bg-orange-600`}
                    type="button">
                    <BsFillPencilFill className="h-4 w-4" />
                    Edit&emsp;&nbsp;
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "" : "bg-primary"
                    } w-full cursor-pointer gap-x-1 rounded-none p-1.5 hover:bg-orange-600`}
                    type="button">
                    <BsFillTrash3Fill className="h-4 w-4" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ActionDropdown;
