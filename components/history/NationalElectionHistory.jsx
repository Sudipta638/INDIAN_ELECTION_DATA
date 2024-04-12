"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const NationalElectionHistory = () => {
  const [chartDataforgender, setChartDataforgender] = useState([]);
  const [chartDataforcaste, setChartDataforcaste] = useState([]);
  const [chartDataforvotesPercentage, setChartDataforvotesPercentage] =
    useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8000/api/total_male_and_female_candidates_yearwise")
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

    fetch("http://localhost:8000/api/caste_wise_candidates_yearwise")
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
                (item) => item.year === year && item.pc_type === "GEN"
              ) || {}
            ).total_candidates || 0,
            (
              data.find(
                (item) => item.year === year && item.pc_type === "SC"
              ) || {}
            ).total_candidates || 0,
            (
              data.find(
                (item) => item.year === year && item.pc_type === "ST"
              ) || {}
            ).total_candidates || 0,
          ]),
        ];
        setChartDataforcaste(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:8000/api/votes_percentage_yearwise")
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
  }, []);

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
        Total Number of Male and Female Candidates in National Elections Over
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
        Total Number of Candidates Caste Wise in National Elections Over the
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
        Votes Percentage in National Elections Over the Years
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
  );
};

export default NationalElectionHistory;
