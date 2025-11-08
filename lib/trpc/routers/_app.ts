import { router } from '../server';
import { exampleRouter } from './example';
import { projectsRouter } from './projects';
import { documentationRouter } from './documentation';

export const appRouter = router({
  example: exampleRouter,
  projects: projectsRouter,
  documentation: documentationRouter,
});

export type AppRouter = typeof appRouter;

