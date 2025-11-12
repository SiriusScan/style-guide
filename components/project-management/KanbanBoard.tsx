'use client';

import { KanbanCard } from './KanbanCard';
import { StatusBadge } from './StatusBadge';
import type { Task, TaskStatus } from '@/lib/types/project-management';
import { calculateProjectProgress } from '@/lib/utils/project-utils';
import { cn } from '@/lib/utils';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

const columns: Array<{ status: TaskStatus; label: string; color: string }> = [
  { status: 'pending', label: 'Pending', color: 'border-gray-500/50 bg-gray-900/30' },
  { status: 'in_progress', label: 'In Progress', color: 'border-blue-500/50 bg-blue-900/20' },
  { status: 'completed', label: 'Completed', color: 'border-green-500/50 bg-green-900/20' },
  { status: 'blocked', label: 'Blocked', color: 'border-red-500/50 bg-red-900/20' },
];

export function KanbanBoard({ tasks, onTaskClick }: KanbanBoardProps) {
  // Group tasks by status
  const tasksByStatus = columns.reduce(
    (acc, column) => {
      acc[column.status] = tasks.filter((task) => task.status === column.status);
      return acc;
    },
    {} as Record<TaskStatus, Task[]>
  );

  // Calculate totals for each column
  const columnTotals = columns.reduce(
    (acc, column) => {
      acc[column.status] = tasksByStatus[column.status].length;
      return acc;
    },
    {} as Record<TaskStatus, number>
  );

  return (
    <div className="kanban-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full overflow-y-auto pb-4">
      {columns.map((column) => {
        const columnTasks = tasksByStatus[column.status];
        const total = columnTotals[column.status];

        return (
          <div
            key={column.status}
            className={cn(
              'flex flex-col rounded-lg border-2 p-4 min-h-[200px]',
              column.color
            )}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-violet-500/30">
              <div className="flex items-center gap-2">
                <StatusBadge status={column.status} />
                <span className="text-sm font-semibold text-white">{column.label}</span>
              </div>
              <span className="text-xs text-violet-400 bg-violet-950/50 px-2 py-1 rounded">
                {total}
              </span>
            </div>

            {/* Tasks */}
            <div className="flex-1 space-y-2 overflow-y-auto">
              {columnTasks.length === 0 ? (
                <div className="text-center text-violet-400/50 text-sm py-8">
                  No tasks
                </div>
              ) : (
                columnTasks.map((task) => (
                  <KanbanCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick?.(task)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}



