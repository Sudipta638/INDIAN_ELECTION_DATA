"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import WrappedTables from "./Table";
const OverallAnalysis = ({ partyname }) => {
  const [pcwons, setPcwons] = useState(0);
  const [acwons, setAcwons] = useState(0);
  const [states, setStates] = useState([]);
  const [lastElectionYear, setLastElectionYear] = useState(0);
  const [presentstates, setPresentStates] = useState([]);
  const [assemblyElectionStates, setAssemblyElectionStates] = useState([]);
  const [oppositionStatus, setOppositionStatus] = useState([]);
  const [pcelectionWonyears, setPcelectionWonyears] = useState([]);
  const [chartDataforac, setChartDataforac] = useState([]);
  const [chartDataforpc, setChartDataforpc] = useState([]);
  const [loadingforac, setLoadingforac] = useState(true);
  const [loadingforpc, setLoadingforpc] = useState(true);
  const fetchPartyData = async (partyname, statenames) => {
    const promises = statenames.map((state) =>
      axios.get(
        `http://localhost:8000/api/pcseatwonsinlatestyear/${state}/${partyname}`
      )
    );

    const results = await Promise.all(promises);

    const totalSeatsWon = results.reduce(
      (sum, result) => sum + result.data[0].seats_won,
      0
    );

    setPcwons(totalSeatsWon);
  };
  const fetchPartyDataforac = async (partyname, statenames) => {
    const promises = statenames.map((state) =>
      axios.get(
        `http://localhost:8000/api/acseatwonsinlatestyear/${state}/${partyname}`
      )
    );

    const results = await Promise.all(promises);

    const totalSeatsWon = results.reduce(
      (sum, result) => sum + result.data[0].seats_won,
      0
    );

    setAcwons(totalSeatsWon);
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/states")
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
        fetchPartyData(partyname, data);
        fetchPartyDataforac(partyname, data);
      })
      .catch((error) => console.error("Error:", error));

    fetch(
      `http://localhost:8000/api/latestyearinparticipatedbyaparty/${partyname}`
    )
      .then((response) => response.json())
      .then((data) => setLastElectionYear(data[0].last_participating_year))
      .catch((error) => console.error("Error:", error));

    fetch(`http://localhost:8000/api/CurrentlyPresentState/${partyname}`)
      .then((response) => response.json())
      .then((data) => setPresentStates(data));

    fetch(`http://localhost:8000/api/wonAssemblyStates/${partyname}`)
      .then((response) => response.json())
      .then((data) => setAssemblyElectionStates(data));

    fetch(`http://localhost:8000/api/OppostionPartyStatus/${partyname}`)
      .then((response) => response.json())
      .then((data) => setOppositionStatus(data));

    fetch(`http://localhost:8000/api/pcelectionwonyears/${partyname}`)
      .then((response) => response.json())
      .then((data) => setPcelectionWonyears(data));
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      const seatsWonByYear = {};
      const seatsParticipatedByYear = {};

      const promises = presentstates.map(async (state) => {
        const result = await axios.get(
          `http://localhost:8000/api/acelectionwonyearwise/${state.states}/${partyname}`
        );
        result.data.forEach((item) => {
          if (seatsWonByYear[item.year]) {
            seatsWonByYear[item.year] += Number(item.seats_won);
          } else {
            seatsWonByYear[item.year] = Number(item.seats_won);
          }
        });
      });

      await Promise.all(promises);

      const participationResult = await axios.get(
        `http://localhost:8000/api/acparticipationyaerwise/${partyname}`
      );
      participationResult.data.forEach((item) => {
        seatsParticipatedByYear[item.year] = Number(item.seats_participated);
      });

      const data = [["Year", "Seats Won", "Seats Participated"]];
      for (const year in seatsWonByYear) {
        data.push([
          Number(year),
          seatsWonByYear[year],
          seatsParticipatedByYear[year] || 0,
        ]);
      }
      setChartDataforac(data);
      setLoadingforac(false);
    };

    fetchChartData();
  }, [presentstates, partyname]);

  useEffect(() => {
    const fetchChartData = async () => {
      const seatsWonByYear = {};
      const seatsParticipatedByYear = {};

      const promises = presentstates.map(async (state) => {
        const result = await axios.get(
          `http://localhost:8000/api/pcelectionwonyearwise/${state.states}/${partyname}`
        );
        result.data.forEach((item) => {
          if (seatsWonByYear[item.year]) {
            seatsWonByYear[item.year] += Number(item.seats_won);
          } else {
            seatsWonByYear[item.year] = Number(item.seats_won);
          }
        });
      });

      await Promise.all(promises);

      const participationResult = await axios.get(
        `http://localhost:8000/api/pcparticipationyaerwise/${partyname}`
      );
      participationResult.data.forEach((item) => {
        seatsParticipatedByYear[item.year] = Number(item.seats_participated);
      });

      const data = [["Year", "Seats Won", "Seats Participated"]];
      for (const year in seatsWonByYear) {
        data.push([
          Number(year),
          seatsWonByYear[year],
          seatsParticipatedByYear[year] || 0,
        ]);
      }
      setChartDataforpc(data);
    };

    fetchChartData();
    setLoadingforpc(false);
  }, [presentstates, partyname]);

  const uniqueOppositionStates = oppositionStatus.filter(
    (oppositionState) =>
      !assemblyElectionStates.some(
        (assemblyState) => assemblyState.st_name === oppositionState.state
      )
  );
  return (
    <div className="-ml-20 -mt-16  min-h-screen">
      <div className="-ml-10 -mr-20 -mt-20 min-h-screen bg-gradient-to-r from-gray-400 to-gray-900">
        <div className="flex items-start justify-center">
          <div className="w-1/2 bg-white rounded-lg shadow-lg p-10 mb-10 mx-10 my-10">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Overall Analysis
            </h1>
            <h2 className="text-xl font-semibold mb-4">
              Party Name: <span className="font-normal">{partyname}</span>
            </h2>
            <h2 className="text-xl font-semibold mb-4">
              Parliamentary Seats Won in 2014:{" "}
              <span className="font-normal">{pcwons}</span>
            </h2>
            <h2 className="text-xl font-semibold mb-4">
              Assembly Seats Won in Latest Year:{" "}
              <span className="font-normal">{acwons}</span>
            </h2>
            <h2 className="text-xl font-semibold mb-4">
              Last Election Participation Year:{" "}
              <span className="font-normal">{lastElectionYear}</span>
            </h2>
            <h2 className="text-xl font-semibold mb-4">
              Present in States:{" "}
              <span className="font-normal">
                {presentstates.length > 0
                  ? presentstates.map((state) => state.states).join(", ")
                  : "Not Present"}
              </span>
            </h2>
            <h2 className="text-xl font-semibold mb-4">
              Won Assembly Election in States:{" "}
              <span className="font-normal">
                {assemblyElectionStates.length > 0
                  ? assemblyElectionStates
                      .map((state) => state.st_name)
                      .join(", ")
                  : "Not Won"}
              </span>
            </h2>
            <h2 className="text-xl font-semibold mb-4">
              Opposition Party in States:{" "}
              <span className="font-normal">
                {oppositionStatus.length > 0
                  ? uniqueOppositionStates
                      .map((state) => state.state)
                      .join(", ")
                  : "Not Present"}
              </span>
            </h2>
            <h2 className="text-xl font-semibold mb-4">
              {pcelectionWonyears.map((yearObj) => yearObj.year).includes(2014)
                ? "Currently holds a significant position in the Parliament."
                : "Does not currently hold a significant position in the Parliament."}
            </h2>
          </div>
          <div className="flex flex-col w-1/2 space-y-10">
            <div className="bg-white rounded-lg shadow-lg p-10 m-10">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Parlementary Seats Won Year-wise
              </h2>
              <Chart
                width={"500px"}
                height={"300px"}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={chartDataforpc}
                options={{
                  hAxis: {
                    title: "Year",
                  },
                  vAxis: {
                    title: "Seats",
                  },
                  colors: ["#a52714", "#097138"],
                }}
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-10 m-10">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Assembly Seats Participated Year-wise
              </h2>

              <Chart
                width={"500px"}
                height={"300px"}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={chartDataforac}
                options={{
                  hAxis: {
                    title: "Year",
                  },
                  vAxis: {
                    title: "Seats",
                  },
                  colors: ["#a52714", "#097138"],
                }}
              />
            </div>
          </div>
        </div>
        <div className="m-10">
          <WrappedTables partyname={partyname}></WrappedTables>
        </div>
      </div>
    </div>
  );
};

export default OverallAnalysis;
