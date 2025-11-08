import * as React from "react";
import { cn } from "@/lib/utils";

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          "relative rounded bg-violet-500/20 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-violet-300",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }
);
InlineCode.displayName = "InlineCode";

export { InlineCode };

