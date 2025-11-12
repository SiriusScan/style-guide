'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { TaskStatus, TaskPriority } from '@/lib/types/project-management';
import { X } from 'lucide-react';

interface TaskFiltersProps {
  statusFilter: TaskStatus[] | 'all';
  priorityFilter: TaskPriority[] | 'all';
  showCompleted: boolean;
  onStatusChange: (statuses: TaskStatus[] | 'all') => void;
  onPriorityChange: (priorities: TaskPriority[] | 'all') => void;
  onShowCompletedChange: (show: boolean) => void;
  onClearFilters: () => void;
}

const statusOptions: Array<{ value: TaskStatus; label: string }> = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'blocked', label: 'Blocked' },
];

const priorityOptions: Array<{ value: TaskPriority; label: string }> = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export function TaskFilters({
  statusFilter,
  priorityFilter,
  showCompleted,
  onStatusChange,
  onPriorityChange,
  onShowCompletedChange,
  onClearFilters,
}: TaskFiltersProps) {
  const hasActiveFilters =
    statusFilter !== 'all' ||
    priorityFilter !== 'all' ||
    !showCompleted;

  return (
    <div className="flex flex-wrap items-end gap-4">
      {/* Status Filter */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="status-filter" className="text-xs text-violet-300">
          Status
        </Label>
        <Select
          value={statusFilter === 'all' ? 'all' : statusFilter[0]}
          onValueChange={(value) => {
            if (value === 'all') {
              onStatusChange('all');
            } else {
              onStatusChange([value as TaskStatus]);
            }
          }}
        >
          <SelectTrigger id="status-filter" className="w-[140px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Priority Filter */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="priority-filter" className="text-xs text-violet-300">
          Priority
        </Label>
        <Select
          value={priorityFilter === 'all' ? 'all' : priorityFilter[0]}
          onValueChange={(value) => {
            if (value === 'all') {
              onPriorityChange('all');
            } else {
              onPriorityChange([value as TaskPriority]);
            }
          }}
        >
          <SelectTrigger id="priority-filter" className="w-[140px]">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {priorityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Show Completed Toggle */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="show-completed" className="text-xs text-violet-300">
          Show Completed
        </Label>
        <Select
          value={showCompleted ? 'yes' : 'no'}
          onValueChange={(value) => onShowCompletedChange(value === 'yes')}
        >
          <SelectTrigger id="show-completed" className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Show</SelectItem>
            <SelectItem value="no">Hide</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">Clear</span>
        </Button>
      )}
    </div>
  );
}



