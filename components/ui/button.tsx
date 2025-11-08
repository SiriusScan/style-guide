import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30",
        outline:
          "border-2 border-violet-500/50 bg-transparent text-gray-200 hover:bg-violet-500/10 hover:border-violet-500/80 hover:text-white shadow-sm hover:shadow-md hover:shadow-violet-500/10",
        secondary: "bg-gray-800 border border-violet-500/30 text-white hover:bg-gray-700 hover:border-violet-500/50 shadow-md hover:shadow-lg hover:shadow-violet-500/10",
        ghost: "text-gray-200 border border-transparent hover:bg-violet-500/10 hover:text-violet-400 hover:border-violet-500/20 focus-visible:border-violet-500/30 focus-visible:bg-violet-500/10",
        link: "text-violet-400 underline-offset-4 hover:underline hover:text-violet-300 hover:bg-violet-500/10 focus-visible:bg-violet-500/10 focus-visible:underline rounded-md",
      },
      size: {
        none: "",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

