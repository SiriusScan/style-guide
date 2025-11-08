'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from './StatusBadge';
import type { Task } from '@/lib/types/project-management';
import { getTaskDependencyStatus, findTaskById } from '@/lib/utils/project-utils';
import { ChevronDown, ChevronRight, Link as LinkIcon, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  allTasks: Task[];
  level?: number;
}

export function TaskCard({ task, allTasks, level = 0 }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const dependencies = getTaskDependencyStatus(task, allTasks);

  const priorityColors: Record<string, string> = {
    high: 'bg-red-500/20 text-red-300 border-red-500/50',
    medium: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    low: 'bg-green-500/20 text-green-300 border-green-500/50',
  };

  return (
    <div className={cn('mb-2', level > 0 && 'ml-6 border-l-2 border-violet-500/30 pl-4')}>
      <div className="scanner-section-primary p-4 rounded-lg">
        {/* Task Header */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {hasSubtasks && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
              <span className="font-mono text-sm text-violet-400">#{task.id}</span>
              <h3 className="text-lg font-semibold text-white">{task.title}</h3>
            </div>
            <p className="text-sm text-violet-200 mb-2">{task.description}</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <StatusBadge status={task.status} />
            <Badge
              variant="outline"
              className={cn('text-xs', priorityColors[task.priority])}
            >
              {task.priority}
            </Badge>
          </div>
        </div>

        {/* Task Details */}
        {task.details && (
          <div className="mb-3 text-sm text-violet-300 bg-violet-950/30 p-2 rounded">
            {task.details}
          </div>
        )}

        {/* Dependencies */}
        {dependencies.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <LinkIcon className="h-3 w-3 text-violet-400" />
              <span className="text-xs font-semibold text-violet-300">Dependencies:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {dependencies.map((dep) => (
                <a
                  key={dep.id}
                  href={`#task-${dep.id}`}
                  className={cn(
                    'text-xs px-2 py-1 rounded border transition-colors',
                    dep.completed
                      ? 'border-green-500/50 bg-green-500/10 text-green-300'
                      : 'border-violet-500/50 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20'
                  )}
                >
                  #{dep.id} {dep.completed && '✓'}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-xs text-violet-400 mb-2">
          {task.assignedTo && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{task.assignedTo}</span>
            </div>
          )}
          {task.createdAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          )}
          {task.updatedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Test Strategy */}
        {task.testStrategy && (
          <div className="mt-3 pt-3 border-t border-violet-500/30">
            <p className="text-xs font-semibold text-violet-300 mb-1">Test Strategy:</p>
            <p className="text-xs text-violet-400">{task.testStrategy}</p>
          </div>
        )}
      </div>

      {/* Subtasks */}
      {hasSubtasks && isExpanded && (
        <div className="mt-2">
          {task.subtasks!.map((subtask: Task) => (
            <TaskCard
              key={subtask.id}
              task={subtask}
              allTasks={allTasks}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

