export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-[200px]">
      <div className="flex gap-2 justify-center">
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:-0.32s]" />
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:-0.16s]" />
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce" />
      </div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;