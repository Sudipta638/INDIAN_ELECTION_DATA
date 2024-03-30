"use client";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
const PartyView = () => {
    const[parties,setParties]= useState([])
    const[selectedparty,setselectedparty]= useState("")
    const[acwons,setacwons] = useState([])
    const[pcwons,setpcwons] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/api/partynames")
          .then((response) => response.json())
          .then((data) => {
            const sortedData = data.sort((a, b) => a.partyname.localeCompare(b.partyname));
            setParties(sortedData);
          })
          .catch((error) => console.error("Error:", error));
      }, []);

      const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8000/api/ac_won_by_party_yearwise/${selectedparty}`),
      fetch(`http://localhost:8000/api/pc_won_by_party_yearwise/${selectedparty}`)
    ])
      .then(async([acRes, pcRes]) => {
        const acData = await acRes.json();
        const pcData = await pcRes.json();

        const years = [...new Set(acData.map(item => item.year.toString()).concat(pcData.map(item => item.year.toString())))].sort();

        const formattedData = [
          ['Year', 'AC Seats Won', 'PC Seats Won'],
          ...years.map(year => [
            year, 
            (acData.find(item => item.year.toString() === year) || {}).ac_won || 0,
            (pcData.find(item => item.year.toString() === year) || {}).pc_won || 0
          ])
        ];
        setChartData(formattedData);
      })
      .catch(error => console.error('Error:', error));
  }, [selectedparty]);
  const options = {
    title: 'Seats Won by Party per Year',
    vAxis: { title: 'Seats Won' },
    hAxis: { title: 'Year' },
  };


      console.log(acwons);
      console.log(pcwons);
  return (
    <div>
          <div className="max-w-[600px] flex items-center justify-between ml-48 mt-6">
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
          className="mt-1 block w-[400px] pl-3 pr-10 py-3 text-2xl border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl rounded-md"
        >
          {parties.map((party) => (
            <option key={party.partyname} value={party.partyname}>
              {party.partyname}
            </option>
          ))}
        </select>
      </div>
      <div className=" ml-12 mt-12">
      <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
        </div>
      
    </div>
  )
}

export default PartyView