"use server";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CreateTaskDto } from "./dtos";
import { Status } from "@prisma/client";
//Creat Task

export async function createTask({ title, description }: CreateTaskDto) {
   if (!title || title.length < 2) {
      throw new Error("Invalid title");
   }
   if (!description || description.length < 4) {
      throw new Error("Invalid description");
   }

   try {
      await prisma.$connect();
      console.log("Database connected successfully");
   
      await prisma.task.create({
         data: {
            title,
            description,
         },
      });
   
      // Comment these lines temporarily to check if they are causing the issue
      // revalidatePath("/");
      // redirect("/");
   } catch (error: any) {
      console.error("Error creating task:", error.message, error.stack);
      throw new Error("Could not Create The Task, please try again");
   }
   
   
   
   // revalidatePath("/");
   // redirect("/");
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
   // revalidatePath("/")
   redirect("/");
}

// Update Task

export async function updateTask(formData: FormData) {
   const id = formData.get('id')?.toString();
   const title = formData.get('title')?.toString();
   const description = formData.get('description')?.toString();
   const status = formData.get('status') as Status;
   if (typeof id !== "string") return;
   if (typeof title !== "string" || title.length < 2) return;
   if (typeof description !== "string" || description.length < 4) return;
   if (!status) return;

   try {
      await prisma.task.update({
         where: { id: parseInt(id) },
         data: { title, description, status }
      });

   }
   catch (error) {
      throw new Error("Could not Update The Task, please try again")
   }
   // revalidatePath("/")
   revalidatePath(`/task/${id}`)
   redirect(`/task/${id}`);
}