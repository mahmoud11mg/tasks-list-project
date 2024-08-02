import prisma from "@/utils/db";
import StatusBage from "@/components/StatusBage";
import Link from "next/link";

import { notFound } from 'next/navigation'
import { deleteTask } from "@/utils/actions";

interface TaskDetailsPageProps {
    params: { id: string }
}

const TaskDetailsPage = async ({ params }: TaskDetailsPageProps) => {
    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id) },
    });
    if (!task) {
        notFound();
    }

    return (
        <section className="">
            <div className="flex items-center justify-between">
                <Link href={"/"} className="underline block mb-10">
                    {"<< "}Bake To Tasks Table
                </Link>
                <div className="flex items-center ">
                    <Link href={`/task/${task.id}/edit`} className="bg-green-700 hover:bg-green-600 transition-colors rounded-lg p-3 py-1 px-2 me-3 text-xl ">
                        Edit
                    </Link>

                    <form action={deleteTask} className="">
                        <input type="hidden" name="id" value={task.id} />
                        <button
                            type="submit"
                            className="bg-red-700 hover:bg-red-600 transition-colors rounded-lg p-3 py-1 px-2 text-xl">
                            Delete</button>
                    </form>
                </div>
            </div>

            <div className="mt-16 p-5 rounded-lg bg-gray-600">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold"> {task.title}</h2>
                    <StatusBage status={task.status} />
                </div>
                <small className="text-yellow-400" >
                    {new Date(task.createdAt).toDateString()}
                </small>
                <p className="mt-5 text-xl">{task.description}</p>

            </div>

        </section>
    )
}

export default TaskDetailsPage