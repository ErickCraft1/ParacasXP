import PublicNav from "../../../components/public/PublicNav";
import ReservationProgress from "../../../components/public/ReservationProgress";
import PaymentMethod from "../../../components/public/PaymentMethod";
import { useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/common/PageTitle";

function ReservaTourPaso2Page() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title="Proceso de reserva de tour - Reserva Nacional de Paracas - Paso 2 | Paracas XP" />
      <PublicNav
        reservationSteps={
          <ReservationProgress
            currentStep={2}
            labels={["Datos", "Text", "Text"]}
          />
        }
      />
      <main className="flex items-center min-h-[calc(100vh-128px)] justify-center bg-[#4b8eb7] px-6 py-4">
        <PaymentMethod
          onContinue={() =>
            navigate("/reserva-tour/paso-3", { state: location.state })
          }
        />
      </main>
    </>
  );
}

export default ReservaTourPaso2Page;
