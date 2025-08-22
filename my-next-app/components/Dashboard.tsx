import { Job } from "@/types"

const Dashboard = ({name}: {name: Job}) => {
  return (
    <section>
        <div className="my-5 w-full">
            <h1 className="text-2xl ml-60">Welcome, <span className="text-red-500">{name.name}</span>!</h1>
        </div>
    </section>
  )
}
export default Dashboard
