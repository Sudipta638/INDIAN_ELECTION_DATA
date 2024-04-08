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
      <div className="grid grid-cols-3 gap-4  pl-48 items-center justify-center">
        {buttons.map((button) => (
          <Link
            key={button}
            href={`/party-analysis/${button.replace(/\s+/g, "-").toLowerCase()}`}
            className="bg-gray-500 text-white flex items-center justify-center rounded-lg shadow-md px-4 py-2 m-10 w-60 h-40 hover:bg-gray-700 transition duration-200 text-center "
          >
            {" "}
            {button}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
