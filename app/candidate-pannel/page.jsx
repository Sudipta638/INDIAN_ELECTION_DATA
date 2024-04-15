"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Chart } from "react-google-charts";
import WrappedTables from "@/components/shared/CandidateTable";

const CandidateVotePercentageChart = ({ acData, pcData }) => {
  const data = [
    ["Year", "Candidate", "Others"],
    ...acData.map((item) => [
      Number(item.Year),
      item.vote_percentage,
      100 - item.vote_percentage,
    ]),
    ...pcData.map((item) => [
      Number(item.Year),
      item.vote_percentage,
      100 - item.vote_percentage,
    ]),
  ];

  return (
    <div className=" mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Vote Percentage Comparison Over the Years
      </h2>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          colors: ["#4285F4", "#E0E0E0"],
          hAxis: {
            title: "Year",
          },
          vAxis: {
            title: "Vote Percentage",
          },
        }}
      />
    </div>
  );
};
const CandidatePopularityChart = ({ acData, pcData }) => {
  const data = [...acData, ...pcData].sort((a, b) => a.Year - b.Year);

  return (
    <div className="p-4 border border-gray-200 rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">
        Candidate Popularity Over the Years
      </h2>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="vote_percentage"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};
const Page = () => {
  const [candidateName, setCandidateName] = useState("");
  const [shown, setShown] = useState(false);
  const [isCandidatePresent, setIsCandidatePresent] = useState(null);
  const [candidatesex, setCandidatesex] = useState("");
  const [candidatescaste, setCandidatescaste] = useState("");
  const [dataforcandidatesdetailsinac, setdataforcandidatesdetailsinac] =
    useState([]);
  const [dataforcandidatesdetailsinpc, setdataforcandidatesdetailsinpc] =
    useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:8000/api/iscandidatepresent/${candidateName}`
    );
    const data = await response.json();
    console.log(data);
    setIsCandidatePresent(data[0].presence > 0);
    if (data[0].presence > 0) {
      const responseforcandidatesdetails = await fetch(
        `http://localhost:8000/api/candidatedetails/${candidateName}`
      );
      const dataforcandidatesdetails =
        await responseforcandidatesdetails.json();
      setCandidatesex(dataforcandidatesdetails[0].cand_sex);
      setCandidatescaste(dataforcandidatesdetails[0].cand_gender);
      console.log(dataforcandidatesdetails);
      const responseforcandidatesdetailsinpc = await fetch(
        `http://localhost:8000/api/candidatedetailsonpc/${candidateName}`
      );
      const dataforcandidatesdetailsinpc =
        await responseforcandidatesdetailsinpc.json();
      setdataforcandidatesdetailsinpc(dataforcandidatesdetailsinpc);
      console.log(dataforcandidatesdetailsinpc);
      const responseforcandidetailsinac = await fetch(
        `http://localhost:8000/api/candidatedetailsonac/${candidateName}`
      );
      const dataforcandidetailsinacs = await responseforcandidetailsinac.json();
      setdataforcandidatesdetailsinac(dataforcandidetailsinacs);
      console.log(dataforcandidetailsinacs);
    }
    setShown(!shown);

    // handle the submit here
  };

  return (
    <main className="flex min-h-[980px] ml-[390px] p-10   bg-gradient-to-r from-gray-400 to-gray-500 items-start justify-center">
      <form
        onSubmit={handleSubmit}
        className={
          shown ? "hidden" : ` w-1/2 bg-white rounded-lg shadow-lg p-10 m-10 top-0`
        }
      >
        <label htmlFor="candidateName" className="block text-lg font-bold mb-2">
          Candidate Name:
        </label>
        <input
          type="text"
          id="candidateName"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg mb-4 p-2"
        />
        <button
          type="submit"
          className="w-full bg-gray-800 text-white rounded-lg p-2"
        >
          Analyze Candidate
        </button>
      </form>
      <div
        className={
          shown
            ? "min-w-1/2 bg-white rounded-lg shadow-lg p-10 top-0"
            : "hidden"
        }
      >
        <h1 className="text-3xl font-bold mb-4">
          Candidate Name: {candidateName}
        </h1>
        {isCandidatePresent === null ? null : (
          <div className="text-lg font-bold mb-4">
            {isCandidatePresent ? (
              <div>
                <h2 className="text-2xl font-semibold mt-8 m-4">
                  Gender: {candidatesex === "M" ? "Male" : "Female"}
                </h2>
                <h2 className="text-2xl font-semibold mt-4 m-4">
                  Caste: {candidatescaste}
                </h2>
                <div className="mt-10  px-auto flex flex-row">
                  <div className="w-1/3 ">
                    <CandidatePopularityChart
                      acData={dataforcandidatesdetailsinac}
                      pcData={dataforcandidatesdetailsinpc}
                    />
                  </div>
                  <div className="w-2/3 mx-4 -mt-48 ">
                    <WrappedTables  cand_name ={candidateName}/>
                    </div>
                </div>
                <div className="mt-10 w-[1500px] ">
                  <CandidateVotePercentageChart
                    acData={dataforcandidatesdetailsinac}
                    pcData={dataforcandidatesdetailsinpc}
                  />
                </div>
              </div>
            ) : (
              "Candidate has not participated in the election."
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;

// 0
// :
// {pc_no: 1, pc_name: 'Bagaha', st_name: 'Bihar', partyname: 'Bharatiya Lok Dal', Year: 1977, …}
// 1
// :
// {pc_no: 10, pc_name: 'Bayana', st_name: 'Rajasthan', partyname: 'Indian National Congress', Year: 1977, …}
// 2
// :
// {pc_no: 21, pc_name: 'Mohanlalganj', st_
