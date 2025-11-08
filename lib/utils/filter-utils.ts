import type { Task, TaskStatus, TaskPriority } from '@/lib/types/project-management';

/**
 * Filter tasks by status
 */
export function filterTasksByStatus(tasks: Task[], statuses: TaskStatus[]): Task[] {
  if (statuses.length === 0) return tasks;
  
  return tasks.filter((task) => {
    // Check main task status
    const matches = statuses.includes(task.status);
    
    // If task matches, include it (and optionally filter subtasks)
    if (matches) {
      // Recursively filter subtasks if they exist
      if (task.subtasks && task.subtasks.length > 0) {
        return {
          ...task,
          subtasks: filterTasksByStatus(task.subtasks, statuses),
        };
      }
      return true;
    }
    
    // If task doesn't match but has subtasks that might match, include it
    if (task.subtasks && task.subtasks.length > 0) {
      const filteredSubtasks = filterTasksByStatus(task.subtasks, statuses);
      if (filteredSubtasks.length > 0) {
        return {
          ...task,
          subtasks: filteredSubtasks,
        };
      }
    }
    
    return false;
  });
}

/**
 * Filter tasks by priority
 */
export function filterTasksByPriority(tasks: Task[], priorities: TaskPriority[]): Task[] {
  if (priorities.length === 0) return tasks;
  
  return tasks.filter((task) => {
    const matches = priorities.includes(task.priority);
    
    if (matches) {
      if (task.subtasks && task.subtasks.length > 0) {
        return {
          ...task,
          subtasks: filterTasksByPriority(task.subtasks, priorities),
        };
      }
      return true;
    }
    
    if (task.subtasks && task.subtasks.length > 0) {
      const filteredSubtasks = filterTasksByPriority(task.subtasks, priorities);
      if (filteredSubtasks.length > 0) {
        return {
          ...task,
          subtasks: filteredSubtasks,
        };
      }
    }
    
    return false;
  });
}

/**
 * Status priority order for sorting
 */
const statusPriority: Record<TaskStatus, number> = {
  blocked: 0,
  pending: 1,
  in_progress: 2,
  completed: 3,
};

/**
 * Priority order for sorting
 */
const priorityOrder: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * Sort tasks by completion status (incomplete first)
 */
export function sortByCompletion(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    // Incomplete tasks come first
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    
    // Then sort by status priority
    const aPriority = statusPriority[a.status as TaskStatus] ?? 0;
    const bPriority = statusPriority[b.status as TaskStatus] ?? 0;
    return aPriority - bPriority;
  });
}

/**
 * Sort tasks by priority (high > medium > low)
 */
export function sortByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const aPriority = priorityOrder[a.priority as TaskPriority] ?? 0;
    const bPriority = priorityOrder[b.priority as TaskPriority] ?? 0;
    return bPriority - aPriority;
  });
}

/**
 * Sort tasks by ID (natural order)
 */
export function sortById(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const aParts = a.id.split('.').map(Number);
    const bParts = b.id.split('.').map(Number);
    
    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aVal = aParts[i] ?? 0;
      const bVal = bParts[i] ?? 0;
      
      if (aVal !== bVal) {
        return aVal - bVal;
      }
    }
    
    return 0;
  });
}

/**
 * Sort tasks by status
 */
export function sortByStatus(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const aPriority = statusPriority[a.status as TaskStatus] ?? 0;
    const bPriority = statusPriority[b.status as TaskStatus] ?? 0;
    return aPriority - bPriority;
  });
}

/**
 * Combined filter and sort function
 */
export function filterAndSortTasks(
  tasks: Task[],
  options: {
    statuses?: TaskStatus[];
    priorities?: TaskPriority[];
    sortBy?: 'completion' | 'priority' | 'status' | 'id';
    showCompleted?: boolean;
  }
): Task[] {
  let result = [...tasks];
  
  // Apply status filter
  if (options.statuses && options.statuses.length > 0) {
    result = filterTasksByStatus(result, options.statuses);
  }
  
  // Apply priority filter
  if (options.priorities && options.priorities.length > 0) {
    result = filterTasksByPriority(result, options.priorities);
  }
  
  // Filter out completed if needed
  if (options.showCompleted === false) {
    result = result.filter((task) => task.status !== 'completed');
  }
  
  // Apply sorting
  switch (options.sortBy) {
    case 'completion':
      result = sortByCompletion(result);
      break;
    case 'priority':
      result = sortByPriority(result);
      break;
    case 'status':
      result = sortByStatus(result);
      break;
    case 'id':
      result = sortById(result);
      break;
    default:
      // Default: incomplete first
      result = sortByCompletion(result);
  }
  
  return result;
}

