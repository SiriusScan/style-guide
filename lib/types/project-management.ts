import { z } from 'zod';

// Task status enum
export const TaskStatusSchema = z.enum(['pending', 'in_progress', 'completed', 'blocked']);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

// Task priority enum
export const TaskPrioritySchema = z.enum(['low', 'medium', 'high']);
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;

// Task schema (recursive for subtasks)
export const TaskSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().regex(/^[0-9]+(\.[0-9]+)*$/),
    title: z.string(),
    description: z.string(),
    details: z.string().optional(),
    status: TaskStatusSchema,
    priority: TaskPrioritySchema,
    dependencies: z.array(z.string()),
    assignedTo: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    testStrategy: z.string().optional(),
    subtasks: z.array(TaskSchema).optional(),
  })
);

export type Task = z.infer<typeof TaskSchema>;

// Project metadata schema
export const ProjectMetadataSchema = z.object({
  name: z.string(),
  version: z.string(),
});

export type ProjectMetadata = z.infer<typeof ProjectMetadataSchema>;

// Project task file schema
export const ProjectTaskFileSchema = z.object({
  project: ProjectMetadataSchema,
  tasks: z.array(TaskSchema),
});

export type ProjectTaskFile = z.infer<typeof ProjectTaskFileSchema>;

// Project info schema
export const ProjectInfoSchema = z.object({
  name: z.string(),
  taskFiles: z.array(z.string()),
  hasTaskFiles: z.boolean(),
  hasPRD: z.boolean(),
  hasPlans: z.boolean(),
});

export type ProjectInfo = z.infer<typeof ProjectInfoSchema>;

// Project with tasks schema
export const ProjectWithTasksSchema = z.object({
  name: z.string(),
  taskFiles: z.array(
    z.object({
      filename: z.string(),
      data: ProjectTaskFileSchema,
    })
  ),
  hasPRD: z.boolean(),
  hasPlans: z.boolean(),
});

export type ProjectWithTasks = z.infer<typeof ProjectWithTasksSchema>;

// Progress calculation result
export interface ProjectProgress {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
  blocked: number;
  percentage: number;
}

// Dependency status
export interface DependencyStatus {
  id: string;
  title: string;
  status: TaskStatus;
  completed: boolean;
}

