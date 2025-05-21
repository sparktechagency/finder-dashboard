import Modal from "./Modal";

interface UserDetailProps {
  isOpen: boolean;
  onClose: () => void;
}

const userData = [
  {
    id: 1,
    userName: "Omar Yusuf Hassan",
    email: "omar@gmail.com",
    contactNumber: "+234 802 345 6789",
    eventType: "Health & Wellness",
    joiningDate: "05 Jun, 2025",
  },
];

const UserModal = ({ isOpen, onClose }: UserDetailProps) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#fefefe] p-6 rounded-xl w-[600px]">
        <div className="flex justify-between items-center -mt-2">
          <h2 className="text-xl font-semibold text-[#1A1E25]">
            Subscriptions Details
          </h2>
        </div>
        <div className="mt-4 text-[#81888C] ">
          {userData.map((user) => (
            <div key={user.id}>
              <div className="grid grid-cols-2 py-2">
                <span className="font-semibold capitalize">User Name : </span>
                <span>{user.userName}</span>
              </div>
              <div className="grid grid-cols-2 py-2">
                <span className="font-semibold capitalize">Email : </span>
                <span>{user.email}</span>
              </div>
              <div className="grid grid-cols-2 py-2">
                <span className="font-semibold capitalize">
                  Contact Number :{" "}
                </span>
                <span>{user.contactNumber}</span>
              </div>
              <div className="grid grid-cols-2 py-2">
                <span className="font-semibold capitalize">Event Type : </span>
                <span>{user.eventType}</span>
              </div>
              <div className="grid grid-cols-2 py-2">
                <span className="font-semibold capitalize">
                  Joining Date :{" "}
                </span>
                <span>{user.joiningDate}</span>
              </div>
              {/* You can display other fields or adjust based on your data */}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
