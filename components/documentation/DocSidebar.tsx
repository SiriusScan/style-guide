'use client';

import Link from 'next/link';
import { trpc } from '@/lib/trpc/client';
import { FolderTreeItem } from './FolderTreeItem';
import { RefreshCw, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ActiveConstellationV2Loader } from '@/components/loaders';

interface DocSidebarProps {
  selectedDocPath: string | null;
  onDocSelect: (path: string) => void;
}

export function DocSidebar({ selectedDocPath, onDocSelect }: DocSidebarProps) {
  const { data: docTree, isLoading, refetch, isRefetching } = trpc.documentation.getDocTree.useQuery(
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
        <div className="flex flex-col items-center justify-center py-8">
          <ActiveConstellationV2Loader size="md" speed={1} />
          <div className="text-violet-300 mt-4">Loading documentation...</div>
        </div>
      </div>
    );
  }

  if (!docTree || !docTree.root) {
    return (
      <div className="scanner-section-primary p-4 rounded-lg">
        <div className="text-violet-300 text-sm">No documentation found</div>
      </div>
    );
  }

  return (
    <div>
      {/* Home Link */}
      <Link href="/">
        <Button
          variant="ghost"
          className="w-full justify-start mb-4 text-gray-300 hover:text-violet-300 hover:bg-violet-500/10"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </Link>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Documentation</h2>
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
      <div className="text-xs text-gray-400 mb-3">
        {docTree.totalFiles} file{docTree.totalFiles !== 1 ? 's' : ''} in {docTree.totalFolders} folder{docTree.totalFolders !== 1 ? 's' : ''}
      </div>
      <div className="space-y-1">
        <FolderTreeItem
          folder={docTree.root}
          selectedPath={selectedDocPath}
          onFileSelect={onDocSelect}
        />
      </div>
    </div>
  );
}

