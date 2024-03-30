"use client";
import { useState } from "react";
import Image from "next/image";
import NationalElectionHistory from "../history/NationalElectionHistory";
import StateElectionHistory from "../history/StateElectionHistory";
const navComponents = [
  {
    label: "National Election",
    route: "/",
    icon: "/assests/icons/pc.png",
  },
  {
    label: "State Election",
    route: "/history",
    icon: "/assests/icons/ac.png",
  },
];
const HistoryTab = () => {

  const [activeTab, setActiveTab] = useState("National Election");
  return (
    <div className=" -mt-12 ">
      <div className=" border-b-2 border-black w-full pb-12 ml-48">
        <div className=" w-[1600px]  space-x-[100px] px-32 flex justify-center">
          {navComponents.map((navComponent) => (
            <button
              key={navComponent.label}
              onClick={() => setActiveTab(navComponent.label)}
              className={`w-[300px] h-40 border-2 flex flex-col items-center p-4 mx-8 border-rounded rounded-2xl ${
                activeTab === navComponent.label
                  ? "shadow-lg border-black bg-gray-400"
                  : "border-gray-200 bg-gray-100"
              }`}
            >
              <Image
                src={navComponent.icon}
                alt={navComponent.label}
                width={80}
                height={80}
              />
              <span className="mt-6 text-2xl">{navComponent.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="ml-48">
        {activeTab === "National Election" && <div>
         <NationalElectionHistory/>
          </div>}
        {activeTab === "State Election" && <div>
          <StateElectionHistory/>
          </div>}
        </div>
    </div>
  );
};

export default HistoryTab;
