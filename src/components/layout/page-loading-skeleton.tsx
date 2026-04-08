import { Skeleton } from "@/components/ui/skeleton";

export function PageLoadingSkeleton() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl space-y-6 px-4">
        <Skeleton className="h-8 w-44 rounded-full" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-5 w-1/2" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[360px] rounded-2xl" />
          <Skeleton className="h-[360px] rounded-2xl" />
          <Skeleton className="h-[360px] rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
