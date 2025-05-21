import { useState } from "react";

import Premium from "./Premium";
// import StandCard from "./StandCard";
import SubscribeEditModal from "@/modal/SubscribeEditModal";
import { GoPlus } from "react-icons/go";

export default function Subscriptions() {
  const [add, setAdd] = useState<boolean | null>(null);
  return (
    <>
      <div className=" flex justify-between items-center text-black">
        <h1 className="text-2xl font-semibold ">Subscription Plans</h1>
        <div
          className=" p-4 bg-[#fdead8] flex items-center gap-2 rounded-lg cursor-pointer"
          onClick={() => setAdd(true)}
        >
          <p>
            <GoPlus />
          </p>
          <button className="">Add Subscription</button>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="mt-10">
          <Premium />
        </div>
      </div>

      {/* modal show */}
      {add && <SubscribeEditModal isOpen={add} onClose={() => setAdd(null)} />}
    </>
  );
}
