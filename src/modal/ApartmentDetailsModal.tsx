import Modal from "./Modal";

interface ApartmentData {
  _id: string;
  floorPlan: string;
  price: number;
  badSize: string;
  seeView: boolean;
}

interface dataDetailProps {
  isOpen: boolean;
  data: ApartmentData;
  onClose: () => void;
}

const ApartmentDetailsModal = ({ isOpen, onClose, data }: dataDetailProps) => {
  if (!data) {
    return null;
  }

  const { floorPlan, price, seeView, badSize } = data;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#fefefe] p-6 rounded-xl w-[600px]">
        <div className="flex justify-between items-center -mt-2">
          <h2 className="text-xl font-semibold text-[#1A1E25]">
            Projects Details
          </h2>
        </div>
        <div className="grid grid-cols-3 py-2 mt-4">
          <span className="font-semibold">Project Name </span>
          <span className="font-semibold"> :</span>
          <span>{floorPlan}</span>
        </div>

        <div className="grid grid-cols-3 py-2">
          <span className="font-semibold capitalize"> Sea View </span>
          <span className="font-semibold">: </span>
          <span>{seeView === false ? "No" : "YES"}</span>
        </div>
        <div className="grid grid-cols-3 py-2">
          <span className="font-semibold"> Price </span>
          <span className="font-semibold"> : </span>
          <span>€{price}</span>
        </div>
        <div className="grid grid-cols-3 py-2">
          <span className="font-semibold capitalize">Unit </span>
          <span className="font-semibold capitalize">: </span>
          <span>{badSize}</span>
        </div>
      </div>
    </Modal>
  );
};

export default ApartmentDetailsModal;
