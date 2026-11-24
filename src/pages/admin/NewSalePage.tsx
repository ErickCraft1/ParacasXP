import { useState } from "react";
import type { SyntheticEvent } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

function NewSalePage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#4b8eb7] lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminHeader title="Nueva Venta" />
        <main className="min-h-[calc(100vh-68px)] bg-[#4b8eb7] px-6 py-12 lg:px-12">
          <form
            className="mx-auto grid max-w-5xl grid-cols-1 gap-x-20 gap-y-7 text-white md:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-2 text-base font-semibold">
              Nombre
              <input
                className="h-11 border border-[#d1d5db] bg-white px-4 font-normal text-[#333] outline-none focus:border-[#2563eb]"
                name="name"
                placeholder="Enter name"
                required
                type="text"
              />
            </label>

            <label className="flex flex-col gap-2 text-base font-semibold">
              Correo
              <input
                className="h-11 border border-[#d1d5db] bg-white px-4 font-normal text-[#333] outline-none focus:border-[#2563eb]"
                name="email"
                placeholder="Enter contact info"
                required
                type="email"
              />
            </label>

            <label className="flex flex-col gap-2 text-base font-semibold">
              Fecha
              <input
                className="h-11 border border-[#d1d5db] bg-white px-4 font-normal text-[#333] outline-none focus:border-[#2563eb]"
                name="date"
                required
                type="date"
              />
            </label>

            <label className="flex flex-col gap-2 text-base font-semibold">
              Nombre del Tour
              <select
                className="h-11 border border-[#d1d5db] bg-white px-4 font-normal text-[#333] outline-none focus:border-[#2563eb]"
                defaultValue="Islas Ballestas"
                name="tour"
              >
                <option>Islas Ballestas</option>
                <option>Reserva de Paracas</option>
                <option>Huacachina</option>
                <option>Full Day</option>
              </select>
            </label>

            <div className="grid grid-cols-[1fr_1.7fr] gap-5">
              <label className="flex flex-col gap-2 text-base font-semibold">
                Cantidad de Personas
                <input
                  className="h-11 border border-[#d1d5db] bg-white px-4 font-normal text-[#333] outline-none focus:border-[#2563eb]"
                  defaultValue={1}
                  min={1}
                  name="people"
                  required
                  type="number"
                />
              </label>
              <label className="flex flex-col gap-2 text-base font-semibold">
                Teléfono
                <span className="flex h-11">
                  <select
                    className="flex items-center bg-[#ef5b62] px-3"
                    defaultValue="+51"
                    name="countryCode"
                  >
                    <option>+51</option>
                    <option>+01</option>
                    <option>+354</option>
                  </select>
                  <input
                    className="min-w-0 flex-1 border border-[#d1d5db] bg-white px-3 font-normal text-[#333] outline-none focus:border-[#2563eb]"
                    name="phone"
                    placeholder="9876543210"
                    required
                    type="tel"
                  />
                </span>
              </label>
            </div>

            <label className="flex flex-col gap-2 text-base font-semibold">
              Payment Method
              <select
                className="h-11 border border-[#d1d5db] bg-white px-4 font-normal text-[#333] outline-none focus:border-[#2563eb]"
                defaultValue="Credit Card"
                name="paymentMethod"
              >
                <option>Credit Card</option>
                <option>QR</option>
                <option>Transferencia</option>
                <option>Efectivo</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-base font-semibold">
              Punto de Encuentro (Opcional)
              <input
                className="h-11 border border-[#d1d5db] bg-white px-4 font-normal text-[#333] outline-none focus:border-[#2563eb]"
                name="meetingPoint"
                placeholder="Enter place"
                type="text"
              />
            </label>

            <div className="flex flex-col items-center gap-3 md:col-span-2">
              <button
                className="h-12 w-full max-w-md bg-[#ef4f55] text-base font-semibold shadow-sm transition hover:bg-[#dc3f46]"
                type="submit"
              >
                Realizar Venta
              </button>
              {submitted && (
                <p className="font-semibold text-white" role="status">
                  Venta registrada correctamente.
                </p>
              )}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default NewSalePage;
