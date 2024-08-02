import Link from "next/link"
import AddTaskForm from "@/components/AddTaskForm";
const AddTaskPage = () => {
  return (
    <section className="">
      <Link href={"/"} className="underline block mb-10">
        {"<< "}Bake To Tasks Table
      </Link>
      <div className="w-2/3 mx-auto rounded-md p-5 bg-slate-800 border-2 border-gray-300 ">
        <h2 className="mb-7 font-bold text-3xl">Add Your Task</h2>
        <AddTaskForm />
      </div>
    </section>
  )
}
export default AddTaskPage