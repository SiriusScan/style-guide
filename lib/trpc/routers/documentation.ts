import { z } from 'zod';
import { router, publicProcedure } from '../server';
import { buildDocTreeWithStats, parseMarkdownFile } from '@/lib/utils/doc-utils';
import { join } from 'path';
import { DocTreeSchema, DocFileSchema } from '@/lib/types/documentation';

const DOCS_DIR = join(process.cwd(), 'docs');

/**
 * Documentation router - handles documentation tree and content fetching
 */
export const documentationRouter = router({
  /**
   * Get complete documentation tree structure
   */
  getDocTree: publicProcedure.query(async () => {
    try {
      const tree = await buildDocTreeWithStats();
      return tree;
    } catch (error) {
      console.error('Error building doc tree:', error);
      throw new Error('Failed to build documentation tree');
    }
  }),

  /**
   * Get specific document content by relative path
   */
  getDocContent: publicProcedure
    .input(z.object({
      path: z.string(),
    }))
    .query(async ({ input }) => {
      try {
        // Remove 'docs/' prefix if present, since DOCS_DIR already includes it
        const cleanPath = input.path.startsWith('docs/') 
          ? input.path.slice(5) 
          : input.path;
        const fullPath = join(DOCS_DIR, cleanPath);
        const { metadata, content } = await parseMarkdownFile(fullPath);
        
        const docFile = {
          relativePath: input.path,
          path: fullPath,
          name: input.path.split('/').pop() || input.path,
          metadata,
          content,
        };

        return docFile;
      } catch (error) {
        console.error(`Error fetching doc content for ${input.path}:`, error);
        throw new Error(`Failed to fetch document: ${input.path}`);
      }
    }),
});

