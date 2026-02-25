export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 h-4 w-32 animate-pulse rounded bg-surface" />
        <div className="mb-6 h-8 w-52 animate-pulse rounded bg-surface" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="h-3 w-8 animate-pulse rounded bg-surface" />
              <div className="mt-2 h-5 w-20 animate-pulse rounded bg-surface" />
              <div className="mt-1 h-3 w-12 animate-pulse rounded bg-surface" />
              <div className="mt-3 flex gap-4">
                <div className="h-3 w-24 animate-pulse rounded bg-surface" />
                <div className="h-3 w-16 animate-pulse rounded bg-surface" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
