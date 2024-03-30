"use client";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
const StateElectionHistory = () => {
  const [states, setStates] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/api/states")
      .then((response) => response.json())
      .then((data) => setStates(data));

    fetch("http://localhost:8000/api/years")
      .then((response) => response.json())
      .then((data) => setYears(data));
  }, []);


  const [chartDataforgender, setChartDataforgender] = useState([]);
  const [chartDataforcaste, setChartDataforcaste] = useState([]);
  const [chartDataforvotesPercentage, setChartDataforvotesPercentage] =
    useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/total_male_and_female_candidates_yearwiseinstate/${selectedState}`)
      .then((res) => res.json())
      .then((data) => {
        const years = [...new Set(data.map((item) => item.year))];
        const formattedData = [
          ["Year", "Male", "Female"],
          ...years.map((year) => [
            year.toString(),
            (
              data.find(
                (item) => item.year === year && item.cand_sex === "M"
              ) || {}
            ).total_candidates || 0,
            (
              data.find(
                (item) => item.year === year && item.cand_sex === "F"
              ) || {}
            ).total_candidates || 0,
          ]),
        ];
        setChartDataforgender(formattedData);
      });

    fetch(`http://localhost:8000/api/caste_wise_candidates_yearwiseinstate/${selectedState}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const years = [...new Set(data.map((item) => item.year))];
        const formattedData = [
          ["Year", "GEN", "SC", "ST"],
          ...years.map((year) => [
            year.toString(),
            (
              data.find(
                (item) => item.year === year && item.ac_type === "GEN"
              ) || {}
            ).total_candidates || 0,
            (
              data.find(
                (item) => item.year === year && item.ac_type === "SC"
              ) || {}
            ).total_candidates || 0,
            (
              data.find(
                (item) => item.year === year && item.ac_type === "ST"
              ) || {}
            ).total_candidates || 0,
          ]),
        ];
        setChartDataforcaste(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`http://localhost:8000/api/votes_percentage_yearwiseinstate/${selectedState}`)
      .then((res) => res.json())
      .then((data) => {
        const years = [...new Set(data.map((item) => item.year))];
        const formattedData = [
          ["Year", "Votes Percentage"],
          ...years.map((year) => [
            year.toString(),
            (data.find((item) => item.year === year) || {}).vote_percentage ||
              0,
          ]),
        ];
        setChartDataforvotesPercentage(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedState]);

  const optionsforgender = {
    title: "Total Male and Female Candidates Yearwise",
    vAxis: { title: "Total Candidates" },
    hAxis: { title: "Year" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
    colors: ["#1b9e77", "#d95f02"],
  };
  const optionsforcaste = {
    title: "Total Candidates Caste Wise Yearwise",
    vAxis: { title: "Total Candidates" },
    hAxis: { title: "Year" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
    colors: ["#1b9e77", "#d95f02", "#7570b3"],
  };
  const optionsforvotesPercentage = {
    title: "Vote Percentage Yearwise",
    vAxis: { title: "Votes Percentage" },
    hAxis: { title: "Year" },
  };


  return (
    <div>
      <div className="w-[500px] mt-12 flex items-center justify-between ml-[500px]">
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
      <div className="max-w-full">
      <h2
        className="my-10"
        style={{
          color: "#1b9e77",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Total Number of Male and Female Candidates in State Elections Over
        the Years
      </h2>
      <div className="flex justify-center items-center  pl-20">
        <Chart
          chartType="ComboChart"
          width="100%"
          height="400px"
          data={chartDataforgender}
          options={optionsforgender}
        />
      </div>
      <h2
        className="my-10"
        style={{
          color: "#1b9e77",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Total Number of Candidates Caste Wise in State Elections Over the
        Years
      </h2>
      <div className="flex justify-center items-center  pl-20">
        <Chart
          chartType="ComboChart"
          width="100%"
          height="400px"
          data={chartDataforcaste}
          options={optionsforcaste}
        />
      </div>

      <h2
        className="my-10"
        style={{
          color: "#1b9e77",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Votes Percentage in State Elections Over the Years
      </h2>
      <div className="flex justify-center items-center  pl-20">
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={chartDataforvotesPercentage}
          options={optionsforvotesPercentage}
        />
      </div>
    </div>
    </div>
  );
};

export default StateElectionHistory;
