'use client';

import { ViewSwitcher } from './ViewSwitcher';
import { TaskFilters } from './TaskFilters';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefreshCw, Clock } from 'lucide-react';
import type { TaskStatus, TaskPriority } from '@/lib/types/project-management';

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

interface ControlBarProps {
  // View
  view: 'list' | 'kanban';
  onViewChange: (view: 'list' | 'kanban') => void;

  // Filters
  statusFilter: TaskStatus[] | 'all';
  priorityFilter: TaskPriority[] | 'all';
  showCompleted: boolean;
  onStatusChange: (statuses: TaskStatus[] | 'all') => void;
  onPriorityChange: (priorities: TaskPriority[] | 'all') => void;
  onShowCompletedChange: (show: boolean) => void;
  onClearFilters: () => void;

  // Sort
  sortBy: 'completion' | 'priority' | 'status' | 'id';
  onSortChange: (sort: 'completion' | 'priority' | 'status' | 'id') => void;

  // Refresh
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: Date | null;

  // Auto-refresh
  autoRefresh: boolean;
  onAutoRefreshChange: (enabled: boolean) => void;
}

export function ControlBar({
  view,
  onViewChange,
  statusFilter,
  priorityFilter,
  showCompleted,
  onStatusChange,
  onPriorityChange,
  onShowCompletedChange,
  onClearFilters,
  sortBy,
  onSortChange,
  onRefresh,
  isRefreshing,
  lastUpdated,
  autoRefresh,
  onAutoRefreshChange,
}: ControlBarProps) {
  return (
    <div className="border-b border-violet-500/30 bg-gray-900/50 p-4 space-y-4">
      {/* Top Row: View Switcher and Refresh Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ViewSwitcher value={view} onValueChange={onViewChange} />

        <div className="flex flex-wrap items-center gap-4">
          {/* Auto-refresh Toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={onAutoRefreshChange}
            />
            <Label htmlFor="auto-refresh" className="text-sm text-violet-300 cursor-pointer">
              Auto-refresh
            </Label>
          </div>

          {/* Manual Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={isRefreshing ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          {/* Last Updated Time */}
          {lastUpdated && (
            <div className="flex items-center gap-2 text-xs text-violet-400">
              <Clock className="h-3 w-3" />
              <span className="hidden sm:inline">
                Updated {formatTimeAgo(lastUpdated)}
              </span>
              <span className="sm:hidden">
                {formatTimeAgo(lastUpdated)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Filters and Sort */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <TaskFilters
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          showCompleted={showCompleted}
          onStatusChange={onStatusChange}
          onPriorityChange={onPriorityChange}
          onShowCompletedChange={onShowCompletedChange}
          onClearFilters={onClearFilters}
        />

        {/* Sort Control */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="sort-by" className="text-xs text-violet-300">
            Sort By
          </Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger id="sort-by" className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completion">Incomplete First</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="id">Task ID</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

