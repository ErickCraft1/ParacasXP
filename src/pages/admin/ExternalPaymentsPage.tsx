import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

interface Provider {
  name: string;
  type: string;
}

function ExternalPaymentsPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [provider, setProvider] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [fileName, setFileName] = useState("Seleccionar archivo");
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [newProviderName, setNewProviderName] = useState("");
  const [newProviderType, setNewProviderType] = useState("");
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setFileName(event.target.files?.[0]?.name ?? "Seleccionar archivo");
  }

  function registerProvider(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newProviderName.trim()) return;

    const name = newProviderName.trim();
    const type = newProviderType.trim() || "Guía";

    setProviders((current) => [...current, { name, type }]);
    setServiceOptions((current) =>
      current.includes(type) ? current : [...current, type],
    );
    setProvider(name);
    setService(type);
    setNewProviderName("");
    setNewProviderType("");
    setShowProviderModal(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#4b8eb7] lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminHeader title="Pagos Externos" />
        <main className="min-h-[calc(100vh-68px)] bg-[#4b8eb7] px-6 py-10 lg:px-16">
          <h2 className="mb-5 text-xl font-semibold text-white">
            Datos del pago
          </h2>

          <section className="mx-auto max-w-[1100px] border border-[#8bb7e9] bg-[#ef4f55] p-8 text-white">
            <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 font-semibold">
                Prestador de servicio
                <span className="flex gap-3">
                  <select
                    className="h-11 min-w-0 flex-1 rounded border border-[#333] bg-white px-3 font-normal text-[#333]"
                    onChange={(event) => setProvider(event.target.value)}
                    value={provider}
                  >
                    <option value="">Seleccionar</option>
                    {providers.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="rounded border border-[#2563eb] bg-[#8bb7e9] px-3 text-sm font-semibold"
                    onClick={() => setShowProviderModal(true)}
                    type="button"
                  >
                    ＋ Agregar Servicio
                  </button>
                </span>
              </label>

              <label className="flex flex-col gap-2 font-semibold">
                Servicio realizado
                <select
                  className="h-11 rounded border border-[#333] bg-white px-3 font-normal text-[#333]"
                  onChange={(event) => setService(event.target.value)}
                  value={service}
                >
                  <option value="">Seleccionar</option>
                  {serviceOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 font-semibold">
                <span className="flex items-center gap-2">
                  Fecha de servicio
                  <span className="text-xs font-normal text-[#d9d9d9]">
                    🔒 No editable
                  </span>
                </span>
                <input
                  className="h-11 cursor-not-allowed rounded border border-[#777] bg-[#d9d9d9] px-3 font-normal text-[#777] opacity-80"
                  onChange={(event) => setDate(event.target.value)}
                  type="date"
                  disabled
                  value={date}
                />
              </label>

              <label className="flex flex-col gap-2 font-semibold">
                Tipo de pago
                <select
                  className="h-11 rounded border border-[#333] bg-white px-3 font-normal text-[#333]"
                  onChange={(event) => setPaymentType(event.target.value)}
                  value={paymentType}
                >
                  <option value="">Seleccionar</option>
                  <option>Transferencia</option>
                  <option>Tarjeta</option>
                  <option>Efectivo</option>
                  <option>QR</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 font-semibold">
                <span className="flex items-center gap-2">
                  Monto
                  <span className="text-xs font-normal text-[#d9d9d9]">
                    🔒 No editable
                  </span>
                </span>
                <input
                  aria-label="Monto, campo no editable"
                  className="h-11 cursor-not-allowed rounded border border-[#777] bg-[#d9d9d9] px-3 font-normal text-[#777] opacity-80"
                  min={0}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="S/. 0.00"
                  step="0.01"
                  type="number"
                  value={amount}
                  disabled
                />
              </label>

              <label className="flex flex-col gap-2 font-semibold">
                <span className="flex items-center gap-2">
                  N° de comprobante
                  <span className="text-xs font-normal text-[#d9d9d9]">
                    🔒 No editable
                  </span>
                </span>
                <input
                  aria-label="Número de comprobante, campo no editable"
                  className="h-11 cursor-not-allowed rounded border border-[#777] bg-[#d9d9d9] px-3 font-normal text-[#777] opacity-80"
                  onChange={(event) => setReceiptNumber(event.target.value)}
                  placeholder="Ej.: 1234567890"
                  disabled
                  type="text"
                  value={receiptNumber}
                />
              </label>
            </div>

            <section className="mt-6 bg-white p-4 text-[#333]">
              <h3 className="mb-3 text-lg font-semibold">Boleto / Factura</h3>
              <div className="flex flex-wrap gap-3">
                <input
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  type="file"
                />
                <input
                  aria-label="Nombre del archivo seleccionado, solo lectura"
                  className="h-11 min-w-64 flex-1 cursor-not-allowed border border-[#777] bg-[#e5e7eb] px-3 text-[#777]"
                  readOnly
                  value={fileName}
                />
                <button
                  className="flex h-11 items-center gap-2 rounded bg-[#8bb7e9] px-4 font-semibold"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  🔗 Adjuntar archivo
                </button>
              </div>
            </section>

            <section className="mt-4 bg-white p-4 text-[#333]">
              <h3 className="mb-3 text-lg font-semibold">
                Resumen del registro
              </h3>
              <div className="grid grid-cols-2 border border-[#333] text-sm md:grid-cols-4">
                <div className="border-r border-[#333] px-3 py-3 text-center font-semibold">
                  Prestador de servicio
                </div>
                <div className="border-r border-[#333] px-3 py-3 text-center font-semibold">
                  Tour
                </div>
                <div className="border-r border-[#333] px-3 py-3 text-center font-semibold">
                  Monto
                </div>
                <div className="px-3 py-3 text-center font-semibold">Fecha</div>
                <div className="border-r border-t border-[#333] px-3 py-3 text-center">
                  {provider || "-"}
                </div>
                <div className="border-r border-t border-[#333] px-3 py-3 text-center">
                  {service || "-"}
                </div>
                <div className="border-r border-t border-[#333] px-3 py-3 text-center">
                  {amount ? `S/. ${Number(amount).toFixed(2)}` : "-"}
                </div>
                <div className="border-t border-[#333] px-3 py-3 text-center">
                  {date || "-"}
                </div>
              </div>
            </section>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                className="rounded bg-[#8bb7e9] px-5 py-2 font-semibold text-white"
                type="button"
              >
                Registrar pago
              </button>
              <button
                className="rounded bg-[#ef4f55] px-5 py-2 font-semibold text-white"
                type="button"
              >
                Cancelar
              </button>
            </div>
          </section>
        </main>
      </div>

      {showProviderModal && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45"
          role="dialog"
        >
          <form
            className="w-[340px] border-2 border-[#333] bg-[#8bb7e9] p-5 shadow-lg"
            onSubmit={registerProvider}
          >
            <h2 className="mb-4 text-lg font-bold">
              Nuevo Prestador de Servicio
            </h2>
            <label className="flex flex-col gap-2 text-sm font-semibold">
              Nombre
              <input
                className="h-11 border border-[#333] bg-white px-3 text-base font-normal"
                onChange={(event) => setNewProviderName(event.target.value)}
                placeholder="Pepito S.A.C"
                required
                value={newProviderName}
              />
            </label>
            <label className="mt-4 flex flex-col gap-2 text-sm font-semibold">
              Tipo
              <input
                className="h-11 border border-[#333] bg-white px-3 text-base font-normal"
                onChange={(event) => setNewProviderType(event.target.value)}
                placeholder="Guía"
                value={newProviderType}
              />
            </label>
            <div className="mt-5 flex justify-center gap-4">
              <button
                className="rounded border-2 border-white bg-[#ef4f55] px-4 py-2 font-semibold text-white"
                onClick={() => setShowProviderModal(false)}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="rounded border-2 border-white bg-[#ef4f55] px-4 py-2 font-semibold text-white"
                type="submit"
              >
                Registrar Prestador
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ExternalPaymentsPage;
