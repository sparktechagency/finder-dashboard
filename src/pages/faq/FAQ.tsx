import { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const data = [
  {
    id: 1,
    title: "What’s the app’s main purpose?",
    content:
      "The app will use a modern, minimalist design style, focusing on clean lines, intuitive navigation, and a user-friendly interface. The aesthetic will emphasize simplicity, functionality, and responsiveness, with a consistent color palette and sleek typography for enhanced usability.",
  },
  {
    id: 2,
    title: "What design style will the app use?",
    content:
      "The app will use a modern, minimalist design style, focusing on clean lines, intuitive navigation, and a user-friendly interface. The aesthetic will emphasize simplicity, functionality, and responsiveness, with a consistent color palette and sleek typography for enhanced usability.",
  },
  {
    id: 3,
    title: "What type of support will be offered?",
    content:
      "Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae, accumsan auctor mi.",
  },
  {
    id: 4,
    title: "Who is the target audience?",
    content:
      "The target audience includes tech enthusiasts, developers, and users interested in minimalist design that is functional and easy to navigate.",
  },
];

const Faq = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="mb-5 bg-transparent duration-500 ">
      {data?.map((item) => (
        <div key={item.id}>
          <div
            className="flex justify-between items-center gap-5 p-2 cursor-pointer duration-500 bg-[#F6F6F6] my-2 rounded-md text-[#81888C]"
            onClick={() => toggleAccordion(item.id)}
          >
            <h3 className=" text-[18px] font-normal leading-[30px]">
              {item.title}
            </h3>
            {openId === item.id ? (
              <IoIosArrowUp className="text-base md:text-lg lg:text-2xl duration-500 " />
            ) : (
              <IoIosArrowDown className="text-base md:text-lg lg:text-2xl duration-500" />
            )}
          </div>
          <div
            ref={(el) => {
              contentRefs.current[item.id] = el;
            }}
            style={{
              height:
                openId === item.id
                  ? `${contentRefs.current[item.id]?.scrollHeight}px`
                  : "0px",
              overflow: "hidden",
              transition: "height 0.5s ease",
            }}
          >
            <p className="p-4 bg-transparent text-base-color duration-500 text-sm md:text-base  rounded-bl rounded-br text-[#1A1E25]">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
