import Link from "next/link"
import prisma from "@/utils/db";
import StatusBage from "@/components/StatusBage";



const HomePage = async  ()   => {
  const task = await prisma.task.findMany();

  return (
    <section className='text-2xl'>
      <h1 className='text-4xl font-semibold'> HomePage </h1>
      <div className='flex items-center justify-end mb-20'>
         <Link href={"/task/add"} 
         className='bg-cyan-300 hover:bg-cyan-500 text-black font-semibold text-xl rounded-md p-2 transition-colors'>Add Task</Link></div>
      
      <table className="table w-full text-left mt-5">
        <thead className=" border-t-2 border-b-2 border-gray-300 text-xl">
          <th className="p-3">#</th>
          <th className="">Task Title</th>
          <th className="">Task Status</th>
          <th className="">Task Details</th>
        </thead>
        <tbody>
          {task.map((task,index) =>(
            <tr key={task.id} className="border-b border-gray-500">
              <td className="p-3">{index + 1}</td>
              <td>{task.title}</td>
              <td> <StatusBage status={task.status}/> </td>
              <td><Link href={`/task/${task.id}`} className="bg-blue-600 hover:bg-blue-800  transition-colors text-white rounded-md p-1">Details</Link></td>
              

            </tr>


          ))}

        </tbody>

      </table>
    
    </section>
  )
}

export default HomePage