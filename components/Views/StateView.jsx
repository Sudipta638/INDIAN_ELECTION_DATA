"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



const StateView = () => {
  const [states, setStates] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [pc, setpc] = useState(0);
  const [ac, setac] = useState(0);
  const [votepoll, setvotepoll] = useState(0);
  const [totalElectors, settotalElectors] = useState(0);
  const [LokSabhaWinners, setlokSabhaWinners] = useState([]);
  const [BidhanSabhaWinners, setbidhanSabhaWinners] = useState([]);
  useEffect(() => {
  
    fetch("http://localhost:8000/api/states")
      .then((response) => response.json())
      .then((data) => setStates(data));

    fetch("http://localhost:8000/api/years")
      .then((response) => response.json())
      .then((data) => setYears(data));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`http://localhost:8000/api/pc_count/${selectedState}`)
        .then((response) => response.json())
        .then((data) => setpc(data));
      fetch(`http://localhost:8000/api/ac_count/${selectedState}`)
        .then((response) => response.json())
        .then((data) => setac(data));

      fetch(`http://localhost:8000/api/votepoll/${selectedState}`)
        .then((response) => response.json())
        .then((data) => setvotepoll(data));
      fetch(`http://localhost:8000/api/electors/${selectedState}`)
        .then((response) => response.json())
        .then((data) => settotalElectors(data));

      fetch(`http://localhost:8000/api/LokShobaWinner/${selectedState}`)
        .then((response) => response.json())
        .then((data) => setlokSabhaWinners(data));
      
        fetch(`http://localhost:8000/api/BidhanShobaWinner/${selectedState}`)
        .then((response) => response.json())
        .then((data) => setbidhanSabhaWinners(data));
    }
  }, [selectedState]);

  const stateDetails = {
    pcCount: pc,
    acCount: ac,
    totalVotePoll: votepoll,
    totalElectors: totalElectors,
    stateName: selectedState,
    // Add more details here...
  };

  console.log(LokSabhaWinners);
  return (
    <div className="flex flex-col justify-center mt-12 max-w-[1600px]">
      <div className="w-[500px] flex items-center justify-between ml-48">
        <label
          htmlFor="state"
          className="font-medium text-gray-700 text-2xl  mr-12"
        >
          State
        </label>
        <select
          id="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-3 text-2xl border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl rounded-md"
        >
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-12 w-full ml-16 border-2 shadow-lg p-4 flex">
        <div className="w-2/3 ml-4">
          <h2 className="text-4xl ml-10 mb-8 font-serif font-extrabold  ">
            {" "}
            Details
          </h2>
          <div className="border-2 p-4 h-[400px] flex flex-col justify-between mr-28 tex-xl">
            <div className="border-2 p-2 shadow-md flex">
              <span className="ml-20 text-xl mr-[202px]">State</span>
              <span className="text-xl">|</span>
              <span className="text-center text-xl ml-10">
                {stateDetails.stateName}
              </span>
            </div>
            <div className="border-2 p-2 shadow-md flex">
              <span className="ml-20 text-xl mr-[164px]">PC Count</span>
              <span className="text-xl">|</span>
              <span className="text-center text-xl ml-10">
                {stateDetails.pcCount}
              </span>
            </div>
            <div className="border-2 p-2 shadow-md flex">
              <span className="ml-20 text-xl mr-[164px]">AC Count</span>
              <span className="text-xl">|</span>
              <span className="text-center text-xl ml-10">
                {stateDetails.acCount}
              </span>
            </div>
            <div className="border-2 p-2 shadow-md flex">
              <span className="ml-20 mr-[120px] text-xl">Total Vote Poll</span>
              <span className="text-xl">|</span>
              <span className="text-center text-xl ml-10">
                {stateDetails.totalVotePoll}
              </span>
            </div>
            <div className="border-2 p-2 shadow-md flex">
              <span className="mr-[128px] ml-20 text-xl">Total Electors</span>
              <span className="text-xl">|</span>
              <span className="text-center text-xl ml-10">
                {stateDetails.totalElectors}
              </span>
            </div>
          </div>
          <h1 className="italic mt-20">
            {" "}
            ***All the details are based on the latest available data.
          </h1>
        </div>

        <div className="w-1/3 mt-10 ml-10">
          <Image
            src={`/assests/images/Indiaimages/${stateDetails.stateName.replace(
              /\s/g,
              ""
            )}.png`}
            alt={stateDetails.stateName.replace(/\s/g, "")}
            width={650}
            height={400}
          />
        </div>
      </div>

      <div className="mt-12 ml-16 flex justify-around space-x-8 w-full">
        <div className="w-1/2 border-2 shadow-lg px-10 py-10">
          <h2 className="text-2xl mb-8 font-serif font-extrabold  ">
            {" "}
            Lok Shoba Winners
          </h2>
          <div className="overflow-auto h-[1000px] scrollbar-hide ">
            <Table className="">
              <TableHeader className="">
                <TableRow>
                  <TableHead className="w-[90px]">Pc No</TableHead>
                  <TableHead className="w-[150px]">Pc Name</TableHead>
                  <TableHead className="w-[250px]">Candidate Name</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="">Votes%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LokSabhaWinners.map((winner) => (
                  <TableRow key={winner.pc_no}>
                    <TableCell>{winner.pc_no}</TableCell>
                    <TableCell>{winner.pc_name}</TableCell>
                    <TableCell>{winner.cand_name}</TableCell>
                    <TableCell>{winner.party}</TableCell>
                    <TableCell>{winner.year}</TableCell>
                    <TableCell>
                      {parseFloat(winner.vote_percentage).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>


        <div className="w-1/2 border-2 shadow-lg py-10 px-10">
        <h2 className="text-2xl mb-8 font-serif font-extrabold  ">
            {" "}
            Bidhan Shoba Winners
          </h2>
          <div className="overflow-auto h-[1000px] scrollbar-hide  ">
            <Table className="">
              <TableHeader className="">
                <TableRow>
                  <TableHead className="w-[90px]">Ac No</TableHead>
                  <TableHead className="w-[150px]">Ac Name</TableHead>
                  <TableHead className="w-[250px]">Candidate Name</TableHead>
                  <TableHead className="w-[90px">Party</TableHead>
                  <TableHead className ="w-[90px]">Year</TableHead>
                  <TableHead className="">Votes%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BidhanSabhaWinners.map((winner) => (
                  <TableRow key={winner.ac_no}>
                    <TableCell>{winner.ac_no}</TableCell>
                    <TableCell>{winner.ac_name}</TableCell>
                    <TableCell>{winner.cand_name}</TableCell>
                    <TableCell>{winner.party}</TableCell>
                    <TableCell>{winner.year}</TableCell>
                    <TableCell>
                      {parseFloat(winner.vote_percentage).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );

};

export default StateView;
