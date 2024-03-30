"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const pathname = usePathname();

  const [active, setActive] = useState("national");
  console.log("pathanmame" + pathname);
  return (
    <aside className="">
      <div className="flex justify-end space-x-8 p-4 text-bold h-20 border-black border-b-2 font-sanshow  font-semibold text-wrap">
        <h2
          className={`cursor-pointer text-xl ${
            active === "national" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActive("national")}
        >
          {" "}
          Dbms Group -3
        </h2>
        <h2
          className={`cursor-pointer text-xl ${
            active === "state" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActive("state")}
        >
          {pathname}
        </h2>
      </div>
      <div className="fixed top-0 left-0 h-screen w-96 bg-gray-800 text-white p-6 ">
        <Link href="/" className="space-x-8">
          <div className="text-4xl font-bold text-blue-500 hover:text-blue-700  text-center ">
            <h2 className="space-x-8 font-serif mb-20 mt-10">
              Indian Election
            </h2>
          </div>
        </Link>

        <ul
          className=" sidebar-nav_elements py-8 font-sans w-full "
          style={{ letterSpacing: "0.1em", lineHeight: "1.5" }}
        >
          {navLinks.map((link) => {
            const isActive = link.route === pathname;
            console.log("isactive" + isActive);
            return (
              <li
                key={link.route}
                className={`sidebar-nav_element  hover : group my-4 text-xl h-20 flex items-center  justify-center hover:text-white hover:bg-gradient-to-r from-gray-800 to-gray-700' ${
                  isActive
                    ? "text-white text-center bg-gradient-to-r from-gray-800 to-gray-700"
                    : " text-gray-500"
                }`}
              >
                <Link
                  className="sidebar-link text-center text-2xl"
                  href={link.route}
                >
                  <Image
                    src={link.icon}
                    alt="logo"
                    width={48}
                    height={48}
                    className={`${isActive && "text-white brightness-125"} `}
                  />
                  <div className="text-center my-1.5">{link.label}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
