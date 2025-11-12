import { z } from 'zod';
import { router, publicProcedure } from '../server';
import { promises as fs } from 'fs';
import { join } from 'path';
import { ProjectTaskFileSchema, ProjectInfoSchema } from '@/lib/types/project-management';

const PROJECTS_DIR = join(process.cwd(), 'projects');

/**
 * Check if a directory exists
 */
async function directoryExists(path: string): Promise<boolean> {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Check if a file exists
 */
async function fileExists(path: string): Promise<boolean> {
  try {
    const stat = await fs.stat(path);
    return stat.isFile();
  } catch {
    return false;
  }
}

/**
 * List all projects in the projects directory
 */
export const projectsRouter = router({
  listProjects: publicProcedure.query(async () => {
    try {
      if (!(await directoryExists(PROJECTS_DIR))) {
        return [];
      }

      const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
      const projects: z.infer<typeof ProjectInfoSchema>[] = [];

      for (const entry of entries) {
        // Skip template-project and README.md
        if (entry.name === 'template-project' || entry.name === 'README.md') {
          continue;
        }

        // Only process directories
        if (!entry.isDirectory()) {
          continue;
        }

        const projectPath = join(PROJECTS_DIR, entry.name);
        const tasksPath = join(projectPath, 'tasks');
        const prdPath = join(projectPath, 'PRD.txt');
        const plansPath = join(projectPath, 'plans');

        // Check for task files
        let taskFiles: string[] = [];
        let hasTaskFiles = false;
        if (await directoryExists(tasksPath)) {
          const taskEntries = await fs.readdir(tasksPath);
          taskFiles = taskEntries.filter((file) => file.endsWith('.json'));
          hasTaskFiles = taskFiles.length > 0;
        }

        // Check for PRD
        const hasPRD = await fileExists(prdPath);

        // Check for plans directory
        const hasPlans = await directoryExists(plansPath);

        projects.push({
          name: entry.name,
          taskFiles,
          hasTaskFiles,
          hasPRD,
          hasPlans,
        });
      }

      return projects;
    } catch (error) {
      console.error('Error listing projects:', error);
      throw new Error('Failed to list projects');
    }
  }),

  getProjectTasks: publicProcedure
    .input(z.object({ projectName: z.string() }))
    .query(async ({ input }) => {
      try {
        const projectPath = join(PROJECTS_DIR, input.projectName);
        const tasksPath = join(projectPath, 'tasks');

        if (!(await directoryExists(tasksPath))) {
          return {
            name: input.projectName,
            taskFiles: [],
            hasPRD: await fileExists(join(projectPath, 'PRD.txt')),
            hasPlans: await directoryExists(join(projectPath, 'plans')),
          };
        }

        const taskEntries = await fs.readdir(tasksPath);
        const taskFiles = taskEntries.filter((file) => file.endsWith('.json'));

        const parsedTaskFiles: Array<{
          filename: string;
          data: z.infer<typeof ProjectTaskFileSchema>;
        }> = [];

        for (const filename of taskFiles) {
          try {
            const filePath = join(tasksPath, filename);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const parsed = JSON.parse(fileContent);
            
            // Validate against schema
            const validated = ProjectTaskFileSchema.parse(parsed);
            
            parsedTaskFiles.push({
              filename,
              data: validated,
            });
          } catch (error) {
            console.error(`Error parsing task file ${filename}:`, error);
            // Skip invalid files but continue processing others
          }
        }

        return {
          name: input.projectName,
          taskFiles: parsedTaskFiles,
          hasPRD: await fileExists(join(projectPath, 'PRD.txt')),
          hasPlans: await directoryExists(join(projectPath, 'plans')),
        };
      } catch (error) {
        console.error('Error getting project tasks:', error);
        throw new Error(`Failed to get tasks for project: ${input.projectName}`);
      }
    }),

  getProjectMetadata: publicProcedure
    .input(z.object({ projectName: z.string() }))
    .query(async ({ input }) => {
      try {
        const projectPath = join(PROJECTS_DIR, input.projectName);
        const prdPath = join(projectPath, 'PRD.txt');
        const plansPath = join(projectPath, 'plans');

        let prdContent: string | null = null;
        if (await fileExists(prdPath)) {
          prdContent = await fs.readFile(prdPath, 'utf-8');
        }

        let planFiles: string[] = [];
        if (await directoryExists(plansPath)) {
          const planEntries = await fs.readdir(plansPath);
          planFiles = planEntries.filter((file) => file.endsWith('.md') || file.endsWith('.txt'));
        }

        return {
          name: input.projectName,
          prd: prdContent,
          planFiles,
        };
      } catch (error) {
        console.error('Error getting project metadata:', error);
        throw new Error(`Failed to get metadata for project: ${input.projectName}`);
      }
    }),
});



