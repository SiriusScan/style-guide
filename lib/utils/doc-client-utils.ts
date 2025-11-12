import type { DocFile, DocFolder } from '@/lib/types/documentation';

/**
 * Flatten doc tree for search/filtering (client-safe)
 */
export function flattenDocTree(folder: DocFolder): DocFile[] {
  const files: DocFile[] = [...folder.files];
  
  for (const subfolder of folder.subfolders) {
    files.push(...flattenDocTree(subfolder));
  }
  
  return files;
}

/**
 * Find specific doc by path in tree (client-safe)
 */
export function getDocByPath(folder: DocFolder, targetPath: string): DocFile | null {
  // Check files in current folder
  const file = folder.files.find((f: DocFile) => f.relativePath === targetPath);
  if (file) return file;

  // Check subfolders recursively
  for (const subfolder of folder.subfolders) {
    const found = getDocByPath(subfolder, targetPath);
    if (found) return found;
  }

  return null;
}

/**
 * Resolve a document path from a filename or relative path (client-safe)
 * Handles both filenames (e.g., "README.task-management.md") and relative paths (e.g., "../README.documentation-index.md")
 */
export function resolveDocPath(
  docReference: string,
  currentDocPath: string | null,
  docTree: DocFolder
): string | null {
  if (!docReference) return null;

  // Remove markdown link syntax if present
  const cleanRef = docReference.replace(/\[.*?\]\(/, '').replace(/\)$/, '').trim();

  // If it's already a full relative path starting with "docs/", use it
  if (cleanRef.startsWith('docs/')) {
    return cleanRef;
  }

  // If it starts with "../", resolve relative to current document
  if (cleanRef.startsWith('../')) {
    if (!currentDocPath) return null;
    
    // Get directory of current document
    const currentDir = currentDocPath.split('/').slice(0, -1).join('/');
    const parts = cleanRef.split('/');
    let resolvedPath = currentDir;
    
    for (const part of parts) {
      if (part === '..') {
        const pathParts = resolvedPath.split('/');
        if (pathParts.length > 1) {
          resolvedPath = pathParts.slice(0, -1).join('/');
        }
      } else if (part && part !== '.') {
        resolvedPath = resolvedPath ? `${resolvedPath}/${part}` : part;
      }
    }
    
    // Ensure it starts with "docs/"
    if (!resolvedPath.startsWith('docs/')) {
      resolvedPath = `docs/${resolvedPath}`;
    }
    
    // Check if this path exists in the tree
    const found = getDocByPath(docTree, resolvedPath);
    if (found) return resolvedPath;
  }

  // Try to find by filename in the tree
  const allFiles = flattenDocTree(docTree);
  const found = allFiles.find(file => {
    const fileName = file.name;
    const relativePath = file.relativePath;
    return fileName === cleanRef || relativePath.endsWith(`/${cleanRef}`) || relativePath === cleanRef;
  });

  return found ? found.relativePath : null;
}



