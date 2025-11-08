import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-800/50",
        "bg-gradient-to-r from-gray-800/50 via-violet-500/10 to-gray-800/50",
        "bg-[length:200%_100%] animate-shimmer",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

