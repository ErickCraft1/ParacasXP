import { useMemo, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

interface Reservation {
  tour: string;
  date: string;
  time: string;
  people: number;
  meetingPoint: string;
}

const reservations: Reservation[] = [
  { tour: "Islas Ballestas", date: "12/06/2026", time: "08:00", people: 2, meetingPoint: "Puerto Paracas" },
  { tour: "Reserva de Paracas", date: "13/06/2026", time: "09:30", people: 4, meetingPoint: "Centro de Visitantes" },
  { tour: "City Tour", date: "14/06/2026", time: "10:45", people: 3, meetingPoint: "Plazuela Belen" },
  { tour: "Yaku Park", date: "12/07/2026", time: "09:00", people: 12, meetingPoint: "Hotel 1" },
  { tour: "Islas Ballestas", date: "15/08/2026", time: "07:00", people: 8, meetingPoint: "Gomonal" },
  { tour: "Yaku Park", date: "20/05/2026", time: "14:00", people: 4, meetingPoint: "Hotel 2" },
  { tour: "Full Day", date: "01/03/2026", time: "13:20", people: 1, meetingPoint: "Peru Bus" },
  { tour: "Full Day", date: "14/12/2026", time: "15:35", people: 10, meetingPoint: "Cruz de Sur" },
];

function UpcomingReservationsPage() {
  const [search, setSearch] = useState("");
  const [nextOnly, setNextOnly] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const visibleReservations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return reservations.filter((reservation) => {
      const matchesSearch =
        !normalizedSearch ||
        reservation.tour.toLowerCase().includes(normalizedSearch) ||
        reservation.meetingPoint.toLowerCase().includes(normalizedSearch) ||
        reservation.date.includes(normalizedSearch);
      const matchesFilter =
        !nextOnly || reservation.people <= 4;

      return matchesSearch && matchesFilter;
    });
  }, [search, nextOnly]);

  return (
    <div className="flex min-h-screen flex-col bg-[#4b8eb7] lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminHeader title="Próximas Reservas" />
        <main className="min-h-[calc(100vh-68px)] bg-[#4b8eb7] px-6 py-10 lg:px-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-lg font-semibold text-white">
              Consulta tus próximos servicios programados
            </p>
            <div className="flex items-center gap-3">
              <button
                className={`rounded px-3 py-2 text-sm font-semibold text-white ${
                  nextOnly ? "bg-[#2563eb]" : "bg-[#ef4f55]"
                }`}
                onClick={() => setNextOnly((current) => !current)}
                type="button"
              >
                <span aria-hidden="true">≡ </span>
                {nextOnly ? "Todas" : "Ninguno"}
              </button>
              <label className="relative block">
                <span className="sr-only">Buscar reservas</span>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333]">⌕</span>
                <input
                  className="h-11 w-72 rounded-full border border-[#333] bg-white py-2 pl-10 pr-4 text-[#333] outline-none"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar"
                  type="search"
                  value={search}
                />
              </label>
            </div>
          </div>

          <section className="border-2 border-[#333] bg-[#ef4f55] p-8">
            <h2 className="mb-6 text-lg font-semibold text-white">
              Lista de las próximas reservas
            </h2>
            <div className="overflow-x-auto bg-[#d9d9d9]">
              <table className="w-full min-w-[760px] border-collapse text-center text-sm text-[#333]">
                <thead>
                  <tr>
                    {["Tour", "Fecha", "Hora", "Pax", "Punto de encuentro", "Acción"].map((heading) => (
                      <th className="border border-[#777] px-3 py-3 font-semibold" key={heading}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleReservations.map((reservation) => (
                    <tr key={`${reservation.tour}-${reservation.date}-${reservation.time}`}>
                      <td className="border border-[#777] px-3 py-4">{reservation.tour}</td>
                      <td className="border border-[#777] px-3 py-4">{reservation.date}</td>
                      <td className="border border-[#777] px-3 py-4">{reservation.time}</td>
                      <td className="border border-[#777] px-3 py-4">{reservation.people}</td>
                      <td className="border border-[#777] px-3 py-4">{reservation.meetingPoint}</td>
                      <td className="border border-[#777] px-3 py-3">
                        <button
                          className="rounded-md border border-[#2563eb] bg-[#8bb7e9] px-4 py-2 text-sm font-semibold text-white"
                          onClick={() => setSelectedReservation(reservation)}
                          type="button"
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visibleReservations.length === 0 && (
                <p className="py-8 text-center text-[#333]">
                  No se encontraron reservas.
                </p>
              )}
            </div>
          </section>
        </main>
      </div>

      {selectedReservation && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2937]/55 p-4"
          role="dialog"
        >
          <section className="w-full max-w-xl border-2 border-[#333] bg-white p-5 text-[#333] shadow-xl">
            <h2 className="border-b border-[#333] pb-3 text-base font-bold">
              Detalle de la Reserva
            </h2>
            <div className="space-y-1 py-5 text-sm">
              <p><strong>Nombre de tour:</strong> {selectedReservation.tour}</p>
              <p><strong>Cliente:</strong> Juan Pérez</p>
              <p><strong>Fecha:</strong> {selectedReservation.date}</p>
              <p><strong>Hora de recojo:</strong> {selectedReservation.time}</p>
              <p><strong>Hora de compra:</strong> 05/06/2026 14:20</p>
              <p><strong>Pax:</strong> {selectedReservation.people} Adultos</p>
              <p><strong>Punto de encuentro:</strong> {selectedReservation.meetingPoint}</p>
              <p><strong>Medio de pago:</strong> Visa **** 1234</p>
            </div>
            <div className="flex justify-end gap-3 border-t border-[#333] pt-3">
              <button
                className="rounded border border-[#333] bg-[#ef4f55] px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setSelectedReservation(null)}
                type="button"
              >
                Cerrar
              </button>
              <button
                className="rounded border border-[#2563eb] bg-[#8bb7e9] px-4 py-2 text-sm font-semibold text-white"
                onClick={() => window.print()}
                type="button"
              >
                Imprimir
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default UpcomingReservationsPage;
