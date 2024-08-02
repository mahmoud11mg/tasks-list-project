import { updateTask } from "@/utils/actions";
import prisma from "@/utils/db";
import Link from "next/link";
import { notFound } from 'next/navigation'
 interface EditTastPageProps{
    params: {id :string}

 }

const EditTastPage = async ({params}:EditTastPageProps) => {
    const task = await prisma.task.findUnique({
      where: { id:parseInt( params.id),  },

    });
    if (!task) notFound();

  return (
    <section className="">
        <Link href={`/task/${task.id}`} className="underline block mb-10" >
        {"<<"} Back To Task Details
        </Link>
        <div className="w-2/3 mx-auto p-5 bg-slate-800 border-2 border-gray-300 ">
        <h2 className="mb-7 font-bold text-3xl">Edit Your Task</h2>
        <form action={updateTask} className="flex flex-col gap-6">
        <input type="hidden" name="id" value={task.id} />
            <input type="text"
             name="title"
             defaultValue={task.title}
            className="text-xl p-2 text-gray-950 rounded-md "

             />
             <select name="status" defaultValue={task.status} className="text-xl p-2 text-gray-950 rounded-md " >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IIN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
             </select>

            <textarea 
            rows={5}
             name="description"
             defaultValue={task.description} 
             className="text-xl p-2 text-gray-950 rounded-md resize-none"
            ></textarea>
            <button type="submit" className="bg-cyan-700 hover:bg-cyan-500 transition-colors rounded-lg p-2 text-black font-semibold "> Edit</button>

        </form>
        </div>
        
    </section>
  )
}

export default EditTastPage
