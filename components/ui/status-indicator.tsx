import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "online" | "offline" | "warning" | "loading";
  label?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  online: {
    color: "text-green-400",
    bgColor: "bg-green-500",
    icon: CheckCircle2,
    label: "Online",
  },
  offline: {
    color: "text-red-400",
    bgColor: "bg-red-500",
    icon: XCircle,
    label: "Offline",
  },
  warning: {
    color: "text-orange-400",
    bgColor: "bg-orange-500",
    icon: AlertCircle,
    label: "Warning",
  },
  loading: {
    color: "text-gray-400",
    bgColor: "bg-gray-500",
    icon: Loader2,
    label: "Loading",
  },
};

const sizeConfig = {
  sm: {
    dot: "h-2 w-2",
    icon: "h-3 w-3",
    text: "text-xs",
  },
  md: {
    dot: "h-2.5 w-2.5",
    icon: "h-4 w-4",
    text: "text-sm",
  },
  lg: {
    dot: "h-3 w-3",
    icon: "h-5 w-5",
    text: "text-base",
  },
};

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  (
    {
      status,
      label,
      showIcon = false,
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    const sizes = sizeConfig[size];
    const displayLabel = label || config.label;

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {showIcon ? (
          <Icon
            className={cn(
              config.color,
              sizes.icon,
              status === "loading" && "animate-spin"
            )}
          />
        ) : (
          <div
            className={cn(
              config.bgColor,
              sizes.dot,
              "rounded-full",
              status === "loading" && "animate-pulse"
            )}
          />
        )}
        {displayLabel && (
          <span className={cn(config.color, sizes.text, "font-medium")}>
            {displayLabel}
          </span>
        )}
      </div>
    );
  }
);

StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator };



