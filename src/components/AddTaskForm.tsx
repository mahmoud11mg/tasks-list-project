"use client"

import { createTask } from "@/utils/actions"
import { CreateTaskDto } from "@/utils/dtos"
import { createTaskSchema } from "@/utils/validationSchema"
import { toast } from "react-toastify"



const AddTaskForm = () => {
    const clientAction = async (formData: FormData) => {
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
     
        console.log("Form data:", { title, description });
     
        const validation = createTaskSchema.safeParse({ title, description });
        if (!validation.success) {
           return toast.error(validation.error.errors[0].message, { autoClose: 1000 });
        }
     
        try {
           console.log("Creating task...");
           await createTask({ title, description } as CreateTaskDto);
           console.log("Task created successfully");
           toast.success("Task created successfully!", { autoClose: 1000 });
        } catch (error: any) {
           console.error("Error in client action:", error.message, error.stack);
           toast.error(error.message || "Failed to create task", { autoClose: 1000 });
        }
     }
     

    return (
        <form action={clientAction} className="flex flex-col gap-6">
            <input type="text"
                name="title"
                placeholder="Task Title"
                className="p-2 text-xl rounded-md text-gray-950"
            />
            <textarea
                name="description"
                placeholder="Task Description"
                rows={5}
                className="p-2 text-xl rounded-md text-gray-950 resize-none"></textarea>

            <button type="submit"
                className="bg-cyan-300 hover:bg-cyan-500 text-black font-semibold text-xl rounded-md p-3 transition-colors">
                Add Task</button>

        </form>

    )
}

export default AddTaskForm