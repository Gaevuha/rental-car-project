// app/catalog/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong with filters!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
