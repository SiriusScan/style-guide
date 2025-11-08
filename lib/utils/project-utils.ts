import type { Task, ProjectProgress, DependencyStatus } from '@/lib/types/project-management';

/**
 * Recursively flatten all tasks including subtasks
 */
export function flattenTasks(tasks: Task[]): Task[] {
  const result: Task[] = [];
  
  for (const task of tasks) {
    result.push(task);
    if (task.subtasks && task.subtasks.length > 0) {
      result.push(...flattenTasks(task.subtasks));
    }
  }
  
  return result;
}

/**
 * Find a task by ID recursively (including subtasks)
 */
export function findTaskById(tasks: Task[], id: string): Task | null {
  for (const task of tasks) {
    if (task.id === id) {
      return task;
    }
    if (task.subtasks && task.subtasks.length > 0) {
      const found = findTaskById(task.subtasks, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

/**
 * Calculate project progress from tasks
 */
export function calculateProjectProgress(tasks: Task[]): ProjectProgress {
  const allTasks = flattenTasks(tasks);
  const total = allTasks.length;
  
  const completed = allTasks.filter((t) => t.status === 'completed').length;
  const inProgress = allTasks.filter((t) => t.status === 'in_progress').length;
  const pending = allTasks.filter((t) => t.status === 'pending').length;
  const blocked = allTasks.filter((t) => t.status === 'blocked').length;
  
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    total,
    completed,
    inProgress,
    pending,
    blocked,
    percentage,
  };
}

/**
 * Get dependency status for a task
 */
export function getTaskDependencyStatus(
  task: Task,
  allTasks: Task[]
): DependencyStatus[] {
  return task.dependencies.map((depId: string) => {
    const depTask = findTaskById(allTasks, depId);
    return {
      id: depId,
      title: depTask?.title || `Task ${depId} (not found)`,
      status: depTask?.status || 'pending',
      completed: depTask?.status === 'completed',
    };
  });
}

/**
 * Check if a task can be started (all dependencies completed)
 */
export function canStartTask(task: Task, allTasks: Task[]): boolean {
  if (task.dependencies.length === 0) {
    return true;
  }
  
  const depStatuses = getTaskDependencyStatus(task, allTasks);
  return depStatuses.every((dep) => dep.completed);
}

