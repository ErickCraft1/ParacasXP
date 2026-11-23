import { useState, type ReactNode } from "react";
import Button from "../common/Button";

type PaymentType = "card" | "transfer" | "qr";

function CardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-10 w-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 8h15m-4-4 4 4-4 4M21 16H6m4-4-4 4 4 4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function PaymentMethod({ onContinue }: { onContinue?: () => void }) {
  const [method, setMethod] = useState<PaymentType>("card");
  const [selectedBank, setSelectedBank] = useState("BCP");

  const methods: Array<{ id: PaymentType; label: string; icon: ReactNode }> = [
    { id: "card", label: "Tarjeta de crédito / débito", icon: <CardIcon /> },
    { id: "transfer", label: "Transferencia", icon: <TransferIcon /> },
    { id: "qr", label: "Yape / Plin", icon: <PhoneIcon /> },
  ];

  return (
    <section className="w-[760px] h-fit max-w-full rounded-[6px] border border-[#111] bg-[#d84b4e] px-12 py-8 text-white">
      <div className="flex items-center gap-5">
        <CardIcon />
        <div>
          <h2 className="m-0 text-[24px] font-semibold">Método de pago</h2>
          <p className="mt-1 text-[16px] font-semibold">
            Seleccione su método de pago y complete los datos
          </p>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-3 overflow-hidden rounded-[6px] border border-[#111] bg-white text-[#111]">
        {methods.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setMethod(item.id)}
            className={`flex h-12 items-center justify-center gap-2 text-[15px] font-semibold ${
              item.id !== "qr" ? "border-r border-[#111]" : ""
            } ${method === item.id ? "bg-[#91b6cf] text-[#111] shadow-[inset_0_-3px_0_#4b8eb7]" : "bg-white"}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {method === "card" && (
        <div className="mt-7 space-y-5">
          <label className="block text-[14px] font-semibold">
            Número de tarjeta
            <input
              type="text"
              inputMode="numeric"
              placeholder="XXXX XXXX XXXX XXXX"
              className="mt-2 h-11 w-full rounded-[2px] border-0 bg-white px-4 text-[16px] text-[#111] placeholder:text-[#aaa] outline-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-5">
            <label className="block text-[14px] font-semibold">
              Fecha de expiración
              <input
                type="text"
                placeholder="MM/AA"
                className="mt-2 h-11 w-full rounded-[2px] border-0 bg-white px-4 text-[16px] text-[#111] placeholder:text-[#aaa] outline-none"
              />
            </label>
            <label className="block text-[14px] font-semibold">
              CVV
              <input
                type="text"
                inputMode="numeric"
                placeholder="123"
                className="mt-2 h-11 w-full rounded-[2px] border-0 bg-white px-4 text-[16px] text-[#111] placeholder:text-[#aaa] outline-none"
              />
            </label>
          </div>

          <label className="block text-[14px] font-semibold">
            Nombre en la tarjeta
            <input
              type="text"
              placeholder="Nombre completo"
              className="mt-2 h-11 w-full rounded-[2px] border-0 bg-white px-4 text-[16px] text-[#111] placeholder:text-[#aaa] outline-none"
            />
          </label>
        </div>
      )}

      {method === "transfer" && (
        <div className="mt-5">
          <p className="text-[14px] font-semibold">Seleccione su banco</p>
          <div className="mt-3 grid grid-cols-3 items-stretch gap-4">
            {["BCP", "Interbank", "BBVA"].map((bank) => (
              <button
                type="button"
                key={bank}
                onClick={() => setSelectedBank(bank)}
                className={`flex min-h-[130px] flex-col items-center justify-start overflow-hidden rounded-[6px] border-2 text-center text-[#111] ${
                  selectedBank === bank
                    ? "border-[#4b8eb7] bg-white"
                    : "border-white bg-white"
                }`}
              >
                <span className="grid h-[74px] w-full place-items-center bg-white">
                  {bank === "BCP" ? (
                    <span className="flex h-12 w-16 items-center justify-center rounded-[3px] bg-[#0055a5] text-[15px] text-[#ffad26]">
                      BCP
                    </span>
                  ) : bank === "Interbank" ? (
                    <span className="grid h-12 w-16 place-items-center rounded-[3px] bg-[#35a34a] text-[11px] text-white">
                      Interbank
                    </span>
                  ) : (
                    <span className="grid h-12 w-16 place-items-center rounded-[3px] bg-[#003b73] text-[16px] text-white">
                      BBVA
                    </span>
                  )}
                </span>
                <span className="w-full flex-1 px-2 pb-2 text-[14px] leading-5">
                  <strong>CCI:</strong>
                  123456789123456789
                  <br />
                  <strong>N°:</strong> 12345678912345
                </span>
              </button>
            ))}
          </div>
          <label className="mt-4 block text-[14px] font-semibold">
            Número de operación / Adjuntar comprobante
            <div className="mt-1 flex h-10 w-full overflow-hidden rounded-[2px] bg-white">
              <input
                type="text"
                placeholder="Ingrese número o adjunte archivo"
                className="min-w-0 flex-1 border-0 bg-white px-4 text-[16px] text-[#111] placeholder:text-[#aaa] outline-none"
              />
              <label className="flex cursor-pointer items-center bg-[#4b8eb7] px-4 text-[13px] font-semibold text-white">
                Adjuntar
                <input type="file" accept="image/*,.pdf" className="hidden" />
              </label>
            </div>
          </label>
        </div>
      )}

      {method === "qr" && (
        <div className="mt-8 text-center">
          <p className="mb-5 text-[16px] font-semibold">
            Escanee este qr para realizar el pago
          </p>
          <div className="mx-auto h-[210px] w-[210px] bg-white" />
        </div>
      )}

      <Button
        type="button"
        onClick={onContinue}
        variant="primary"
        width="100%"
        className="mt-7"
      >
        Pagar ahora
      </Button>
    </section>
  );
}

export default PaymentMethod;
