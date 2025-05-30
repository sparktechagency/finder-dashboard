import { useLocation, useNavigate } from "react-router-dom";

const path = [
  { path: "/", name: "Dashboard" },
  { path: "/subscriber", name: "Subscriber" },
  { path: "/apartment", name: "Apartment" },
  { path: "/subscriptions", name: "Subscriptions" },
  { path: "/faq", name: "FAQ" },
  { path: "/apartmentForm", name: "Apartment Form" },
  { path: "/apartment-details", name: "Apartment Details" },
  { path: "/terms-condition", name: "Terms & Condition" },
  { path: "/about", name: "About Us" },
  { path: "/privacy-policy", name: "Privacy Policy" },
  { path: "/notifications", name: "Notifications" },
  { path: "/profile", name: "Profile" },
  { path: "/edit-profile", name: "Edit Profile" },
  { path: "/change-password", name: "Change Password" },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentPathName = path.find((item) => item.path === currentPath);
  return (
    <header
      className={`flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear
  group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12
  my-3 ${
    currentPath === "/apartmentForm" ? "mb-0" : "mb-14"
  } bg-[#F6F6F6] ml-4 rounded-2xl`}
    >
      <div className="flex items-center gap-2 px-4">
        <div className="text-xl">
          {currentPathName ? currentPathName.name : ""}
        </div>
      </div>

      <div className="flex items-center justify-center  gap-5 px-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <img
            className="rounded-full w-10 h-10 border-2 border-[#8AC2FF]"
            src="https://i.ibb.co/xJdQCTG/download.jpg"
            alt="pic"
          />
          <div>Mostain Billah</div>
        </div>
      </div>
    </header>
  );
}
