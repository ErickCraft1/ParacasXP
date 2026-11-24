import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PaymentMethod {
  name: string;
  value: number;
  color: string;
}

const paymentMethods: PaymentMethod[] = [
  { name: "Tarjeta", value: 35, color: "#2563eb" },
  { name: "QR", value: 20, color: "#14b8a6" },
  { name: "Transferencia", value: 30, color: "#f59e0b" },
  { name: "Efectivo", value: 15, color: "#f97316" },
];

function PaymentMethodsChart() {
  return (
    <section className="flex min-h-[520px] flex-col bg-[#4b8eb7] p-8 text-white">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Medios de Pago más usado
        </h2>
        <div className="flex gap-2">
          <button
            className="rounded-md bg-[#ef5b62] px-3 py-1.5 text-base font-semibold shadow-sm"
            type="button"
          >
            Ver detalles
          </button>
          <button
            className="rounded-md bg-[#ef5b62] px-3 py-1.5 text-base font-semibold shadow-sm"
            type="button"
          >
            Descargar
          </button>
        </div>
      </div>

      <div
        aria-label="Distribución de medios de pago"
        className="min-h-72 flex-1"
      >
        <ResponsiveContainer height={280} width="100%">
          <PieChart>
            <Pie
              data={paymentMethods}
              dataKey="value"
              nameKey="name"
              outerRadius="70%"
              stroke="#e5e7eb"
              strokeWidth={2}
            >
              {paymentMethods.map((method) => (
                <Cell fill={method.color} key={method.name} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "none",
                borderRadius: "8px",
                color: "#1f2937",
                fontSize: "14px",
              }}
            />
            <Legend
              wrapperStyle={{ color: "#f8fafc", fontSize: "15px", fontWeight: 600 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default PaymentMethodsChart;