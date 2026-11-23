import PublicNav from "../../../components/public/PublicNav";
import ReservationProgress from "../../../components/public/ReservationProgress";
import ReservationCard from "../../../components/public/ReservationCard";
import Button from "../../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "../../../components/common/PageTitle";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  alt: string;
  duration?: string;
}

function ReservaTourPaso3_2Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state ?? {}) as {
    productSlug?: string;
    adults?: string;
    date?: string;
  };
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((products: Product[]) => {
        setProduct(
          products.find(
            (item) =>
              item.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "") ===
              (state.productSlug ?? "islas-ballestas"),
          ) ?? products.find((item) => item.name === "Islas Ballestas"),
        );
      })
      .catch((error) => console.error(error));
  }, [state.productSlug]);

  const adults = Number(state.adults ?? "2");
  const unitPrice = product?.price ?? 45;
  const subtotal = unitPrice * adults;
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <>
      <PageTitle title="Proceso de reserva de tour - Reserva Nacional de Paracas - Paso 3_2 | Paracas XP" />
      <PublicNav
        reservationSteps={
          <ReservationProgress
            currentStep={3}
            labels={["Datos", "Text", "Text"]}
          />
        }
      />

      <main className="min-h-[calc(100vh-128px)] bg-[#4b8eb7] px-12 py-10">
        <div className="mx-auto grid max-w-[1060px] grid-cols-[1fr_1fr_260px] gap-8">
          <div className="space-y-8">
            <ReservationCard title="Detalles de la Experiencia">
              <div className="flex items-center gap-4">
                <img
                  src={product?.img}
                  alt={product?.alt}
                  className="h-[70px] w-[100px] object-cover"
                />
                <div className="text-[14px] font-semibold leading-6">
                  <p className="m-0">{product?.name ?? "Islas Ballestas"}</p>
                  <p className="m-0">Fecha: {state.date ?? "15/12/2026"}</p>
                  <p className="m-0">
                    Duración: {product?.duration ?? "2 Horas"}
                  </p>
                  <p className="m-0">
                    Viajeros: {adults} {adults === 1 ? "Adulto" : "Adultos"}
                  </p>
                </div>
              </div>
            </ReservationCard>

            <ReservationCard title="Información del Viajero">
              <p className="m-0 text-[13px] font-semibold leading-6">
                • María García (Celular: **** 1234)
                <br />• Carlos López (Celular: **** 5678)
              </p>
            </ReservationCard>
          </div>

          <ReservationCard
            title="Logística y Punto de Recojo"
            className="h-fit"
          >
            <p className="m-0 text-[13px] font-semibold leading-7">
              <strong>Punto de Encuentro:</strong> Hotel Paracas, Paracas
              <br />
              <strong>Hora de Recojo:</strong> 06:00 AM
            </p>
            <button
              type="button"
              className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-white"
            >
              <span aria-hidden="true">●</span>
              Ver en el mapa
            </button>
          </ReservationCard>

          <ReservationCard title="Resumen de Pago" className="h-fit">
            <p className="m-0 text-[13px] font-semibold">
              {adults === 1
                ? "Full Day (1 Adulto)"
                : `Full Day (${adults} Adultos)`}{" "}
              S/. {subtotal.toFixed(2)}
            </p>
            <div className="my-4 border-t border-white" />
            <p className="m-0 text-[13px] leading-7">
              <strong>Subtotal:</strong> S/. {subtotal.toFixed(2)}
              <br />
              Impuestos (IGV 18%) S/. {igv.toFixed(2)}
            </p>
            <div className="my-4 border-t border-white" />
            <p className="m-0 text-[16px] font-semibold">
              Total Pagado S/. {total.toFixed(2)}
            </p>
            <p className="mt-2 text-[11px]">Pagado con Mastercard **** 8812</p>
          </ReservationCard>
        </div>

        <section className="mx-auto mt-8 max-w-[1060px] rounded-[6px] border border-[#111] bg-[#d84b4e] px-12 py-8 text-center text-white">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#4b8eb7] text-xl font-bold">
            ✓
          </div>
          <h2 className="mt-4 text-[24px] font-semibold">
            Reserva registrada con éxito
          </h2>
          <div className="pt-6 flex justify-center gap-8">
            <Button
              type="button"
              variant="primary"
              width="15rem"
              onClick={() => navigate("/user/1/ticket")}
            >
              Ver Ticket en el Perfil
            </Button>
            <button
              type="button"
              className="w-[15rem] px-4 text-[14px] font-semibold text-white"
            >
              Contactar Soporte
            </button>
            <Button
              type="button"
              variant="primary"
              width="180px"
              onClick={() => navigate("/user/1/ticket")}
            >
              Continuar
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}

export default ReservaTourPaso3_2Page;
