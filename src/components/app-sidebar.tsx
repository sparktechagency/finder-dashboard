import * as React from "react";
// import { Settings2 } from "lucide-react";
// import logo from "../../public/logo.svg";
import logo from "../../public/logo.svg";
import { NavMain } from "@/components/nav-main";

import { BiCategory } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineSubscriptions } from "react-icons/md";
import { PiBuildingApartmentThin } from "react-icons/pi";
import { FaQuestion } from "react-icons/fa6";
// import { NavProjects } from "@/components/nav-projects";

import { LuFileSliders } from "react-icons/lu";
import { PiNoteDuotone } from "react-icons/pi";
import { TbEdit, TbNotes } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { RiExchange2Fill } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: BiCategory,
      isActive: true,
    },
    {
      title: "Subscriber",
      url: "/subscriber",
      icon: IoIosPeople,
    },
    {
      title: "Apartment",
      url: "/apartment",
      icon: PiBuildingApartmentThin,
    },
    {
      title: "Subscriptions",
      url: "/subscriptions",
      icon: MdOutlineSubscriptions,
    },

    {
      title: "FAQ",
      url: "/faq",
      icon: FaQuestion,
    },

    {
      title: "Settings",
      url: "#",
      icon: CiSettings,
      items: [
        { title: "Profile", url: "/profile", icon: CgProfile },
        { title: "Edit Profile", url: "/edit-profile", icon: TbEdit },
        {
          title: "Change Password",
          url: "/change-password",
          icon: RiExchange2Fill,
        },
        { title: "About Us", url: "/about", icon: LuFileSliders },
        {
          title: "Privacy & Policy",
          url: "/privacy-policy",
          icon: PiNoteDuotone,
        },
        { title: "Terms & Conditions", url: "terms-condition", icon: TbNotes },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center justify-center">
        <img className="w-24" src={logo} alt="pic" />
      </SidebarHeader>
      <SidebarContent>
        <div className="mt-6">
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </div>
      </SidebarContent>

      <SidebarRail />
      <SidebarFooter className="mb-10 cursor-pointer">
        <Link
          to="/login"
          className="flex items-center justify-center text-red-400"
        >
          <button className=" cursor-pointer">Logout</button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
