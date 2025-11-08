'use client';

import { useState, useMemo, useEffect } from 'react';
import { trpc } from '@/lib/trpc/client';
import { TaskCard } from './TaskCard';
import { KanbanBoard } from './KanbanBoard';
import { ControlBar } from './ControlBar';
import { TaskDetailDialog } from './TaskDetailDialog';
import { calculateProjectProgress, flattenTasks } from '@/lib/utils/project-utils';
import { filterAndSortTasks } from '@/lib/utils/filter-utils';
import {
  getViewPreference,
  setViewPreference,
  getFilterPreferences,
  setFilterPreferences,
  getSortPreference,
  setSortPreference,
  getAutoRefreshPreference,
  setAutoRefreshPreference,
  getRefreshIntervalPreference,
} from '@/lib/utils/storage-utils';
import { ActiveConstellationV2Loader } from '@/components/loaders';
import { Progress } from '@/components/ui/progress';
import { FileText, FolderOpen } from 'lucide-react';
import type { Task, TaskStatus, TaskPriority } from '@/lib/types/project-management';

interface TaskViewerProps {
  projectName: string | null;
  refreshInterval?: number | false;
}

export function TaskViewer({ projectName, refreshInterval = false }: TaskViewerProps) {
  // Load preferences from localStorage
  const [view, setView] = useState<'list' | 'kanban'>(() => getViewPreference());
  const [statusFilter, setStatusFilter] = useState<TaskStatus[] | 'all'>(() => {
    const prefs = getFilterPreferences();
    return prefs.statuses.length > 0 ? (prefs.statuses as TaskStatus[]) : 'all';
  });
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority[] | 'all'>(() => {
    const prefs = getFilterPreferences();
    return prefs.priorities.length > 0 ? (prefs.priorities as TaskPriority[]) : 'all';
  });
  const [showCompleted, setShowCompleted] = useState(() => {
    const prefs = getFilterPreferences();
    return prefs.showCompleted;
  });
  const [sortBy, setSortBy] = useState<'completion' | 'priority' | 'status' | 'id'>(() =>
    getSortPreference()
  );
  const [autoRefresh, setAutoRefresh] = useState(() => getAutoRefreshPreference());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Calculate effective refresh interval
  const effectiveRefreshInterval = autoRefresh && refreshInterval ? refreshInterval : false;

  const {
    data: projectData,
    isLoading,
    error,
    refetch,
    dataUpdatedAt,
  } = trpc.projects.getProjectTasks.useQuery(
    { projectName: projectName! },
    {
      enabled: !!projectName,
      refetchInterval: effectiveRefreshInterval,
      refetchOnWindowFocus: true,
    }
  );

  // Update preferences when they change
  useEffect(() => {
    setViewPreference(view);
  }, [view]);

  useEffect(() => {
    setFilterPreferences({
      statuses: statusFilter === 'all' ? [] : statusFilter,
      priorities: priorityFilter === 'all' ? [] : priorityFilter,
      showCompleted,
    });
  }, [statusFilter, priorityFilter, showCompleted]);

  useEffect(() => {
    setSortPreference(sortBy);
  }, [sortBy]);

  useEffect(() => {
    setAutoRefreshPreference(autoRefresh);
  }, [autoRefresh]);

  // Combine all tasks from all task files
  const allTasks = useMemo(() => {
    if (!projectData) return [];
    return projectData.taskFiles.flatMap((file) => file.data.tasks);
  }, [projectData]);

  // Flatten tasks for filtering (only top-level tasks for display)
  const topLevelTasks = useMemo(() => {
    return allTasks.filter((task) => !task.id.includes('.'));
  }, [allTasks]);

  // Apply filters and sorting
  const filteredAndSortedTasks = useMemo(() => {
    if (topLevelTasks.length === 0) return [];

    const statuses = statusFilter === 'all' ? undefined : statusFilter;
    const priorities = priorityFilter === 'all' ? undefined : priorityFilter;

    return filterAndSortTasks(topLevelTasks, {
      statuses,
      priorities,
      showCompleted,
      sortBy,
    });
  }, [topLevelTasks, statusFilter, priorityFilter, showCompleted, sortBy]);

  // Calculate progress
  const progress = useMemo(() => {
    return calculateProjectProgress(allTasks);
  }, [allTasks]);

  // Handle task click (for Kanban view)
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  // Handle refresh
  const handleRefresh = () => {
    refetch();
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setShowCompleted(true);
  };

  if (!projectName) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <FolderOpen className="h-16 w-16 text-violet-400 mx-auto mb-4 opacity-50" />
          <p className="text-violet-300 text-lg">Select a project to view tasks</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <ActiveConstellationV2Loader size="xl" speed={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="scanner-section-primary p-6 rounded-lg max-w-md">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Project</h3>
          <p className="text-violet-300">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!projectData || projectData.taskFiles.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-violet-400 mx-auto mb-4 opacity-50" />
          <p className="text-violet-300 text-lg mb-2">No task files found</p>
          <p className="text-violet-400 text-sm">
            This project doesn't have any task files yet.
          </p>
        </div>
      </div>
    );
  }

  const refreshIntervalMs = getRefreshIntervalPreference();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Control Bar */}
      <ControlBar
        view={view}
        onViewChange={setView}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        showCompleted={showCompleted}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onShowCompletedChange={setShowCompleted}
        onClearFilters={handleClearFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onRefresh={handleRefresh}
        isRefreshing={isLoading}
        lastUpdated={dataUpdatedAt ? new Date(dataUpdatedAt) : null}
        autoRefresh={autoRefresh}
        onAutoRefreshChange={setAutoRefresh}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Project Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{projectData.name}</h1>
              {projectData.taskFiles.length > 0 && projectData.taskFiles[0].data.project.version && (
                <p className="text-violet-300 text-sm">
                  Version {projectData.taskFiles[0].data.project.version}
                </p>
              )}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="scanner-section-primary p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">Overall Progress</h2>
              <span className="text-2xl font-bold text-violet-400">{progress.percentage}%</span>
            </div>
            <div className="mb-3">
              <Progress value={progress.percentage} className="h-2" />
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-violet-400">Total</div>
                <div className="text-white font-semibold">{progress.total}</div>
              </div>
              <div>
                <div className="text-green-400">Completed</div>
                <div className="text-white font-semibold">{progress.completed}</div>
              </div>
              <div>
                <div className="text-blue-400">In Progress</div>
                <div className="text-white font-semibold">{progress.inProgress}</div>
              </div>
              <div>
                <div className="text-gray-400">Pending</div>
                <div className="text-white font-semibold">{progress.pending}</div>
              </div>
            </div>
          </div>

          {/* Filter Summary */}
          {filteredAndSortedTasks.length !== topLevelTasks.length && (
            <div className="mb-4 text-sm text-violet-300">
              Showing {filteredAndSortedTasks.length} of {topLevelTasks.length} tasks
            </div>
          )}
        </div>

        {/* View Content */}
        {view === 'list' ? (
          /* List View */
          <div className="space-y-4">
            {filteredAndSortedTasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-violet-300 text-lg">No tasks match the current filters</p>
              </div>
            ) : (
              filteredAndSortedTasks.map((task) => (
                <div key={task.id} id={`task-${task.id}`}>
                  <TaskCard task={task} allTasks={allTasks} />
                </div>
              ))
            )}
          </div>
        ) : (
          /* Kanban View */
          <KanbanBoard tasks={filteredAndSortedTasks} onTaskClick={handleTaskClick} />
        )}
      </div>

      {/* Task Detail Dialog */}
      <TaskDetailDialog
        task={selectedTask}
        allTasks={allTasks}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
