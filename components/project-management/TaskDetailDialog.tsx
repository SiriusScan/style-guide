'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TaskCard } from './TaskCard';
import type { Task } from '@/lib/types/project-management';

interface TaskDetailDialogProps {
  task: Task | null;
  allTasks: Task[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailDialog({
  task,
  allTasks,
  open,
  onOpenChange,
}: TaskDetailDialogProps) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <TaskCard task={task} allTasks={allTasks} />
        </div>
      </DialogContent>
    </Dialog>
  );
}



