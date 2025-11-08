"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface AppLayoutProps {
  /** Page title shown in header */
  title?: string;
  /** Optional header actions (buttons, dropdowns, etc.) */
  headerActions?: React.ReactNode;
  /** Navigation items for sidebar */
  navItems?: NavItem[];
  /** Whether to show sidebar (default: true) */
  showSidebar?: boolean;
  /** Whether to show header (default: true) */
  showHeader?: boolean;
  /** Custom sidebar content (overrides navItems if provided) */
  sidebarContent?: React.ReactNode;
  /** Custom header content (overrides title/headerActions if provided) */
  headerContent?: React.ReactNode;
  /** Main page content */
  children: React.ReactNode;
  /** Additional className for main content area */
  contentClassName?: string;
  /** Sidebar width (default: 256px) */
  sidebarWidth?: string;
}

/**
 * AppLayout - Configurable application layout with header and sidebar
 * 
 * USAGE PATTERN:
 * - Default: Shows both header and sidebar
 * - Hide sidebar: <AppLayout showSidebar={false}>...</AppLayout>
 * - Hide header: <AppLayout showHeader={false}>...</AppLayout>
 * - Custom sidebar: <AppLayout sidebarContent={<CustomSidebar />}>...</AppLayout>
 * 
 * @example
 * ```tsx
 * // Full layout with navigation
 * <AppLayout 
 *   title="Dashboard"
 *   navItems={[
 *     { label: "Home", href: "/", icon: <HomeIcon /> },
 *     { label: "Settings", href: "/settings", icon: <SettingsIcon /> }
 *   ]}
 * >
 *   <ContentSection>...</ContentSection>
 * </AppLayout>
 * 
 * // Header only, no sidebar
 * <AppLayout showSidebar={false} title="Simple Page">
 *   <ContentSection>...</ContentSection>
 * </AppLayout>
 * ```
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  headerActions,
  navItems = [],
  showSidebar = true,
  showHeader = true,
  sidebarContent,
  headerContent,
  children,
  contentClassName = "",
  sidebarWidth = "256px",
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#1c1e30]">
      {/* Full-width Header */}
      {showHeader && (
        <header className="lg:static sticky top-0 z-30 border-b border-violet-500/20 bg-gray-900/80 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              {showSidebar && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              {headerContent ? (
                headerContent
              ) : title ? (
                <h1 className="text-xl font-semibold text-white">{title}</h1>
              ) : null}
            </div>
            {headerActions && (
              <div className="flex items-center gap-2">{headerActions}</div>
            )}
          </div>
        </header>
      )}

      {/* Content Area: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside
              className={cn(
                "fixed left-0 z-50 flex flex-col border-r border-violet-500/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl shadow-black/50 transition-transform duration-300",
                sidebarOpen ? "translate-x-0" : "-translate-x-full",
                showHeader ? "top-16" : "top-0",
                "bottom-0",
                "lg:static lg:z-auto lg:translate-x-0 lg:shadow-lg lg:border-t-0 lg:top-auto lg:bottom-auto"
              )}
              style={{ width: sidebarWidth }}
            >
              {/* Mobile close button */}
              <div className="flex h-16 items-center justify-end border-b border-violet-500/30 px-4 lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                {sidebarContent ? (
                  sidebarContent
                ) : navItems.length > 0 ? (
                  <nav>
                    <ul className="space-y-1">
                      {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                isActive
                                  ? "bg-violet-500/20 text-violet-300"
                                  : "text-gray-300 hover:bg-violet-500/10 hover:text-violet-300"
                              )}
                              onClick={() => setSidebarOpen(false)}
                            >
                              {item.icon && <span className="h-5 w-5">{item.icon}</span>}
                              <span className="flex-1">{item.label}</span>
                              {item.badge && (
                                <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs text-white">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                ) : (
                  <p className="text-sm text-gray-400">No navigation items</p>
                )}
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto p-4 lg:p-6",
            contentClassName
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

