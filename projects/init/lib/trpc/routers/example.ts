import { z } from 'zod';
import { router, publicProcedure } from '../server';

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  
  getServerTime: publicProcedure.query(() => {
    return {
      time: new Date().toISOString(),
    };
  }),
});




