import Main from "@/components/partyanalysis/Main";
import Link from "next/link";

const page = () => {
  const buttons = [
    "Overall Analysis",
    "Assembly Election Analysis",
    "Parliamentary Analysis",
    "Yearwise Analysis",
    "Statewise Analysis",
    "Compare Two Parties",
  ];
  return (
    <div className="ml-[500px] mt-20 mr-20 min-h-screen">
   <Main/>
    </div>
  );
};

export default page;
