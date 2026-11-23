import PublicNav from "../../../components/public/PublicNav";
import ReservationProgress from "../../../components/public/ReservationProgress";
import Button from "../../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/common/PageTitle";

function ReservaTourPaso3Page() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title="Proceso de reserva de tour - Reserva Nacional de Paracas - Paso 3 | Paracas XP" />
      <PublicNav
        reservationSteps={
          <ReservationProgress
            currentStep={3}
            labels={["Datos", "Text", "Text"]}
          />
        }
      />
      <main className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-[#d84b4e] px-6">
        <section className="flex w-[500px] max-w-full flex-col items-center rounded-[6px] border border-[#111] bg-[#d84b4e] px-12 py-12 text-center text-white">
          <h1 className="m-0 text-[38px] font-semibold">Pago confirmado</h1>

          <p className="mt-7 max-w-[340px] text-[18px] font-semibold leading-6">
            Tu pago ha sido confirmado, por
            <br />
            favor presione continuar
          </p>

          <div className="mt-12 h-[200px] w-[220px] overflow-hidden bg-[#b7d0dc]">
            <img
              src="/payment-confirmation.gif"
              alt="Pago confirmado"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

          <Button
            type="button"
            variant="primary"
            width="320px"
            className="mt-12 max-w-full"
            onClick={() =>
              navigate("/reserva-tour/paso-3/resumen", {
                state: location.state,
              })
            }
          >
            Continuar
          </Button>
        </section>
      </main>
    </>
  );
}

export default ReservaTourPaso3Page;
