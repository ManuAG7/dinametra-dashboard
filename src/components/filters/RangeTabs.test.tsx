import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RangeTabs from "./RangeTabs";

describe("RangeTabs", () => {
  it("renderiza los 4 rangos", () => {
    render(<RangeTabs value={30} onChange={() => {}} />);

    expect(screen.getByRole("button", { name: "1 día" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1 semana" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1 mes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1 año" })).toBeInTheDocument();
  });

  it("llama onChange con el valor correcto al hacer click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<RangeTabs value={30} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "1 día" }));
    expect(onChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByRole("button", { name: "1 semana" }));
    expect(onChange).toHaveBeenCalledWith(7);

    await user.click(screen.getByRole("button", { name: "1 año" }));
    expect(onChange).toHaveBeenCalledWith(365);
  });

  it("marca como activo el botón que corresponde al value", () => {
    render(<RangeTabs value={7} onChange={() => {}} />);

    const activeBtn = screen.getByRole("button", { name: "1 semana" });
    const inactiveBtn = screen.getByRole("button", { name: "1 mes" });

    expect(activeBtn.className).toContain("bg-emerald-500/15");
    expect(activeBtn.className).toContain("text-emerald-300");
    expect(activeBtn.className).toContain("ring-emerald-400/40");

    expect(inactiveBtn.className).toContain("bg-slate-900");
    expect(inactiveBtn.className).toContain("text-slate-200");
    expect(inactiveBtn.className).toContain("ring-slate-700");
  });
});