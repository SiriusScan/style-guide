import { z } from 'zod';

// DocMetadata schema - YAML front matter fields
export const DocMetadataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  template: z.string().optional(),
  version: z.string().optional(),
  last_updated: z.string().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  difficulty: z.string().optional(),
  prerequisites: z.array(z.string()).optional(),
  related_docs: z.array(z.string()).optional(),
  dependencies: z.array(z.string()).optional(),
  llm_context: z.enum(['high', 'medium', 'low']).optional(),
  search_keywords: z.array(z.string()).optional(),
});

export type DocMetadata = z.infer<typeof DocMetadataSchema>;

// DocFile schema - Individual document
export const DocFileSchema = z.object({
  name: z.string(),
  path: z.string(),
  relativePath: z.string(),
  metadata: DocMetadataSchema,
  content: z.string(),
  size: z.number().optional(),
  lastModified: z.string().optional(),
});

export type DocFile = z.infer<typeof DocFileSchema>;

// DocFolder schema - Folder structure (recursive)
export const DocFolderSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    name: z.string(),
    path: z.string(),
    relativePath: z.string(),
    files: z.array(DocFileSchema),
    subfolders: z.array(DocFolderSchema),
  })
);

export type DocFolder = z.infer<typeof DocFolderSchema>;

// DocTree schema - Root documentation tree
export const DocTreeSchema = z.object({
  root: DocFolderSchema,
  totalFiles: z.number(),
  totalFolders: z.number(),
});

export type DocTree = z.infer<typeof DocTreeSchema>;



