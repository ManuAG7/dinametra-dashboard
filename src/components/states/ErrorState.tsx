type Props = {
  title?: string;
  text?: string;
  code?: number | string;
  onRetry?: () => void;
  retryText?: string;
};

export default function ErrorState({
  title = "Ocurrió un error",
  text = "No pudimos cargar la información. Intenta de nuevo.",
  code,
  onRetry,
  retryText = "Reintentar",
}: Props) {
  const isRateLimit = String(code) === "429";

  return (
    <div
      role="alert"
      className={[
        "rounded-xl p-4 ring-1",
        isRateLimit
          ? "bg-amber-950/40 ring-amber-900 text-amber-200"
          : "bg-red-950/40 ring-red-900 text-red-200",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold">
            {isRateLimit ? "Demasiadas solicitudes (429)" : title}
          </p>
          <p className="mt-1 text-sm opacity-90">{text}</p>

          {code != null && (
            <p className="mt-2 text-xs opacity-70">Código: {code}</p>
          )}
        </div>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={[
              "shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ring-1 transition",
              isRateLimit
                ? "bg-amber-500/10 ring-amber-400/40 hover:bg-amber-500/15"
                : "bg-red-500/10 ring-red-400/40 hover:bg-red-500/15",
            ].join(" ")}
          >
            {retryText}
          </button>
        )}
      </div>

      {isRateLimit && (
        <p className="mt-3 text-xs opacity-80">
          Consejo: espera unos segundos antes de reintentar (CoinGecko aplica límite).
        </p>
      )}
    </div>
  );
}