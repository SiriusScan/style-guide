'use client';

import { useState } from 'react';
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DocFolder, DocFile } from '@/lib/types/documentation';

interface FolderTreeItemProps {
  folder: DocFolder;
  selectedPath: string | null;
  onFileSelect: (path: string) => void;
  level?: number;
}

export function FolderTreeItem({ folder, selectedPath, onFileSelect, level = 0 }: FolderTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels

  const hasContent = folder.files.length > 0 || folder.subfolders.length > 0;

  return (
    <div>
      {/* Folder Header */}
      {hasContent && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
            'hover:bg-violet-500/10 text-gray-300 hover:text-violet-300',
            level === 0 && 'font-semibold text-white'
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          )}
          {isExpanded ? (
            <FolderOpen className="h-4 w-4 flex-shrink-0 text-violet-400" />
          ) : (
            <Folder className="h-4 w-4 flex-shrink-0 text-violet-400" />
          )}
          <span className="truncate">{folder.name}</span>
        </button>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div>
          {/* Subfolders */}
          {folder.subfolders.map((subfolder: DocFolder) => (
            <FolderTreeItem
              key={subfolder.path}
              folder={subfolder}
              selectedPath={selectedPath}
              onFileSelect={onFileSelect}
              level={level + 1}
            />
          ))}

          {/* Files */}
          {folder.files.map((file: DocFile) => (
            <FileTreeItem
              key={file.path}
              file={file}
              selectedPath={selectedPath}
              onSelect={onFileSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface FileTreeItemProps {
  file: DocFile;
  selectedPath: string | null;
  onSelect: (path: string) => void;
  level: number;
}

function FileTreeItem({ file, selectedPath, onSelect, level }: FileTreeItemProps) {
  const isSelected = selectedPath === file.relativePath;

  return (
    <button
      onClick={() => onSelect(file.relativePath)}
      className={cn(
        'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
        isSelected
          ? 'bg-violet-500/20 text-violet-300 border-l-2 border-violet-500'
          : 'text-gray-300 hover:bg-violet-500/10 hover:text-violet-300'
      )}
      style={{ paddingLeft: `${level * 16 + 8}px` }}
    >
      <FileText className="h-4 w-4 flex-shrink-0 text-violet-400" />
      <span className="truncate">{file.name}</span>
    </button>
  );
}

