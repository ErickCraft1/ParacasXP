import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

type Period = "Día" | "Mes" | "Año";

interface SalesItem {
  name: string;
  value: number;
  color: string;
}

const salesByPeriod: Record<Period, SalesItem[]> = {
  Día: [
    { name: "Islas Ballestas", value: 42, color: "#2563eb" },
    { name: "Reserva Nacional\nde Paracas", value: 50, color: "#14b8a6" },
    { name: "Full Day", value: 56, color: "#f59e0b" },
  ],
  Mes: [
    { name: "Islas Ballestas", value: 168, color: "#2563eb" },
    { name: "Reserva Nacional\nde Paracas", value: 214, color: "#14b8a6" },
    { name: "Full Day", value: 246, color: "#f59e0b" },
  ],
  Año: [
    { name: "Islas Ballestas", value: 1840, color: "#2563eb" },
    { name: "Reserva Nacional\nde Paracas", value: 2310, color: "#14b8a6" },
    { name: "Full Day", value: 2680, color: "#f59e0b" },
  ],
};

function isPeriod(value: string): value is Period {
  return value === "Día" || value === "Mes" || value === "Año";
}

function SalesChart() {
  const [period, setPeriod] = useState<Period>("Día");
  const sales = salesByPeriod[period];

  return (
    <section className="flex min-h-[520px] flex-col bg-[#4b8eb7] p-8 text-white">
      <div className="flex justify-between">
        <select
          aria-label="Periodo del gráfico"
          className="rounded-md bg-[#ef5b62] px-2 py-1.5 text-base font-semibold outline-none"
          onChange={(event) => {
            if (isPeriod(event.target.value)) {
              setPeriod(event.target.value);
            }
          }}
          value={period}
        >
          <option>Día</option>
          <option>Mes</option>
          <option>Año</option>
        </select>
        <div className="flex gap-2">
          <button className="rounded-md bg-[#ef5b62] px-3 py-1.5 text-base font-semibold shadow-sm" type="button">Ver detalles</button>
          <button className="rounded-md bg-[#ef5b62] px-3 py-1.5 text-base font-semibold shadow-sm" type="button">Descargar</button>
        </div>
      </div>
      <div className="mt-4 min-h-0 flex-1">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart data={sales} margin={{ bottom: 40, left: 8, right: 8, top: 20 }}>
            <CartesianGrid horizontal={false} stroke="#2f3740" />
            <XAxis
              axisLine={{ stroke: "#2f3740", strokeWidth: 3 }}
              dataKey="name"
              tick={{ fill: "#f8fafc", fontSize: 15, fontWeight: 600 }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "none",
                borderRadius: "8px",
                color: "#1f2937",
                fontSize: "14px",
              }}
            />
            <Bar dataKey="value" maxBarSize={56} radius={[5, 5, 0, 0]}>
              {sales.map((item) => (
                <Cell fill={item.color} key={item.name} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h2 className="text-center text-3xl font-bold tracking-tight">
        Tours - Paquetes
        <br />
        más vendidos
      </h2>
    </section>
  );
}

export default SalesChart;