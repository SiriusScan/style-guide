'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layouts';
import { DocSidebar } from '@/components/documentation/DocSidebar';
import { DocViewer } from '@/components/documentation/DocViewer';
import { Home as HomeIcon, Package, FolderKanban, Layout, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Home', href: '/', icon: <HomeIcon className="h-5 w-5" /> },
  { label: 'Components', href: '/components-overview', icon: <Package className="h-5 w-5" /> },
  { label: 'Projects', href: '/project-management', icon: <FolderKanban className="h-5 w-5" /> },
  { label: 'Documentation', href: '/documentation', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'Layout Demo', href: '/app-layout-demo', icon: <Layout className="h-5 w-5" /> },
];

export default function DocumentationPage() {
  const [selectedDocPath, setSelectedDocPath] = useState<string | null>(null);

  return (
    <AppLayout
      title="Documentation"
      navItems={navItems}
      headerActions={
        <Link href="/">
          <Button variant="outline" size="sm">
            <HomeIcon className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>
      }
      sidebarContent={
        <DocSidebar
          selectedDocPath={selectedDocPath}
          onDocSelect={setSelectedDocPath}
        />
      }
      contentClassName="overflow-hidden p-0"
    >
      <div className="h-full overflow-hidden">
        <DocViewer docPath={selectedDocPath} onDocSelect={setSelectedDocPath} />
      </div>
    </AppLayout>
  );
}

