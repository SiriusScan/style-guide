'use client';

import { trpc } from '@/lib/trpc/client';
import { DocMetadata } from './DocMetadata';
import { MarkdownContent } from './MarkdownContent';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ActiveConstellationV2Loader } from '@/components/loaders';

interface DocViewerProps {
  docPath: string | null;
  onDocSelect?: (path: string) => void;
}

export function DocViewer({ docPath, onDocSelect }: DocViewerProps) {
  const { data: doc, isLoading, error } = trpc.documentation.getDocContent.useQuery(
    { path: docPath! },
    {
      enabled: !!docPath,
      refetchOnWindowFocus: false,
    }
  );

  const { data: docTree } = trpc.documentation.getDocTree.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (!docPath) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="scanner-section-primary max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <FileText className="h-12 w-12 text-violet-400/50" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Select a Document</h3>
                <p className="text-sm text-gray-400">
                  Choose a document from the sidebar to view its content
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <ActiveConstellationV2Loader size="xl" speed={1} />
          <p className="text-gray-400">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="scanner-section-primary max-w-md border-red-500/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-red-400 text-lg font-semibold">Error Loading Document</div>
              <p className="text-sm text-gray-400">{error.message}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="scanner-section-primary max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-gray-400 text-lg font-semibold">Document Not Found</div>
              <p className="text-sm text-gray-500">The requested document could not be loaded.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <DocMetadata
          metadata={doc.metadata}
          currentDocPath={docPath}
          docTree={docTree?.root || null}
          onDocSelect={onDocSelect}
        />
        <div className="prose-wrapper">
          <MarkdownContent
            content={doc.content}
            currentDocPath={docPath}
            docTree={docTree?.root || null}
            onDocSelect={onDocSelect}
          />
        </div>
      </div>
    </div>
  );
}

