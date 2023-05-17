import { Fragment, FC } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  BsFillTrash3Fill,
  BsFillPencilFill,
  BsFillEyeFill,
  BsFillGearFill,
} from "react-icons/bs";
import { useRouter } from "next/router";

interface ActionDropdownProps {
  viewOnClick: string;
  viewOnAction?: () => void;
  options: optionType[];
  onDelete: () => void;
  onEdit?: () => void;
}
type optionType = "View" | "Edit" | "Delete";

const ActionDropdown: FC<ActionDropdownProps> = ({
  viewOnClick,
  viewOnAction,
  options = ["View", "Edit", "Delete"],
  onDelete,
  onEdit,
}) => {
  const { push } = useRouter();
  return (
    <div className="relative w-32">
      <Menu as="div" className="relative inline-block text-left">
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
          <Menu.Items className="absolute  z-30 divide-y-2 divide-white bg-primary focus:outline-none">
            <div className="font-tertiary z-30 divide-y divide-gray-100 font-normal">
              {options.includes("View") && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "" : "bg-primary"
                      } w-full cursor-pointer gap-x-1 rounded-none p-1.5 hover:bg-orange-600`}
                      type="button"
                      onClick={() => {
                        if (viewOnAction) {
                          viewOnAction();
                          return;
                        }
                        push(viewOnClick);
                      }}>
                      <BsFillEyeFill className="h-4 w-4" />
                      Details
                    </button>
                  )}
                </Menu.Item>
              )}
              {options.includes("Edit") && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "" : "bg-primary"
                      } w-full cursor-pointer gap-x-1 rounded-none p-1.5 hover:bg-orange-600`}
                      type="button"
                      onClick={onEdit}>
                      <BsFillPencilFill className="h-4 w-4" />
                      Edit&emsp;&nbsp;
                    </button>
                  )}
                </Menu.Item>
              )}
              {options.includes("Delete") && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "" : "bg-primary"
                      } w-full cursor-pointer gap-x-1 rounded-none p-1.5 hover:bg-orange-600`}
                      type="button"
                      onClick={onDelete}>
                      <BsFillTrash3Fill className="h-4 w-4" />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ActionDropdown;
