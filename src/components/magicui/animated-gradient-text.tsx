"use client";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedGradientText({ children, className }: Props) {
  return (
    <span
      className={cn(
        "animate-gradient bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-[length:200%_auto] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
