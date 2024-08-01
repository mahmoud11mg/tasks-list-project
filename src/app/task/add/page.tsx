import Link from "next/link"
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Server Action
async function createTask ( formData: FormData){
    "use server";
   const title = formData.get("title")?.toString();
   const description =  formData.get("description")?.toString();
   if(!title || !description) return console.log("Required");
 await prisma.task.create({
    data: {
     title,
     description
    }
 
 });

 revalidatePath("/")
 redirect("/");
}

const AddTaskPage = () => {
  return (
    <section className="">
        <Link href={"/"}  className="underline block mb-10">
        {"<< "}Bake To Tasks Table
        </Link>
        <div className="w-2/3 mx-auto rounded-md p-5 bg-slate-800 border-2 border-gray-300 ">
        <h2 className="mb-7 font-bold text-3xl">Add Your Task</h2>

        <form action={createTask}  className="flex flex-col gap-6">
         <input type="text" 
          name="title" 
          placeholder="Task Title"
          className="p-2 text-xl rounded-md text-gray-950"           
          />
        <textarea
        name="description" 
        placeholder="Task Description"
        rows={5}
        className="p-2 text-xl rounded-md text-gray-950 resize-none"
        ></textarea>
          
          <button type="submit" className="bg-cyan-300 hover:bg-cyan-500 text-black font-semibold text-xl rounded-md p-3 transition-colors">Add Task</button>
        </form>

        </div>

  
        
    </section>
  )
}

export default AddTaskPage