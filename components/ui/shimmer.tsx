import { cn } from "@/lib/utils";

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

/**
 * Shimmer loading effect component
 */
export function Shimmer({ className, width = "100%", height = "1rem", ...props }: ShimmerProps) {
  return (
    <div
      className={cn(
        "animate-shimmer bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]",
        className
      )}
      style={{ width, height }}
      {...props}
    />
  );
}

