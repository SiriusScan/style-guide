import React from "react";

/**
 * PageLayout Props - REQUIRED PATTERN for all page layouts
 * 
 * This is the standard data flow pattern for parent-child components.
 * - title: Page title for SEO and header
 * - description: Optional page description
 * - children: Page content
 * - className: Optional additional styling
 */
export interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * PageLayout - Standard full-page wrapper component
 * 
 * USAGE PATTERN:
 * - All full pages should use this layout
 * - Handles consistent spacing, background, and structure
 * - Provides hex grid pattern background
 * - Centers content with max-width constraints
 * 
 * @example
 * ```tsx
 * <PageLayout title="Dashboard" description="View your scanner metrics">
 *   <ContentSection title="Metrics">
 *     ...content...
 *   </ContentSection>
 * </PageLayout>
 * ```
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children,
  className = "",
}) => {
  return (
    <div className={`min-h-screen bg-[#1c1e30] ${className}`}>
      <div className="relative z-10 w-full">
        {/* Page Header */}
        <header className="px-4 py-8 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {title}
            </h1>
            {description && (
              <p className="text-lg md:text-xl text-gray-300">
                {description}
              </p>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="px-4 pb-12 md:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;


