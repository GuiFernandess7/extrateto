import { ChartSkeleton, TableSkeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 h-4 w-32 animate-pulse rounded bg-surface" />
        <div className="mb-8 h-8 w-64 animate-pulse rounded bg-surface" />
        <ChartSkeleton />
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
        <div className="mt-6">
          <TableSkeleton rows={15} />
        </div>
      </div>
    </div>
  );
}
