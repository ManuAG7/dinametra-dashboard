type Props = {
  text?: string;
};

export default function LoadingState({ text = "Cargando..." }: Props) {
  return (
    <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-slate-800">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300/40 border-t-slate-200" />
        <p className="text-sm text-slate-200">{text}</p>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-800" />
      </div>
    </div>
  );
}