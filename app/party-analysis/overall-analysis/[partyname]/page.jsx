import OverallAnalysis from "@/components/partyanalysis/OverallAnalysis"

const page = ({params}) => {
  return (
    <div className="ml-[500px] mt-20 mr-20 min-h-screen">
      <OverallAnalysis partyname={params.partyname} />
       {params.partyname}
        </div>
  )
}

export default page