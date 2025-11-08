'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { DocFolder } from '@/lib/types/documentation';
import { resolveDocPath } from '@/lib/utils/doc-client-utils';

interface MarkdownContentProps {
  content: string;
  currentDocPath: string | null;
  docTree: DocFolder | null;
  onDocSelect?: (path: string) => void;
}

export function MarkdownContent({ content, currentDocPath, docTree, onDocSelect }: MarkdownContentProps) {
  const handleLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if it's an internal documentation link (not http/https)
    if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
      if (docTree && onDocSelect) {
        const resolvedPath = resolveDocPath(href, currentDocPath, docTree);
        if (resolvedPath) {
          e.preventDefault();
          onDocSelect(resolvedPath);
          return;
        }
      }
    }
    // Let external links and anchors work normally
  };

  return (
    <div className="prose prose-invert prose-violet max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Headings
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold text-white mt-8 mb-4 border-b border-violet-500/30 pb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold text-white mt-6 mb-3 border-b border-violet-500/20 pb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold text-violet-300 mt-5 mb-2" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-medium text-violet-300 mt-4 mb-2" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-base font-medium text-gray-300 mt-3 mb-1" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-sm font-medium text-gray-400 mt-2 mb-1" {...props} />
          ),
          // Paragraphs
          p: ({ node, ...props }) => (
            <p className="text-gray-300 leading-7 mb-4" {...props} />
          ),
          // Links
          a: ({ node, href, ...props }: any) => {
            const isInternalDoc = href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#');
            const resolvedPath = isInternalDoc && docTree ? resolveDocPath(href, currentDocPath, docTree) : null;
            const isClickable = resolvedPath && onDocSelect;

            return (
              <a
                href={isClickable ? '#' : href}
                className="text-violet-400 hover:text-violet-300 underline transition-colors cursor-pointer"
                onClick={(e) => handleLinkClick(href, e)}
                {...props}
              />
            );
          },
          // Lists
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300 ml-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300 ml-4" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-gray-300" {...props} />
          ),
          // Code blocks
          code: ({ node, className, children, ...props }: any) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 bg-violet-900/30 text-violet-300 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => (
            <pre
              className="bg-gray-900/50 border border-violet-500/20 rounded-lg p-4 overflow-x-auto mb-4"
              {...props}
            />
          ),
          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-violet-500 pl-4 italic text-gray-400 my-4"
              {...props}
            />
          ),
          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-violet-500/20" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-violet-900/20" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="border-b border-violet-500/20" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-2 text-left font-semibold text-white border border-violet-500/20" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-2 text-gray-300 border border-violet-500/20" {...props} />
          ),
          // Horizontal rule
          hr: ({ node, ...props }) => (
            <hr className="border-violet-500/30 my-6" {...props} />
          ),
          // Images
          img: ({ node, ...props }) => (
            <img className="rounded-lg my-4 max-w-full" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

