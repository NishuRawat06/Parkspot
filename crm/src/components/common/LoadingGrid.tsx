interface LoadingGridProps {
  count?: number;
}

export function LoadingGrid({ count = 4 }: LoadingGridProps) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[330px] animate-pulse border-4 border-black bg-text-100"
        />
      ))}
    </div>
  );
}
