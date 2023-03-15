/* eslint-disable no-unused-vars */
import { Fragment, FC, type ReactNode } from "react";
import { Transition, Dialog } from "@headlessui/react";

interface ModalTemplateProps {
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
  title: string;
  children: ReactNode;
  bodyClassName?: string;
  onClose?: () => void;
}

const ModalTemplate: FC<ModalTemplateProps> = ({
  isOpenModal,
  setIsOpenModal,
  title,
  children,
  bodyClassName = "max-w-xl",
  onClose,
}) => {
  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          setIsOpenModal(false);
          // eslint-disable-next-line no-unused-expressions
          typeof onClose !== "undefined" && onClose();
        }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel
                className={`font-tertiary w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle font-light tracking-wide shadow-xl transition-all ${bodyClassName}`}>
                <Dialog.Title
                  as="h3"
                  className="mb-8 text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
                {/* BODY */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalTemplate;
