import { useGetFaqQuery } from "@/redux/apiSlice/faq/faq";
import { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface FaqItem {
  _id: number;
  question: string;
  ans: string;
}

const Faq = () => {
  const { data, isError, isLoading } = useGetFaqQuery(undefined);
  const [openId, setOpenId] = useState<number | null>(null);
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error loading FAQs</div>;
  }

  return (
    <div className="mb-5 bg-transparent duration-500 ">
      {data?.data?.map((item: FaqItem) => (
        <div key={item?._id}>
          <div
            className="flex justify-between items-center gap-5 p-2 cursor-pointer duration-500 bg-[#F6F6F6] my-2 rounded-md text-[#81888C]"
            onClick={() => toggleAccordion(item?._id)}
          >
            <h3 className=" text-[18px] font-normal leading-[30px]">
              {item?.question}
            </h3>
            {openId === item?._id ? (
              <IoIosArrowUp className="text-base md:text-lg lg:text-2xl duration-500 " />
            ) : (
              <IoIosArrowDown className="text-base md:text-lg lg:text-2xl duration-500" />
            )}
          </div>
          <div
            ref={(el) => {
              contentRefs.current[item?._id] = el;
            }}
            style={{
              height:
                openId === item?._id
                  ? `${contentRefs.current[item?._id]?.scrollHeight}px`
                  : "0px",
              overflow: "hidden",
              transition: "height 0.5s ease",
            }}
          >
            <p className="p-4 bg-transparent text-base-color duration-500 text-sm md:text-base  rounded-bl rounded-br text-[#1A1E25]">
              {item?.ans}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
