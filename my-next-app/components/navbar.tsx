import Link from "next/link"

const Navbar = () => {
  return (
    <nav>
          <ul className="flex justify-center gap-10 p-5 items-center">
            <li><Link href="./">Home</Link></li> 
            <li><Link href="./Jobs">Jobs</Link></li>
            <li><Link href="./about">About</Link></li>
          </ul>
     </nav>
  )
}
export default Navbar
