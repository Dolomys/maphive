import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("flex space-x-2 justify-center items-center", className)}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "w-3 h-3 bg-primary rounded-full animate-bounce",
            i === 1 && "animation-delay-0",
            i === 2 && "animation-delay-150",
            i === 3 && "animation-delay-300"
          )}
        />
      ))}
    </div>
  );
};
