export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
    <div  className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
        <span className="h-3 w-3 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
        <span className="h-3 w-3 rounded-full bg-muted-foreground animate-bounce" />
      </div>
    </div>
  );
}
