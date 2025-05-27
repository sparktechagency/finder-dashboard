import { IoIosCheckmark } from "react-icons/io";
// import editL from "../../../../public/Edit.svg";
import { useState } from "react";

import { RiEditLine } from "react-icons/ri";
import { useGetSubscriptionsQuery } from "@/redux/subscriptions/subscriptions";
import Loading from "@/components/layout/shared/Loading";
import ErrorPage from "@/error/ErrorPage";
import DublicateSubscribeEditModal from "@/modal/DublicateSubscribeEditModal";

interface cardData {
  _id: string;
  title: string;
  price: number;
  month: string;
  description: string[];
  paymentType: string;
}
export default function Premium() {
  const { data, isLoading, isError } = useGetSubscriptionsQuery(undefined);
  const [edit, setEdit] = useState<{
    _id?: string;
    price?: number;
    description?: string[];
    paymentType?: string;
  } | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="flex space-x-6">
        {data?.data?.slice(0, 2).map((item: cardData) => (
          <div
            key={item._id}
            className="bg-[#F4F4F4] rounded-lg shadow-lg px-5 pt-4 border border-[#B1B1FF] flex flex-col w-[362px] h-[520px]"
            // Added flex flex-col and fixed height (adjust 400px as needed)
          >
            <div className="flex items-center justify-between text-[#1A1E25] ">
              <h2 className="text-xl font-semibold text-center">
                {item.title}
              </h2>
              <button
                onClick={() =>
                  setEdit({
                    _id: item._id,
                    price: item.price,
                    description: item.description,
                    paymentType: item.paymentType,
                  })
                }
              >
                <RiEditLine size={22} className="cursor-pointer" />
              </button>
            </div>
            <div className="mt-8">
              <span className="text-2xl font-medium text-[#F79535]">
                € {item?.price}
              </span>
              <span className="text-sm text-[#1A1E25]">
                / {item.paymentType}
              </span>
            </div>
            <div className="mt-6 space-y-3 text-[#1A1E25] flex-grow">
              {item?.description?.map((contentItem, index) => (
                <div key={index} className="flex items-center">
                  <span className="bg-[#484B51] h-4 w-4 mr-2 rounded-full">
                    <IoIosCheckmark className="text-white" />
                  </span>
                  <p className="text-sm text-[#81888C]">{contentItem}</p>
                </div>
              ))}
            </div>
            <div className="p-3 ">
              {/* mt-auto pushes this div to bottom */}
              <button className="text-lg font-semibold px-6 rounded-lg bg-[#F79535] text-[#1A1E25] w-full my-3 py-2">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* modal show */}
      {/* {edit && (
        <SubscribeEditModal
          edit={edit}
          isOpen={!!edit}
          onClose={() => setEdit(null)}
        />
      )} */}

      {edit && (
        <DublicateSubscribeEditModal
          edit={edit}
          isOpen={!!edit}
          onClose={() => setEdit(null)}
        />
      )}
    </>
  );
}
