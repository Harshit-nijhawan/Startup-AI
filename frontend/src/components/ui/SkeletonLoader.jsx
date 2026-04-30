/**
 * Skeleton shimmer placeholder card shown during loading
 */
function SkeletonLine({ width = 'w-full', height = 'h-3' }) {
  return <div className={`skeleton ${width} ${height}`} />;
}

function SkeletonCard({ lines = 4 }) {
  return (
    <div
      className="result-card rounded-2xl border-t-2 p-6 flex flex-col gap-4"
      style={{ borderTopColor: 'var(--border)' }}
    >
      {/* fake header */}
      <div className="flex items-center gap-3">
        <div className="skeleton w-9 h-9 rounded-xl" />
        <SkeletonLine width="w-36" height="h-4" />
      </div>

      {/* fake rows */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 py-3 border-b last:border-b-0"
               style={{ borderColor: 'var(--border)' }}>
            <SkeletonLine width="w-20" height="h-3" />
            <SkeletonLine width="w-full" height="h-3" />
            <SkeletonLine width="w-4/5" height="h-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
      <SkeletonCard lines={4} />
      <SkeletonCard lines={4} />
      <SkeletonCard lines={3} />
    </div>
  );
}
