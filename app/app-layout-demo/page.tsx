"use client";

import { AppLayout } from "@/components/layouts";
import { ContentSection } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, Package, FolderKanban, Layout, Settings, Users, BarChart3, Bell } from "lucide-react";

const navItems = [
  { label: 'Home', href: '/', icon: <HomeIcon className="h-5 w-5" /> },
  { label: 'Components', href: '/components-overview', icon: <Package className="h-5 w-5" /> },
  { label: 'Projects', href: '/project-management', icon: <FolderKanban className="h-5 w-5" /> },
  { label: 'Layout Demo', href: '/app-layout-demo', icon: <Layout className="h-5 w-5" /> },
];

export default function AppLayoutDemo() {

  return (
    <AppLayout
      title="App Layout Demo"
      navItems={navItems}
      headerActions={
        <>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button>New Item</Button>
        </>
      }
    >
      <div className="space-y-6">
        <ContentSection title="Full Layout Example" variant="primary">
          <p className="text-gray-300">
            This page demonstrates the AppLayout component with both header and sidebar.
            The layout is fully responsive and includes mobile menu functionality.
          </p>
        </ContentSection>

        <ContentSection title="Configuration Options">
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Hide Sidebar</h3>
              <code className="text-sm bg-gray-800 px-2 py-1 rounded">
                {"<AppLayout showSidebar={false}>"}
              </code>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Hide Header</h3>
              <code className="text-sm bg-gray-800 px-2 py-1 rounded">
                {"<AppLayout showHeader={false}>"}
              </code>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Custom Sidebar</h3>
              <code className="text-sm bg-gray-800 px-2 py-1 rounded">
                {"<AppLayout sidebarContent={<CustomSidebar />}>"}
              </code>
            </div>
          </div>
        </ContentSection>
      </div>
    </AppLayout>
  );
}

