import CryptoSelect, { type CryptoOption } from "./CryptoSelect";
import CurrencySelect, { type CurrencyOption } from "./CurrencySelect";

type Props = {
  coinId: string;
  vs: string;
  coins: CryptoOption[];

  onCoinChange: (v: string) => void;
  onVsChange: (v: string) => void;
};

const CURRENCIES: CurrencyOption[] = [
  { value: "usd", label: "USD", sublabel: "Dólar (USA)", icon: "🇺🇸" },
  { value: "mxn", label: "MXN", sublabel: "Peso (México)", icon: "🇲🇽" },
  { value: "eur", label: "EUR", sublabel: "Euro (UE)", icon: "🇪🇺" },
];

export default function FiltersBar({
  coinId,
  vs,
  coins,
  onCoinChange,
  onVsChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <CryptoSelect
        label="Cripto"
        value={coinId}
        options={coins}
        onChange={onCoinChange}
        disabled={coins.length === 0}
      />

      <CurrencySelect
        label="Moneda"
        value={vs}
        options={CURRENCIES}
        onChange={onVsChange}
      />
    </div>
  );
}