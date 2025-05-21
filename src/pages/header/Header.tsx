import { MdOutlineNotifications } from "react-icons/md";

import { Link, useLocation, useNavigate } from "react-router-dom";

const path = [
  { path: "/", name: "Dashboard" },
  { path: "/user", name: "User" },
  { path: "/apartment", name: "Apartment" },
  { path: "/subscriptions", name: "Subscriptions" },
  { path: "/faq", name: "FAQ" },

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
    <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 my-3 mb-14 bg-[#F6F6F6] ml-4 rounded-2xl">
      <div className="flex items-center gap-2 px-4">
        <div className="text-xl">
          {currentPathName ? currentPathName.name : ""}
        </div>
      </div>

      <div className="flex items-center justify-center  gap-5 px-4">
        <Link to="/notifications">
          <div className="bg-yellow-50 h-11 w-11 flex items-center justify-center rounded-full text-black relative">
            <span className="absolute inset-0  ml-6">
              <div className="inline-flex items-center px-1.5 py-0.5  text-xs font-semibold leading-4 rounded-full bg-[#EEC10B]  text-black">
                6
              </div>
            </span>
            <MdOutlineNotifications size={28} />
          </div>
        </Link>
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
