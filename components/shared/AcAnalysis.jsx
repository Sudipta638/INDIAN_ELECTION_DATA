"use client";
import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaSearch, FaArrowRight } from "react-icons/fa";
import { Chart } from "react-google-charts";
import Tables from "./TablesAc";



const PcAnalysis = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedPc, setSelectedPc] = useState("");
  const [pcNames, setPcNames] = useState([]);
  const [states, setStates] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [avgvotepercentageinpc, setAvgvotepercentageinpc] = useState(0);
  const [votepercentage, setvopercentage] = useState([]);
  const [latestyaer, setlatestyear] = useState(0);
  const [latestvote, setlatestvote] = useState(0);
  const [avgmalefemaleratio, setavgmalefemaleratio] = useState(0);
  const [malefemaleratio, setmalefemaleratio] = useState([]);
  const [chartData1, setChartData1] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [latesfemaletomaleratio, setlatestfemaletomaleratio] = useState(0);
  const [currentmls, setcurrentcurrentmla] = useState("");
  const [currentparty, setcurrentparty] = useState("");
  const [currenttotalvotepoll, setcurrenttotalvotepoll] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [issearching, setIssearching] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/states")
      .then((response) => response.json())
      .then((data) => setStates(data));
    if (selectedState) {
      fetch(`http://localhost:8000/api/UniqueAcNames/${selectedState}`)
        .then((response) => response.json())
        .then((data) =>{console.log("dadasd");console.log(data); setPcNames(data)});
    }
  }, [selectedState]);

  useEffect(() => {
    if (!selectedState || !selectedPc) return;
    setIsLoading(true);
    fetch(
      `http://localhost:8000/api/winner_latest_yearinpc/${selectedState}/${selectedPc}`
    )
      .then((response) => response.json())
      .then((data) => {
        setcurrentcurrentmla(data[0].cand_name);
        setcurrentparty(data[0].partyname);
        setcurrenttotalvotepoll(data[0].totvotpoll);
      })
      .catch((error) => console.error("Error:", error));

    fetch(
      `http://localhost:8000/api/VotePercentageinApcACyearwise/${selectedState}/${selectedPc}`
    )
      .then((response) => response.json())
      .then((data) => {
        setvopercentage(data);
        setlatestyear(data[data.length - 1].year);
        setlatestvote(data[data.length - 1].vote_percentage);

        const avgVotePercentage =
          data.reduce((acc, item) => acc + item.vote_percentage, 0) /
          data.length;

        setAvgvotepercentageinpc(avgVotePercentage);
        const formattedData = [
          ["Year", "Vote Percentage"],
          ...data.map((item) => [item.year.toString(), item.vote_percentage]),
        ];
        setChartData(formattedData);
      })
      .catch((error) => console.error("Error:", error));

    fetch(
      `http://localhost:8000/api/FemaleandMaleRationinApcACyearwise/${selectedState}/${selectedPc}`
    )
      .then((response) => response.json())
      .then((data) => {
        setmalefemaleratio(data);
        // setlatestyear(data[data.length - 1].year);
        setlatestfemaletomaleratio(data[data.length - 1].female_to_male_ratio);
        const avgmalefemaleratio =
          data.reduce((acc, item) => acc + item.female_to_male_ratio, 0) /
          data.length;
        setAvgvotepercentageinpc(avgmalefemaleratio);
        const formattedData = [
          ["Year", "Male Female Ratio"],
          ...data.map((item) => [
            item.year.toString(),
            item.female_to_male_ratio,
          ]),
        ];
        setChartData1(formattedData);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));

    fetch(
      `http://localhost:8000/api/vote_percentage_latest_year/${selectedState}/${selectedPc}`
    )
      .then((response) => response.json())
      .then((data) => {
        //    setlatestvote(data[0].vote_percentage);
        // console.log(data[0]);
      })
      .catch((error) => console.error("Error:", error));

    fetch(
      `http://localhost:8000/api/latest_yearinpc/${selectedState}/${selectedPc}`
    )
      .then((response) => response.json())
      .then((data) => {
        // setlatestyear(data);
        // console.log(data[0]);
      })
      .catch((error) => console.error("Error:", error));

    fetch(
      `http://localhost:8000/api/AvgVotePerCentangeinApcPCyearwise/${selectedState}/${selectedPc}`
    )
      .then((response) => response.json())
      .then((data) => {
        //  setAvgvotepercentageinpc(data[0]);
      })
      .catch((error) => console.error("Error:", error));

    fetch(
      `http://localhost:8000/api/TotalVotepollbyaCandidateinaac/${selectedState}/${selectedPc}`
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
        setChartData2(formattedData);
        console.log(formattedData);
      })
      .catch((error) => console.error("Error:", error));

    setIsLoading(false);
  }, [selectedPc, selectedState]);

  const handleAnalysis = () => {
    setIssearching(true);
  };


  const handleAnalysisAnotherpc = () => {
    setIssearching(false);
    setSelectedPc("");
    setSelectedState("");
  };
  const isVotePercentageAboveAverage =
    latestvote >
    votepercentage.reduce((acc, item) => acc + item.vote_percentage, 0) /
      votepercentage.length;
  const isMaleFemaleRatioAboveAverage =
    latesfemaletomaleratio >
    malefemaleratio.reduce((acc, item) => acc + item.female_to_male_ratio, 0) /
      malefemaleratio.length;
  console.log(votepercentage);
  console.log(latestvote);
  console.log(latestyaer);
  console.log(avgvotepercentageinpc);
  console.log(selectedPc);
  console.log(selectedState);
  console.log
  return (
    <div className="max-w-full ">
      {isLoading ? (
        <FaSearch className="animate-spin" />
      ) : (
        <div>
          {!issearching && (
            <div>
          <div className={issearching?"hidden":`flex justify-between items-center -mt-16  ml-[300px]`}>
            <div className=" px-12 flex items-center justify-between h-12 ml-16">
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
            <div className="w-[500px] flex items-center  mr-[300px]">
              <label className="mr-4 w-[170px] text-2xl">AC Name:</label>
              <select
                value={selectedPc}
                onChange={(e) => setSelectedPc(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-2xl border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl rounded-md"
                disabled={!selectedState}
              >
                <option value="">Select an AC name</option>
                {pcNames.map((pcName, index) => (
                  <option key={index} value={pcName.ac_name}>
                    {pcName.ac_name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleAnalysis} className="flex items-center bg-green-500 text-white rounded-md px-6 py-2 mt-4 hover:bg-green-700 transition duration-200 text-lg ">
  Analyze PC
  <FaArrowRight />
</button>
          </div>
         
          </div>
         ) }
          {issearching && (
            <div>
              <div className="flex w-[1800px] ml-48 -mr-44 -mt-32">
                <div className="w-1/2 ml-8 h-10 mt-10">
                  <div className="mb-4 m-5">
                    <h2 className="text-2xl font-bold text-gray-400 font-serif">
                      MLA in Power:{" "}
                      <span className="font-bold text-gray-700 px-2">
                        {currentmls}
                      </span>
                    </h2>
                    <h2 className="text-2xl font-bold  text-gray-400 font-serif">
                      Party:{" "}
                      <span className="font-bold text-gray-700">
                        {currentparty}
                      </span>
                    </h2>
                    <h2 className="text-2xl font-bold  text-gray-400 font-serif">
                      Constituency:{" "}
                      <span className="font-bold text-gray-700">
                        {selectedPc}
                      </span>
                    </h2>
                    <h2 className="text-2xl font-bold  text-gray-400 font-serif">
                      Total Votes Polled:{" "}
                      <span className="font-bold text-gray-700">
                        {currenttotalvotepoll}
                      </span>
                    </h2>
                  </div>
                  <div
                    className={`p-8 border border-gray-200 rounded-2xl shadow-lg ${
                      isVotePercentageAboveAverage
                        ? "bg-gradient-to-r from-green-200 via-green-400 to-green-600 text-gray-800"
                        : "bg-gradient-to-r from-red-200 via-red-400 to-red-600 text-gray-800"
                    }`}
                  >
                    <h2 className="text-2xl mb-4 font-bold">
                      Latest Vote Percentage:{" "}
                      <h className="text-4xl">
                        {Math.abs(latestvote).toFixed(2)}%
                      </h>
                    </h2>

                    <p className="text-xl mb-4 font-medium flex">
                      {isVotePercentageAboveAverage ? (
                        <FaArrowUp size={40} />
                      ) : (
                        <FaArrowDown size={40} />
                      )}{" "}
                      <h className="text-4xl">
                        {}
                        {Math.abs(
                          latestvote -
                            votepercentage.reduce(
                              (acc, item) => acc + item.vote_percentage,
                              0
                            ) /
                              votepercentage.length
                        ).toFixed(2)}
                        %
                      </h>
                      <p className="mt-2">
                        {" "}
                        compared to the average vote percentage
                      </p>
                    </p>
                    <div className="flex flex-col items-center">
                      <Chart
                        width={"100%"}
                        height={"300px"}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={chartData}
                        options={{
                          hAxis: {
                            gridlines: {
                              count: 0,
                            },
                          },
                          vAxis: {
                            gridlines: {
                              count: 0,
                            },
                          },
                          backgroundColor: "transparent",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={`p-8 border border-gray-200 rounded-2xl shadow-lg mt-4 ${
                      isMaleFemaleRatioAboveAverage
                        ? "bg-gradient-to-r from-green-200 via-green-400 to-green-600 text-gray-800"
                        : "bg-gradient-to-r from-red-200 via-red-400 to-red-600 text-gray-800"
                    }`}
                  >
                    <h2 className="text-2xl mb-4 font-bold">
                      Latest Female to Male Candidate Ratio:{" "}
                      <h className="text-4xl">
                        {Math.abs(latesfemaletomaleratio).toFixed(2)}%
                      </h>
                    </h2>

                    <p className="text-xl mb-4 font-medium flex">
                      {isMaleFemaleRatioAboveAverage ? (
                        <FaArrowUp size={40} />
                      ) : (
                        <FaArrowDown size={40} />
                      )}{" "}
                      <h className="text-4xl">
                        {Math.abs(
                          latesfemaletomaleratio -
                            malefemaleratio.reduce(
                              (acc, item) => acc + item.female_to_male_ratio,
                              0
                            ) /
                              malefemaleratio.length
                        ).toFixed(2)}
                        %
                      </h>
                      <p className="mt-2">
                        {" "}
                        compared to the average vote percentage
                      </p>
                    </p>
                    <div className="flex flex-col items-center">
                      <Chart
                        width={"100%"}
                        height={"300px"}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={chartData1}
                        options={{
                          hAxis: {
                            gridlines: {
                              count: 0,
                            },
                          },
                          vAxis: {
                            gridlines: {
                              count: 0,
                            },
                          },
                          backgroundColor: "transparent",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="p-4  shadow-lg m-16 mt-36">
                   <Tables selectedState={selectedState} selectedPc={selectedPc} />
                  </div>
                </div>
              </div>
              <div className="flex w-[1800px] ml-48 mt-20 -mr-44">
                <div className=" ml-20 h-10 mt-10">
                  <div
                    className={`p-8 border border-gray-200 rounded-2xl shadow-lg `}
                  >
                    <h2 className="text-2xl mb-4 font-bold">
                      Total Vote Poll by a Candidate in a PC
                    </h2>
                    <div className="flex flex-col items-center w-[1600px]">
                      <Chart
                        width={"100%"}
                        height={"500px"}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={chartData2}
                        options={{
                          hAxis: {
                            gridlines: {
                              count: 0,
                            },
                          },
                          vAxis: {
                            gridlines: {
                              count: 0,
                            },
                          },
                          // backgroundColor: "transparent",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={handleAnalysisAnotherpc} className="fixed bottom-4 right-4 flex items-center border-blue-500 border-2 bg-white text-gray-500 rounded-lg px-8 py-6 hover:bg-white transition duration-200 text-lg">
  Analyze another PC
  <FaArrowRight />
</button>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
};

export default PcAnalysis;
