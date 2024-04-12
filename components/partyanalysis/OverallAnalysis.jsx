
const OverallAnalysis = ({partyname}) => {
  return (
    <div className="-ml-20 -mt-16  min-h-screen">
      
      <div className="bg-gray-100 p-10 rounded-lg shadow-md min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Party Name: {partyname}</h2>
      <h2 className="text-2xl font-bold mb-4">Party Votes Received: partyVotes</h2>
      <h2 className="text-2xl font-bold mb-4">Last Election Participation Year: lastElectionYear</h2>
      <h2 className="text-2xl font-bold mb-4">Present in Number of States: numberOfStates</h2>
      <h2 className="text-2xl font-bold mb-4">Won Assembly Election in States: assemblyElectionStates.join</h2>
      <h2 className="text-2xl font-bold mb-4">Opposition Party in States: oppositionStatus.join</h2>
    </div>
    </div>
  )
}

export default OverallAnalysis