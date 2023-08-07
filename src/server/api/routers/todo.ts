import { z } from "zod";
import { db } from "~/db";
import { todos } from "~/db/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  submitTodo: publicProcedure
    .input(z.object({ text: z.string().min(5) }))
    .mutation(async ({ input }) => {
      const newTodo = await db.insert(todos).values({
        text: input.text,
        completed: false
      }).returning()

      console.log(newTodo)
    }),

    getTodos: publicProcedure.query(async () => {
      return await db.select().from(todos)
    })
});
