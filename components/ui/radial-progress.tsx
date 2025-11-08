import * as React from "react";
import { cn } from "@/lib/utils";

interface RadialProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  textColor?: string;
  labelColor?: string;
}

const RadialProgress = React.forwardRef<HTMLDivElement, RadialProgressProps>(
  (
    {
      score,
      label,
      size = 120,
      strokeWidth = 10,
      progressColor = "stroke-orange-500",
      backgroundColor = "stroke-gray-700",
      textColor = "text-white",
      labelColor = "text-gray-400",
      className,
      ...props
    },
    ref
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div
        ref={ref}
        className={cn("relative flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg className="absolute top-0 left-0" width={size} height={size}>
          <circle
            className={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={cn(progressColor, "transition-all duration-500 ease-out")}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="flex flex-col items-center justify-center z-10">
          <span className={cn("text-3xl font-bold", textColor)}>{score}</span>
          <span className={cn("text-sm", labelColor)}>{label}</span>
        </div>
      </div>
    );
  }
);

RadialProgress.displayName = "RadialProgress";

export { RadialProgress };

