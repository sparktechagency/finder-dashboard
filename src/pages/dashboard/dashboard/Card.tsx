import user from "../../../../public/card/user.svg";
// import service from "../../../../public/card/services.svg";
import earn from "../../../../public/card/earning.svg";
const data = [
  {
    icon: <img src={user} alt="total" />,
    title: "Total Agency",
    date: "13 NOV, 2024",
    count: "80",
    total: "20550",
    daliy: "29",
  },
  {
    icon: <img src={user} alt="total" />,
    title: "Total Apartment",
    date: "13 NOV, 2024",
    count: "820",
    total: "S109558",
    daliy: "1492tn",
  },
  {
    icon: <img src={earn} alt="total" />,
    title: "Total Income for Subscriptions",
    date: "13 NOV, 2024",
    count: "8200",
    total: "SYP109558",
    daliy: "1392tn",
  },
];

const Card = () => {
  return (
    <div className="grid grid-cols-3 gap-5 ">
      {data.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl w-full gap-4 bg-[#F6F6F6] py-5 px-5"
        >
          <div className="flex items-center gap-3 ">
            <div className="bg-[#FEF2E6E0] w-[70px] h-[70px] rounded-full flex items-center justify-center ">
              {item?.icon}
            </div>
            <div className="">
              <div className="font-medium text-[18px] text-[#81888C]">
                {item?.title}
              </div>
              <p className="text-[#1A1E25] text-4xl font-semibold">
                {item?.count}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
