// import Modal from "./Modal";

// interface dataDetailProps {
//   isOpen: boolean;
//   data: object;
//   onClose: () => void;
// }

// const dataModal = ({ isOpen, onClose, data }: dataDetailProps) => {
//   const { apartmentName, code, price } = data;
//   const { location } = data.contact;
//   if (!isOpen) return null;

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="bg-[#fefefe] p-6 rounded-xl w-[600px]">
//         <div className="flex justify-between items-center -mt-2">
//           <h2 className="text-xl font-semibold text-[#1A1E25]">
//             Apartment Details
//           </h2>
//         </div>
//         <div className="mt-4 text-[#81888C] ">
//           <div className="grid grid-cols-2 py-2">
//             <span className="font-semibold capitalize">Apartment Name :</span>
//             <span>{data?.apartmentName}</span>
//           </div>
//           <div className="grid grid-cols-2 py-2">
//             <span className="font-semibold capitalize">Location : </span>
//             <span>{location}</span>
//           </div>
//           <div className="grid grid-cols-2 py-2">
//             <span className="font-semibold capitalize">Apartment Code :</span>
//             <span>2345</span>
//           </div>
//           <div className="grid grid-cols-2 py-2">
//             <span className="font-semibold capitalize"> Price : </span>
//             <span>{price}</span>
//           </div>
//           {/* <div className="grid grid-cols-2 py-2">
//                 <span className="font-semibold capitalize">
//                   Joining Date :{" "}
//                 </span>
//                 <span>{data?.joiningDate}</span>
//               </div> */}
//           {/* You can display other fields or adjust based on your data */}
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default dataModal;

import { imageUrl } from "@/redux/api/baseApi";
import Modal from "./Modal";

interface ApartmentData {
  _id: string;
  apartmentName: string;
  apartmentImage: string;
  location: string;
  price: string;
  commission: string;
}

interface dataDetailProps {
  isOpen: boolean;
  data: ApartmentData;
  onClose: () => void;
}

const dataModal = ({ isOpen, onClose, data }: dataDetailProps) => {
  console.log(data);
  if (!data) {
    return null;
  }
  const { apartmentName, price, location, apartmentImage, commission } = data;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#fefefe] p-6 rounded-xl w-[600px]">
        <div className="flex justify-between items-center -mt-2">
          <h2 className="text-xl font-semibold text-[#1A1E25]">
            Apartment Details
          </h2>
        </div>
        <div className="grid grid-cols-2 py-2 mt-4">
          <span className="font-semibold capitalize">Apartment Name :</span>
          <span>{apartmentName}</span>
        </div>
        <div className="grid grid-cols-2 py-2 mt-">
          <span className="font-semibold capitalize">Apartment Image :</span>
          <img
            src={
              apartmentImage[0]?.startsWith("http")
                ? apartmentImage[0]
                : `${imageUrl}${apartmentImage}`
            }
          />
        </div>
        <div className="grid grid-cols-2 py-2">
          <span className="font-semibold capitalize">Location : </span>
          <span>{location}</span>
        </div>
        <div className="grid grid-cols-2 py-2">
          <span className="font-semibold capitalize">Commission :</span>
          <span>{commission}%</span>
        </div>
        <div className="grid grid-cols-2 py-2">
          <span className="font-semibold capitalize"> Price : </span>
          <span>{price}</span>
        </div>
      </div>
    </Modal>
  );
};

export default dataModal;
