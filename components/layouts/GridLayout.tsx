import React from "react";

/**
 * GridLayout Props - REQUIRED PATTERN for grid-based layouts
 * 
 * Defines standard grid layout interface.
 * - children: Grid items (components)
 * - columns: Responsive column configuration
 * - gap: Spacing between grid items
 * - className: Additional styling
 */
export interface GridLayoutProps {
  children: React.ReactNode;
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * GridLayout - Responsive grid container
 * 
 * USAGE PATTERN:
 * - Use for consistent grid layouts across the app
 * - Responsive by default (1 col mobile, 2 tablet, 3 desktop)
 * - Pass column components as children
 * - Grid items should be self-contained components
 * 
 * @example
 * ```tsx
 * <GridLayout columns={{ md: 2, lg: 3 }} gap="md">
 *   <MetricCard title="Scans" value={42} />
 *   <MetricCard title="Issues" value={7} />
 *   <MetricCard title="Fixed" value={35} />
 * </GridLayout>
 * ```
 */
export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = { default: 1, md: 2, lg: 3 },
  gap = "md",
  className = "",
}) => {
  // Build responsive grid classes
  const gridCols = {
    default: columns.default ? `grid-cols-${columns.default}` : "grid-cols-1",
    sm: columns.sm ? `sm:grid-cols-${columns.sm}` : "",
    md: columns.md ? `md:grid-cols-${columns.md}` : "",
    lg: columns.lg ? `lg:grid-cols-${columns.lg}` : "",
    xl: columns.xl ? `xl:grid-cols-${columns.xl}` : "",
  };

  const gapSizes = {
    sm: "gap-3",
    md: "gap-6",
    lg: "gap-8",
  };

  const gridClasses = [
    "grid",
    gridCols.default,
    gridCols.sm,
    gridCols.md,
    gridCols.lg,
    gridCols.xl,
    gapSizes[gap],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

export default GridLayout;




