import { render, screen, within } from "@testing-library/react";
import KpiCard from "./KpiCard";

describe("KpiCard", () => {
  it("renderiza el título", () => {
    render(<KpiCard title="Precio" value={100} suffix=" USD" />);
    expect(screen.getByText("Precio")).toBeInTheDocument();
  });

  it("muestra '...' cuando loading=true", () => {
    render(<KpiCard title="Precio" value={100} suffix=" USD" loading />);
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("muestra '—' cuando value es null", () => {
    render(<KpiCard title="Precio" value={null} suffix=" USD" loading={false} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("muestra el valor formateado con sufijo cuando value existe (valor visible)", () => {
    const { container } = render(
      <KpiCard title="Precio" value={12784} suffix=" USD" loading={false} />
    );

    // El valor visible es el <p class="mt-2 ...">
    const valueEl = container.querySelector("p.mt-2");
    expect(valueEl).toBeInTheDocument();
    expect(valueEl).toHaveTextContent("12,784 USD");
  });

  it("usa displayValue cuando viene", () => {
    render(
      <KpiCard
        title="Market Cap"
        value={1459183889341}
        displayValue="1.45T"
        suffix=" USD"
        loading={false}
      />
    );

    // displayValue sólo aparece en el valor visible, no en tooltip
    expect(screen.getByText("1.45T USD")).toBeInTheDocument();
  });

  it("aplica clase de tono positivo", () => {
    const { container } = render(
      <KpiCard title="Cambio 24h" value={2.69} suffix=" %" tone="positive" loading={false} />
    );
    const valueEl = container.querySelector("p.mt-2");
    expect(valueEl).toHaveClass("text-emerald-400");
  });

  it("aplica clase de tono negativo", () => {
    const { container } = render(
      <KpiCard title="Cambio 24h" value={-0.99} suffix=" %" tone="negative" loading={false} />
    );
    const valueEl = container.querySelector("p.mt-2");
    expect(valueEl).toHaveClass("text-rose-400");
  });

  it("NO renderiza tooltip cuando loading=true", () => {
    render(<KpiCard title="Market Cap" value={1459183889341} suffix=" USD" loading={true} />);
    expect(screen.queryByText(/Valor completo:/i)).not.toBeInTheDocument();
  });

  it("NO renderiza tooltip cuando value es null", () => {
    render(<KpiCard title="Market Cap" value={null} suffix=" USD" loading={false} />);
    expect(screen.queryByText(/Valor completo:/i)).not.toBeInTheDocument();
  });

  it("SÍ renderiza tooltip en el DOM cuando value existe y loading=false (aunque esté hidden por CSS)", () => {
    const { container } = render(
      <KpiCard title="Market Cap" value={1459183889341} suffix=" USD" loading={false} />
    );

    // Encuentra el contenedor del tooltip (tiene el texto "Valor completo:")
    const tooltipLabel = screen.getByText(/Valor completo:/i);
    expect(tooltipLabel).toBeInTheDocument();

    // Subimos al div del tooltip (parentElement) y verificamos el valor ahí dentro
    const tooltipDiv = tooltipLabel.parentElement;
    expect(tooltipDiv).toBeInTheDocument();

    // Busca el valor específicamente dentro del tooltip
    expect(within(tooltipDiv!).getByText("1,459,183,889,341 USD")).toBeInTheDocument();

    // Bonus: asegúrate de que en el DOM hay 2 apariciones del valor (visible + tooltip)
    const all = container.querySelectorAll("*");
    // (no necesario, solo por claridad; lo importante es el within)
  });
});