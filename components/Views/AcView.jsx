"use client";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const AcView = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedAc, setSelectedAc] = useState("");
  const [acNames, setAcNames] = useState([]);
  const [states, setStates] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/states")
      .then((response) => response.json())
      .then((data) => setStates(data));
    if (selectedState) {
      fetch(`http://localhost:8000/api/UniqueAcNames/${selectedState}`)
        .then((response) => response.json())
        .then((data) => setAcNames(data));
    }
  }, [selectedState]);

  useEffect(() => {
    if (!selectedState || !selectedAc) return;
    fetch(
      `http://localhost:8000/api/TotalVotepollbyaCandidateinaac/${selectedState}/${selectedAc}`
    )
      .then((response) => response.json())
      .then((data) => {
        const years = [...new Set(data.map((item) => item.year.toString()))];
        const formattedData = [
          ["Year", ...years],
          ...data.map((item) => [
            item.cand_name + " (" + item.partyname + ")",
            ...years.map((year) =>
              year === item.year.toString() ? item.totvotpoll : 0
            ),
          ]),
        ];
        setChartData(formattedData);
        console.log(formattedData);
      })
      .catch((error) => console.error("Error:", error));
  }, [selectedAc, selectedState]);

  const options = {
    title: "Votes by Candidate per Year",
    vAxis: { title: "Votes" },
    hAxis: { title: "Year" },
    isStacked: true,
  };

  return (
    <div>
      <div className="flex justify-center mt-12 space-x-11">
        <div className="w-[400px] flex items-center justify-between h-12">
          <label className="mr-4 text-2xl">State:</label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-3 text-2xl border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl rounded-md"
          >
            <option value="">Select a state</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[500px] flex items-center justify-between ml-4">
          <label className="mr-4 w-[200px] text-2xl">AC Name:</label>
          <select
            value={selectedAc}
            onChange={(e) => setSelectedAc(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-3 text-2xl border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl rounded-md"
            disabled={!selectedState}
          >
            <option value="">Select an AC name</option>
            {acNames.map((acName, index) => (
              <option key={index} value={acName.ac_name}>
                {acName.ac_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-12 max-w-full ml-12">
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="900px"
        data={chartData}
        options={options}
      />
      </div>
      
    </div>
  );
};

export default AcView;
