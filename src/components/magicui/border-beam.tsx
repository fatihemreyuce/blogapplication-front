"use client";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  size?: number;
};

/**
 * Bir elementi çevreleyen dönen gradient ışık efekti.
 * Parent element'in `position: relative` ve `overflow: hidden` olması gerekir.
 */
export function BorderBeam({
  className,
  duration = 6,
  colorFrom = "#8b5cf6",
  colorTo = "#34d399",
  size = 80,
}: Props) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={
        {
          "--duration": `${duration}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--size": `${size}px`,
        } as React.CSSProperties
      }
    >
      {/* Dönen ışık - offset-path ile kenar boyunca hareket eder */}
      <div
        className="absolute"
        style={{
          width: `var(--size)`,
          height: `var(--size)`,
          background: `radial-gradient(circle, var(--color-from), var(--color-to), transparent 70%)`,
          offsetPath: `rect(0 auto auto 0 round 0px)`,
          offsetDistance: "0%",
          animation: `border-beam var(--duration) linear infinite`,
          filter: "blur(4px)",
          opacity: 0.7,
        }}
      />
    </div>
  );
}
