"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
const Main = () => {
  const [parties, setParties] = useState([]);
  const [selectedparty, setselectedparty] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/api/partynames")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) =>
          a.partyname.localeCompare(b.partyname)
        );
        setParties(sortedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  const buttons = [
    "Overall Analysis",
    "Assembly Election Analysis",
    "Parliamentary Analysis",
    "Yearwise Analysis",
    "Statewise Analysis",
    "Compare Two Parties",
  ];
  return (
    <div className=" mt-20 mr-20 min-h-screen">
      <div className="flex  ml-80 mb-20">
        <label
          htmlFor="party"
          className="font-medium text-gray-700 text-2xl  mr-12"
        >
          PartyName
        </label>
        <select
          id="party"
          value={selectedparty}
          onChange={(e) => setselectedparty(e.target.value)}
          className="w-[500px] h-12 border border-gray-300 rounded-lg px-4 py-2 text-2xl"
        >
          <option value="">Select a party</option>
          {parties.map((party, index) => (
            <option key={index} value={party.partyname}>
              {party.partyname}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4  pl-48 items-center justify-center">
        {buttons.map((button) => (
          <Link
            key={button}
            href={`/party-analysis/${button
              .replace(/\s+/g, "-")
              .toLowerCase()}/${selectedparty.replace(/\s+/g, "-")}`}
            className="bg-gray-500 text-white flex items-center justify-center rounded-lg shadow-md px-4 py-2 m-10 w-60 h-40 hover:bg-gray-700 transition duration-200 text-center "
          >
            {" "}
            {button}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Main;
