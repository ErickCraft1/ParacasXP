const reservations = [
  ["Islas Ballestas", "Luis C.", "24/10/2026", "QR", "2"],
  ["Reserva de Paracas", "Andre R.", "12/11/2026", "Tarjeta", "1"],
  ["Huacachina", "José J.", "15/10/2026", "Transferencia", "4"],
  ["Full Day", "Juan H.", "31/12/2026", "Tarjeta", "6"],
  ["Yaku Park", "Erick M.", "15/01/2027", "QR", "18"],
];

const headings = ["Nombre Tour", "Nombre Turista", "Fecha de Reserva", "Medio de Pago", "Pax"];

function ReservationsTable() {
  return (
    <section className="bg-[#4b8eb7] p-8 text-white xl:col-span-2">
      <div className="mb-5 flex justify-end gap-2">
        <button className="rounded-md bg-[#ef5b62] px-3 py-1.5 text-base font-semibold shadow-sm" type="button">
          Ver detalles
        </button>
        <button className="rounded-md bg-[#ef5b62] px-3 py-1.5 text-base font-semibold shadow-sm" type="button">
          Descargar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-center text-base">
          <thead>
            <tr className="bg-[#d6d6d6] text-[#333]">
              {headings.map((heading) => (
                <th className="border border-[#333] px-2 py-2 font-normal" key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr className="even:bg-[#f0f0f0] odd:bg-[#d9d9d9] text-[#333]" key={reservation[0]}>
                {reservation.map((value) => (
                  <td className="border border-[#333] px-2 py-2" key={`${reservation[0]}-${value}`}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="mt-7 text-center text-3xl font-bold tracking-tight">Últimas Reservas</h2>
    </section>
  );
}

export default ReservationsTable;
