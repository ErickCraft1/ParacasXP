import { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

type ReturnStatus =
  | "Todos"
  | "En Proceso"
  | "Para Confirmar"
  | "Pendientes"
  | "Realizados";

interface ReturnItem {
  ticket: string;
  tourist: string;
  status: Exclude<ReturnStatus, "Todos">;
  tour: string;
  date: string;
  people: number;
  receipt: string;
  amount: number;
  action: "confirm" | "verification" | "download";
}

const returns: ReturnItem[] = [
  {
    ticket: "TRIP-9042",
    tourist: "Luis C.",
    status: "Para Confirmar",
    tour: "Tour 1 - Tour 2",
    date: "15/12/2026",
    people: 2,
    receipt: "CP-000001",
    amount: 180,
    action: "confirm",
  },
  {
    ticket: "TRIP-9060",
    tourist: "Andre R.",
    status: "En Proceso",
    tour: "Tour 1 - Tour 4",
    date: "20/12/2026",
    people: 1,
    receipt: "CP-000007",
    amount: 90,
    action: "verification",
  },
  {
    ticket: "TRIP-9033",
    tourist: "José J.",
    status: "Realizados",
    tour: "Tour 1 - Tour 3",
    date: "08/12/2026",
    people: 5,
    receipt: "CP-000002",
    amount: 230,
    action: "download",
  },
];

const filterLabels: ReturnStatus[] = [
  "Todos",
  "En Proceso",
  "Para Confirmar",
  "Pendientes",
  "Realizados",
];

function ReturnsPage() {
  const [activeFilter, setActiveFilter] = useState<ReturnStatus>("Todos");

  const getFilterCount = (filter: ReturnStatus) =>
    filter === "Todos"
      ? returns.length
      : returns.filter((item) => item.status === filter).length;

  const filters = filterLabels.map((label) => ({
    label,
    count: getFilterCount(label),
  }));

  const visibleReturns =
    activeFilter === "Todos"
      ? returns
      : returns.filter((item) => item.status === activeFilter);

  return (
    <div className="flex min-h-screen flex-col bg-[#4b8eb7] lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminHeader title="Devoluciones" />
        <main className="min-h-[calc(100vh-68px)] bg-[#4b8eb7] px-6 py-10 lg:px-20">
          <h2 className="mb-5 text-xl font-semibold text-white">
            Lista de devoluciones
          </h2>

          <div className="mb-5 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                className={`rounded px-4 py-2 text-sm font-semibold text-white ${
                  activeFilter === filter.label
                    ? "bg-[#8bb7e9] text-[#333]"
                    : "bg-[#ef4f55]"
                }`}
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                type="button"
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {visibleReturns.map((item) => (
              <article
                className="grid border-2 border-[#333] bg-[#ef4f55] px-5 py-5 text-white md:grid-cols-[180px_1fr_170px] md:items-center"
                key={item.ticket}
              >
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold">{item.ticket}</h3>
                    <span className="border border-white bg-[#d9d9d9] px-3 py-1 text-sm text-[#333]">
                      {item.status}
                    </span>
                  </div>
                  <p className="mb-2 text-sm font-semibold">
                    Turista: {item.tourist}
                  </p>
                  <p className="text-sm">{item.tour}</p>
                  <p className="mt-3 text-sm">Fecha de tour: {item.date}</p>
                </div>

                <div className="mt-4 text-sm md:mt-0">
                  <p>Pax {item.people}</p>
                  <p className="mt-3">Comprobante asociado: {item.receipt}</p>
                  <p className="mt-1">
                    Monto a devolver: S/. {item.amount.toFixed(2)}
                  </p>
                </div>

                <div className="mt-4 flex justify-end md:mt-0">
                  {item.action === "confirm" && (
                    <button
                      className="min-w-36 rounded border border-[#2563eb] bg-[#8bb7e9] px-4 py-3 font-semibold text-white"
                      type="button"
                    >
                      ✓ Confirmar devolución
                    </button>
                  )}
                  {item.action === "verification" && (
                    <button
                      className="min-w-36 rounded border border-[#333] bg-[#d9d9d9] px-4 py-3 text-[#777]"
                      type="button"
                    >
                      En Verificación
                    </button>
                  )}
                  {item.action === "download" && (
                    <button
                      className="min-w-36 rounded border border-[#2563eb] bg-[#8bb7e9] px-4 py-3 font-semibold text-white"
                      type="button"
                    >
                      ↻ Descargar devolución
                    </button>
                  )}
                </div>
              </article>
            ))}

            {visibleReturns.length === 0 && (
              <p className="border-2 border-[#333] bg-white px-5 py-8 text-center text-[#333]">
                No hay devoluciones en este estado.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ReturnsPage;
