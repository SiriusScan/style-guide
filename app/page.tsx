"use client";

import { trpc } from "@/lib/trpc/client";
import { ActiveConstellationV2Loader } from "@/components/loaders";
import { AppLayout } from "@/components/layouts";
import { ContentSection } from "@/components/layouts";
import {
  Home as HomeIcon,
  Package,
  FolderKanban,
  Layout,
  BookOpen,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
  {
    label: "Components",
    href: "/components-overview",
    icon: <Package className="h-5 w-5" />,
  },
  {
    label: "Projects",
    href: "/project-management",
    icon: <FolderKanban className="h-5 w-5" />,
  },
  {
    label: "Documentation",
    href: "/documentation",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    label: "Layout Demo",
    href: "/app-layout-demo",
    icon: <Layout className="h-5 w-5" />,
  },
];

export default function Home() {
  const { data: greeting, isLoading: greetingLoading } =
    trpc.example.hello.useQuery({ text: "World" });
  const { data: serverTime, isLoading: timeLoading } =
    trpc.example.getServerTime.useQuery();

  return (
    <AppLayout title="Sirius Scan Style Guide" navItems={navItems}>
      <div className="space-y-6">
        <ContentSection title="Style Guide Boilerplate" variant="primary">
          <p className="text-gray-300 text-lg">
            Opinionated starter template with Sirius design system
          </p>
        </ContentSection>

        {/* Loader Demo */}
        {(greetingLoading || timeLoading) && (
          <ContentSection title="Loading">
            <div className="flex justify-center py-8">
              <ActiveConstellationV2Loader size="xl" speed={1} />
            </div>
          </ContentSection>
        )}

        {/* Content Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <ContentSection title="tRPC Example" variant="primary">
            <p className="text-gray-300">
              {greeting?.greeting || "Loading..."}
            </p>
          </ContentSection>

          <ContentSection title="Server Time" variant="primary">
            <p className="text-gray-300">{serverTime?.time || "Loading..."}</p>
          </ContentSection>

          <ContentSection title="Database" className="md:col-span-2">
            <p className="text-gray-300">
              Database connection configured. Check{" "}
              <code className="bg-violet-500/20 px-2 py-1 rounded text-violet-300">
                lib/db/
              </code>{" "}
              for schema and connection setup.
            </p>
          </ContentSection>
        </div>
      </div>
    </AppLayout>
  );
}
