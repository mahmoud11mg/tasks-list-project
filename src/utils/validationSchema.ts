import { z } from 'zod'

// Create Task Schema
export const createTaskSchema = z.object({
    title: z.string({
        required_error: "Title Is Required",
        invalid_type_error: "Title Should Be Of Type String",
    }).min(2, { message: "Title Should Be At Least 2 Characters Long" }).max(200, { message: "Title Should Be Less Than 200 Characters" }),

    description: z.string({
        required_error: "Description Is Required",
        invalid_type_error: "Description Should Be Of Type String",
    }).min(4, { message: "Description Should Be At Least 4 Characters Long" }),
})