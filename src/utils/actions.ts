"use server";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CreateTaskDto } from "./dtos";
//Creat Task
export async function createTask({ title, description }: CreateTaskDto) {
   if (typeof title !== "string" || title.length < 2) return;
   if (typeof description !== "string" || description.length < 4) return;

   try {
      await prisma.task.create({
         data: {
            title,
            description
         }

      });

      revalidatePath("/")
      redirect("/");
   }
   catch (error: any) {
      throw new Error("Could not Create The Task, please try again")
   }

}

// Delete Task

export async function deleteTask(formData: FormData) {
   const id = formData.get('id')?.toString();
   if (!id) return;
   try {
      await prisma.task.delete({ where: { id: parseInt(id) } });


   }
   catch (error: any) {
      throw new Error("Could not Delete The Task, please try again")
   }
   revalidatePath("/")
   redirect("/");
}