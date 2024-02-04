import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";

export default function TopFiveSales({
  addProductModalSetting,
  handlePageUpdate,
  topFiveSales,
}) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full xl:max-w-3xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 "
                      >
                        Top Five Sales
                      </Dialog.Title>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
                  <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                    <thead>
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                          Product Name
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                          Store Name
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                          Stock Sold
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                          Sales Date
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                          Total Sale Amount
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {topFiveSales.map((element, index) => {
                        return (
                          <tr key={element._id}>
                            <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                              {element.ProductID?.name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {element.StoreID?.name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {element.StockSold}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {element.SaleDate}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              NPR {element.TotalSaleAmount}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
