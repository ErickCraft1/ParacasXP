import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import PublicNav from "../../../components/public/PublicNav";
import Button from "../../../components/common/Button";
import UserAccountMenu from "../../../components/public/UserAccountMenu";
import PageTitle from "../../../components/common/PageTitle";

function UserTicketPage() {
  const { userId } = useParams();

  const downloadTicket = () => {
    window.print();
  };

  return (
    <>
      <PageTitle title={`Ticket TRIP-9042 - Usuario ${userId ?? "1"} | Paracas XP`} />
      <PublicNav />

      <main className="min-h-[calc(100vh-128px)] bg-[#4b8eb7] px-6 py-10">
        <section className="mx-auto flex max-w-[1060px] items-start gap-9 rounded-[6px] border border-[#111] bg-[#d84b4e] px-12 py-14 text-white">
          <UserAccountMenu active="Mi Ticket" />

          <div className="min-w-0 flex-1">
            <h1 className="m-0 border-b border-dashed border-white/70 pb-3 text-[18px] font-semibold">
              Ticket único de la última reserva
            </h1>

            <article className="mt-5 grid h-[215px] grid-cols-[1fr_190px] border border-[#111] bg-[#4b8eb7]">
              <div className="px-7 py-5">
                <span className="text-[22px] font-semibold">TRIP-9042</span>
                <p className="mt-2 text-[16px] font-semibold">
                  Tour Paracas - Islas Ballestas
                </p>
                <p className="mt-2 text-[15px]">
                  Fecha del tour: 15/12/2026
                  <span className="mx-5">Viajeros: 2</span>
                </p>
                <p className="mt-2 text-[15px]">
                  Comprobante asociado: CP - 000001
                </p>
                <p className="mt-2 text-[15px]">Emitido el: 12/12/2026</p>
                <p className="mt-2 hidden text-xs opacity-70">
                  Usuario: {userId}
                </p>
              </div>

              <div className="flex items-center gap-3 justify-end px-5 pb-5">
                <div className="flex text-center h-full justify-evenly flex-col gap-2 px-1 py-3">
                  <span className="rounded-[4px] border border-white/70 bg-[#d84b4e] px-2 py-1 text-xs font-semibold">
                    Valido
                  </span>
                  <button type="button" className="rounded-[4px] border border-white/70 bg-[#d84b4e] px-2 py-1 text-xs font-semibold">
                    Cancelar
                  </button>
                </div>
                <div>
                  <div className="rounded-[4px] bg-transparent">
                    <QRCodeSVG
                      value={`https://paracasxp.com/user/${userId}/ticket`}
                      size={96}
                      level="M"
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                  </div>
                  <p className="mt-2 max-w-[120px] text-center text-[13px] font-semibold">
                    Mostrar el QR al agente turístico
                  </p>
                </div>
              </div>
            </article>

            <div className="mt-10 flex justify-end gap-10 pr-2">
              <Button
                type="button"
                variant="primary"
                width="12rem"
                onClick={downloadTicket}
              >
                ↓ Descargar Ticket
              </Button>
              <a
                href="mailto:?subject=Mi ticket Paracas&body=Ticket TRIP-9042"
                className="flex h-10 w-[180px] items-center justify-center rounded-[6px] border border-[#2f6f91] bg-[#4b8eb7] text-[14px] font-semibold text-white"
              >
                Enviar por Correo
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default UserTicketPage;
