import { promises as fs } from 'fs';
import { join, basename } from 'path';
import matter from 'gray-matter';
import type { DocFile, DocFolder, DocTree, DocMetadata } from '@/lib/types/documentation';
import { flattenDocTree, getDocByPath } from './doc-client-utils';

const DOCS_DIR = join(process.cwd(), 'docs');

/**
 * Parse markdown file and extract YAML front matter
 */
export async function parseMarkdownFile(filePath: string): Promise<{ metadata: DocMetadata; content: string }> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(fileContent);
    
    // Ensure metadata matches our schema (handle arrays that might be strings)
    const metadata: DocMetadata = {
      title: parsed.data.title,
      description: parsed.data.description,
      template: parsed.data.template,
      version: parsed.data.version,
      last_updated: parsed.data.last_updated,
      author: parsed.data.author,
      tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : parsed.data.tags ? [parsed.data.tags] : undefined,
      categories: Array.isArray(parsed.data.categories) ? parsed.data.categories : parsed.data.categories ? [parsed.data.categories] : undefined,
      difficulty: parsed.data.difficulty,
      prerequisites: Array.isArray(parsed.data.prerequisites) ? parsed.data.prerequisites : parsed.data.prerequisites ? [parsed.data.prerequisites] : undefined,
      related_docs: Array.isArray(parsed.data.related_docs) ? parsed.data.related_docs : parsed.data.related_docs ? [parsed.data.related_docs] : undefined,
      dependencies: Array.isArray(parsed.data.dependencies) ? parsed.data.dependencies : parsed.data.dependencies ? [parsed.data.dependencies] : undefined,
      llm_context: parsed.data.llm_context,
      search_keywords: Array.isArray(parsed.data.search_keywords) ? parsed.data.search_keywords : parsed.data.search_keywords ? [parsed.data.search_keywords] : undefined,
    };

    return {
      metadata,
      content: parsed.content,
    };
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error);
    return {
      metadata: {},
      content: '',
    };
  }
}

/**
 * Recursively build folder tree structure
 */
export async function buildDocTree(basePath: string = DOCS_DIR, relativeBasePath: string = 'docs'): Promise<DocFolder> {
  const entries = await fs.readdir(basePath, { withFileTypes: true });
  
  const folder: DocFolder = {
    name: basename(basePath),
    path: basePath,
    relativePath: relativeBasePath,
    files: [],
    subfolders: [],
  };

  for (const entry of entries) {
    const fullPath = join(basePath, entry.name);
    const relativePath = join(relativeBasePath, entry.name);

    if (entry.isDirectory()) {
      const subfolder = await buildDocTree(fullPath, relativePath);
      folder.subfolders.push(subfolder);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      try {
        const stat = await fs.stat(fullPath);
        const { metadata, content } = await parseMarkdownFile(fullPath);
        
        const docFile: DocFile = {
          name: entry.name,
          path: fullPath,
          relativePath: relativePath,
          metadata,
          content,
          size: stat.size,
          lastModified: stat.mtime.toISOString(),
        };

        folder.files.push(docFile);
      } catch (error) {
        console.error(`Error reading file ${fullPath}:`, error);
      }
    }
  }

  // Sort files and folders alphabetically
  folder.files.sort((a: DocFile, b: DocFile) => a.name.localeCompare(b.name));
  folder.subfolders.sort((a: DocFolder, b: DocFolder) => a.name.localeCompare(b.name));

  return folder;
}

/**
 * Count total files and folders in tree
 */
export function countTreeStats(folder: DocFolder): { files: number; folders: number } {
  let files = folder.files.length;
  let folders = 1; // Count current folder

  for (const subfolder of folder.subfolders) {
    const stats = countTreeStats(subfolder);
    files += stats.files;
    folders += stats.folders;
  }

  return { files, folders };
}

/**
 * Build complete doc tree with stats
 */
export async function buildDocTreeWithStats(): Promise<DocTree> {
  const root = await buildDocTree();
  const stats = countTreeStats(root);

  return {
    root,
    totalFiles: stats.files,
    totalFolders: stats.folders,
  };
}

