import { cn } from "~/lib/utils";

export default function Loader({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-[3px]",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-muted border-t-primary",
        sizes[size],
        className
      )}
    />
  );
}
