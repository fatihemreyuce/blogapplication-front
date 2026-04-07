import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  squares?: [number, number][];
};

export function GridPattern({ className, squares }: Props) {
  const id = "grid-pattern";

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-none stroke-border/50 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)]",
        className
      )}
    >
      <defs>
        <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M0 32V0H32" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

      {/* Vurgulanan kareler */}
      {squares?.map(([col, row]) => (
        <rect
          key={`${col}-${row}`}
          width="31"
          height="31"
          x={col * 32 + 1}
          y={row * 32 + 1}
          className="fill-primary/5 stroke-primary/20"
          strokeWidth={1}
          rx={2}
        />
      ))}
    </svg>
  );
}
