type Props = {
  title?: string;
  text?: string;
  actionText?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title = "Sin datos",
  text = "No hay información para mostrar con los filtros actuales.",
  actionText = "Restablecer filtros",
  onAction,
}: Props) {
  return (
    <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-slate-800">
      <p className="text-sm font-semibold text-slate-200">{title}</p>
      <p className="mt-1 text-sm text-slate-300">{text}</p>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-3 rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white ring-1 ring-slate-700 hover:bg-slate-700/60"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}