import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "critical" | "success";
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      title,
      value,
      trend,
      actionLabel,
      onAction,
      icon,
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    const trendColors = {
      up: "text-green-400",
      down: "text-red-400",
      neutral: "text-gray-400",
    };

    const variantStyles = {
      default: "",
      critical: "border-red-500/30 bg-red-600/10",
      success: "border-green-500/30 bg-green-600/10",
    };

    return (
      <Card
        ref={ref}
        className={cn("scanner-section-primary", variantStyles[variant], className)}
        {...props}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-300 uppercase tracking-wide">
              {title}
            </CardTitle>
            {icon && <div className="text-violet-400">{icon}</div>}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <p className="text-5xl font-bold text-white">{value}</p>
            {trend && (
              <p
                className={cn(
                  "text-sm flex items-center gap-1",
                  trendColors[trend.direction]
                )}
              >
                {trend.direction === "up" && <ArrowUp className="h-4 w-4" />}
                {trend.direction === "down" && (
                  <ArrowDown className="h-4 w-4" />
                )}
                {trend.direction === "neutral" && (
                  <ArrowRight className="h-4 w-4" />
                )}
                {trend.value}
              </p>
            )}
          </div>
        </CardContent>
        {actionLabel && (
          <CardFooter>
            <Button
              variant="link"
              onClick={onAction}
              className="text-violet-400 hover:text-violet-300 p-0 h-auto"
            >
              {actionLabel} <ArrowRight className="ml-1 h-4 w-4 inline" />
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }
);
MetricCard.displayName = "MetricCard";

export { MetricCard };



