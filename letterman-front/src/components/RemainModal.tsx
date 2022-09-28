import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ColorSystem from 'utils/ColorSystem';
import { getUUID } from 'utils/getUUID';
import axios from 'axios';
import FooterCookies from './RemainingDays/FooterCookies';

interface Props {
  openinit: any;
  closeModal: any;
  test: ModalInfo | undefined;
}

interface ModalInfo {
  Dday: string;
  eventID: string;
}
export default function RemainModal({ openinit, closeModal, test }: Props) {
  const [open, setOpen] = useState(openinit);

  const cancelButtonRef = useRef(null);

  const modalHandle = () => {
    closeModal();
  };

  const [mailNum, setMailNum] = useState('');
  const { uuid } = getUUID();

  if (test !== undefined) {
    if (test.eventID === '') {
      (async () => {
        await axios
          .get(`/letters/users/${uuid}/birth/counts`)
          .then((res) => {
            setMailNum(res.data[0].count);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    } else {
      (async () => {
        await axios
          .get(`/letters/users/${uuid}/events/${test!.eventID}/counts`)
          .then((res) => {
            if (res.data.length) {
              setMailNum(res.data[0].count);
            } else {
              setMailNum('0');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    }
  }

  return (
    <div>
      <Transition.Root show={openinit} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel>
                  <div
                    className="overflow-hidden rounded-lg shadow-xl md:w-128 md:h-96 w-72 h-56 flex justify-center items-center"
                    style={{ backgroundColor: ColorSystem.MainColor.Primary }}
                  >
                    <div className="mt-3 flex justify-center items-center flex-col md:w-128 md:h-96 w-32 h-48">
                      <Dialog.Title as="h3" className="font-bold text-lg text-slate-100 md:w-52 w-24">
                        D - {test?.Dday}
                      </Dialog.Title>
                      <Dialog.Title as="h3" className=" text-ml text-slate-100 md:w-52 w-24">
                        받은편지 {mailNum}개
                      </Dialog.Title>
                      <img src="images/back3.png" alt="a" className="w-32 md:w-80 " />

                      <div className="mt-2 flex justify-center">
                        <img src="images/back2.png" alt="a" className="absolute bottom-0 left-0 w-32 md:w-64 " />
                        <img src="images/back1.png" alt="a" className="absolute bottom-0 right-0 w-40 md:w-72 " />
                      </div>
                    </div>
                  </div>
                  <FooterCookies />
                  <button
                    type="button"
                    className="absolute top-0 right-0 rounded-full m-2 bg-slate-700 px-3 py-1 font-medium text-white "
                    onClick={modalHandle}
                  >
                    X
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
