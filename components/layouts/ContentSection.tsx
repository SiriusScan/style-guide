import React from "react";

/**
 * ContentSection Props - REQUIRED PATTERN for content sections
 * 
 * Standard props interface for content sections within pages.
 * - title: Section heading
 * - description: Optional section description
 * - children: Section content
 * - variant: Visual style variant
 * - className: Additional styling
 */
export interface ContentSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "hover";
  className?: string;
}

/**
 * ContentSection - Reusable section container with Sirius styling
 * 
 * USAGE PATTERN:
 * - Use within PageLayout for consistent section styling
 * - Variant "primary" for important sections
 * - Variant "hover" for interactive sections
 * - Always passes children down the component tree
 * 
 * @example
 * ```tsx
 * <ContentSection title="Scanner Results" variant="primary">
 *   <ResultsList data={results} />
 * </ContentSection>
 * ```
 */
export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  description,
  children,
  variant = "default",
  className = "",
}) => {
  const variantStyles = {
    default: "scanner-section",
    primary: "scanner-section-primary",
    hover: "scanner-section scanner-section-hover",
  };

  return (
    <section className={`${variantStyles[variant]} p-6 md:p-8 ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-violet-200 text-base md:text-lg">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="text-violet-100">
        {children}
      </div>
    </section>
  );
};

export default ContentSection;




