'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layouts';
import { ProjectSidebar } from '@/components/project-management/ProjectSidebar';
import { TaskViewer } from '@/components/project-management/TaskViewer';
import { getRefreshIntervalPreference } from '@/lib/utils/storage-utils';
import { Home as HomeIcon, Package, FolderKanban, Layout } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', icon: <HomeIcon className="h-5 w-5" /> },
  { label: 'Components', href: '/components-overview', icon: <Package className="h-5 w-5" /> },
  { label: 'Projects', href: '/project-management', icon: <FolderKanban className="h-5 w-5" /> },
  { label: 'Layout Demo', href: '/app-layout-demo', icon: <Layout className="h-5 w-5" /> },
];

export default function ProjectManagementPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const refreshInterval = getRefreshIntervalPreference();

  return (
    <AppLayout
      title="Project Management"
      navItems={navItems}
      sidebarContent={
        <ProjectSidebar
          selectedProject={selectedProject}
          onProjectSelect={setSelectedProject}
        />
      }
      contentClassName="overflow-hidden p-0"
    >
      <div className="h-full overflow-hidden">
        <TaskViewer projectName={selectedProject} refreshInterval={refreshInterval} />
      </div>
    </AppLayout>
  );
}

