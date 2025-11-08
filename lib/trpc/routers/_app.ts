import { router } from '../server';
import { exampleRouter } from './example';
import { projectsRouter } from './projects';

export const appRouter = router({
  example: exampleRouter,
  projects: projectsRouter,
});

export type AppRouter = typeof appRouter;

