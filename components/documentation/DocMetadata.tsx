'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DocMetadata as DocMetadataType, DocFolder } from '@/lib/types/documentation';
import { Tag, Calendar, User, BookOpen, Layers, Link as LinkIcon, Code, Search } from 'lucide-react';
import { resolveDocPath } from '@/lib/utils/doc-client-utils';
import { cn } from '@/lib/utils';

interface DocMetadataProps {
  metadata: DocMetadataType;
  currentDocPath: string | null;
  docTree: DocFolder | null;
  onDocSelect?: (path: string) => void;
}

export function DocMetadata({ metadata, currentDocPath, docTree, onDocSelect }: DocMetadataProps) {
  if (!metadata || Object.keys(metadata).length === 0) {
    return null;
  }

  const handleRelatedDocClick = (docRef: string) => {
    if (!docTree || !onDocSelect) return;
    
    const resolvedPath = resolveDocPath(docRef, currentDocPath, docTree);
    if (resolvedPath) {
      onDocSelect(resolvedPath);
    }
  };

  return (
    <Card className="scanner-section-primary mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-violet-400" />
          Document Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Title */}
        {metadata.title && (
          <div>
            <h2 className="text-xl font-semibold text-white">{metadata.title}</h2>
          </div>
        )}

        {/* Description */}
        {metadata.description && (
          <div>
            <p className="text-gray-300">{metadata.description}</p>
          </div>
        )}

        {/* Tags */}
        {metadata.tags && metadata.tags.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-gray-300">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {metadata.categories && metadata.categories.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-gray-300">Categories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {metadata.categories.map((category, index) => (
                <Badge key={index} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-violet-500/20">
          {metadata.version && (
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-gray-400">Version:</span>
              <span className="text-sm text-white">{metadata.version}</span>
            </div>
          )}

          {metadata.last_updated && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-gray-400">Last Updated:</span>
              <span className="text-sm text-white">{metadata.last_updated}</span>
            </div>
          )}

          {metadata.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-gray-400">Author:</span>
              <span className="text-sm text-white">{metadata.author}</span>
            </div>
          )}

          {metadata.difficulty && (
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-gray-400">Difficulty:</span>
              <Badge variant="secondary" className="ml-1">
                {metadata.difficulty}
              </Badge>
            </div>
          )}

          {metadata.llm_context && (
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-gray-400">LLM Context:</span>
              <Badge 
                variant={metadata.llm_context === 'high' ? 'default' : 'secondary'}
                className="ml-1"
              >
                {metadata.llm_context}
              </Badge>
            </div>
          )}
        </div>

        {/* Prerequisites */}
        {metadata.prerequisites && metadata.prerequisites.length > 0 && (
          <div className="pt-2 border-t border-violet-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-gray-300">Prerequisites</span>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {metadata.prerequisites.map((prereq, index) => (
                <li key={index} className="text-sm text-gray-300">{prereq}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Docs */}
        {metadata.related_docs && metadata.related_docs.length > 0 && (
          <div className="pt-2 border-t border-violet-500/20">
            <div className="flex items-center gap-2 mb-2">
              <LinkIcon className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-gray-300">Related Documents</span>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {metadata.related_docs.map((doc, index) => {
                const resolvedPath = docTree ? resolveDocPath(doc, currentDocPath, docTree) : null;
                const isClickable = resolvedPath && onDocSelect;
                
                return (
                  <li
                    key={index}
                    className={cn(
                      "text-sm",
                      isClickable
                        ? "text-violet-300 hover:text-violet-200 cursor-pointer underline"
                        : "text-violet-300"
                    )}
                    onClick={() => isClickable && handleRelatedDocClick(doc)}
                  >
                    {doc}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Search Keywords */}
        {metadata.search_keywords && metadata.search_keywords.length > 0 && (
          <div className="pt-2 border-t border-violet-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-gray-300">Search Keywords</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {metadata.search_keywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

