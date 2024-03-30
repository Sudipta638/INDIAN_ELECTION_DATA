import Image from "next/image"

const NavComponent = ({icon ,label}) => {
  return (
    <div className="flex flex-col items-center">
    <Image src={icon} alt={label} width={24} height={24} />
    <span className="mt-2">{label}</span>
  </div>
  )
}

export default NavComponent