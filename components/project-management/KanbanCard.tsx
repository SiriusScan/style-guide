'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from './StatusBadge';
import type { Task } from '@/lib/types/project-management';
import { Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KanbanCardProps {
  task: Task;
  onClick?: () => void;
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-500/20 text-red-300 border-red-500/50',
  medium: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
  low: 'bg-green-500/20 text-green-300 border-green-500/50',
};

export function KanbanCard({ task, onClick }: KanbanCardProps) {
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const hasDependencies = task.dependencies && task.dependencies.length > 0;

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-lg hover:shadow-violet-500/20 hover:border-violet-500/60',
        'mb-2'
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-semibold line-clamp-2 mb-1">
              {task.title}
            </CardTitle>
            <CardDescription className="text-xs font-mono text-violet-400">
              #{task.id}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-2">
          {/* Status Badge */}
          <StatusBadge status={task.status} className="w-fit" />

          {/* Priority Badge */}
          <Badge
            variant="outline"
            className={cn('text-xs w-fit', priorityColors[task.priority])}
          >
            {task.priority}
          </Badge>

          {/* Indicators */}
          <div className="flex items-center gap-2 text-xs text-violet-400">
            {hasDependencies && (
              <div className="flex items-center gap-1">
                <LinkIcon className="h-3 w-3" />
                <span>{task.dependencies.length}</span>
              </div>
            )}
            {hasSubtasks && (
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>{task.subtasks!.length} subtask{task.subtasks!.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Description preview */}
          {task.description && (
            <p className="text-xs text-violet-300 line-clamp-2 mt-1">
              {task.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}



