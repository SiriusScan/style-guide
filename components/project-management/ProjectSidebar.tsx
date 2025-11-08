'use client';

import { trpc } from '@/lib/trpc/client';
import { calculateProjectProgress, flattenTasks } from '@/lib/utils/project-utils';
import type { ProjectInfo } from '@/lib/types/project-management';
import { Folder, FileText, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProjectSidebarProps {
  selectedProject: string | null;
  onProjectSelect: (projectName: string) => void;
}

export function ProjectSidebar({ selectedProject, onProjectSelect }: ProjectSidebarProps) {
  const { data: projects, isLoading, refetch, isRefetching } = trpc.projects.listProjects.useQuery(
    undefined,
    {
      refetchOnWindowFocus: true,
    }
  );

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="scanner-section-primary p-4 rounded-lg">
        <div className="text-violet-300">Loading projects...</div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="scanner-section-primary p-4 rounded-lg">
        <div className="text-violet-300 text-sm">No projects found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Projects</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefetching}
          className="h-8 w-8"
        >
          <RefreshCw className={cn('h-4 w-4', isRefetching && 'animate-spin')} />
        </Button>
      </div>
      <div className="space-y-2">
        {projects.map((project) => (
          <ProjectSidebarItem
            key={project.name}
            project={project}
            isSelected={selectedProject === project.name}
            onSelect={() => onProjectSelect(project.name)}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectSidebarItemProps {
  project: ProjectInfo;
  isSelected: boolean;
  onSelect: () => void;
}

function ProjectSidebarItem({ project, isSelected, onSelect }: ProjectSidebarItemProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left p-3 rounded-lg transition-colors',
        isSelected
          ? 'scanner-section-primary border-2 border-violet-500'
          : 'scanner-section hover:bg-violet-950/30'
      )}
    >
      <div className="flex items-start gap-2 mb-1">
        <Folder className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white truncate">{project.name}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {project.hasTaskFiles && (
          <div className="flex items-center gap-1 text-xs text-violet-300">
            <FileText className="h-3 w-3" />
            <span>{project.taskFiles.length} task file{project.taskFiles.length !== 1 ? 's' : ''}</span>
          </div>
        )}
        {project.hasPRD && (
          <div className="flex items-center gap-1 text-xs text-violet-300">
            <FileText className="h-3 w-3" />
            <span>PRD</span>
          </div>
        )}
        {project.hasPlans && (
          <div className="flex items-center gap-1 text-xs text-violet-300">
            <FileText className="h-3 w-3" />
            <span>Plans</span>
          </div>
        )}
      </div>
    </button>
  );
}
