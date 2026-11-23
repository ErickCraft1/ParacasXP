import { useLocation, useNavigate } from "react-router-dom";
import PublicNav from "../../../components/public/PublicNav";
import Button from "../../../components/common/Button";
import ReservationProgress from "../../../components/public/ReservationProgress";
import { useState } from "react";
import PageTitle from "../../../components/common/PageTitle";

interface ReservationState {
  adults?: string;
  date?: string;
  hotel?: string;
  productName?: string;
  productSlug?: string;
}

function ReservaTourPaso1Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state ?? {}) as ReservationState;
  const [phonePrefix, setPhonePrefix] = useState("+51");

  return (
    <>
      <PageTitle title="Proceso de reserva de tour - Reserva Nacional de Paracas - Paso 1 | Paracas XP" />
      <PublicNav
        reservationSteps={
          <ReservationProgress
            currentStep={1}
            labels={["Datos", "Text", "Text"]}
          />
        }
      />

      <main className="min-h-[calc(100vh-128px)] bg-[#4b8eb7] py-12 text-white">
        <h1 className="m-0 text-center text-[38px] font-semibold">
          Datos de reserva
        </h1>
        <p className="mt-5 text-center text-[16px] font-semibold">
          Completa la información para continuar con tu reserva
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const fullName = String(form.get("fullName") ?? "").trim();
            const email = String(form.get("email") ?? "").trim();
            const phone = String(form.get("phone") ?? "").trim();
            const termsAccepted = form.get("terms") === "on";

            if (!fullName || !email || !phone || !termsAccepted) return;

            navigate("/reserva-tour/paso-2", {
              state: {
                ...state,
                fullName,
                email,
                phonePrefix,
                phone,
                date: String(form.get("date") ?? ""),
                adults: String(form.get("adults") ?? "1"),
                productSlug: state.productSlug ?? "islas-ballestas",
              },
            });
          }}
          className="mx-auto mt-8 w-[500px] max-w-[calc(100%-32px)] rounded-[6px] border border-[#d84b4e] bg-[#d84b4e] px-12 py-8"
        >
          <label className="block text-[16px] font-semibold">
            Nombres y Apellidos
            <input
              name="fullName"
              type="text"
              placeholder="Nombre y Apellido extraido de login"
              className="mt-2 h-10 w-full rounded-[3px] border-0 bg-white px-3 text-[14px] text-[#111] placeholder:text-[#aaa] outline-none"
            />
          </label>

          <label className="mt-5 block text-[16px] font-semibold">
            Correo
            <input
              name="email"
              type="email"
              placeholder="Nombre y Apellido extraido de login"
              className="mt-2 h-10 w-full rounded-[3px] border-0 bg-white px-3 text-[14px] text-[#111] placeholder:text-[#aaa] outline-none"
            />
          </label>

          <label className="mt-5 block text-[16px] font-semibold">
            Número de Celular
            <div className="mt-2 flex h-10 w-full">
              <select
                value={phonePrefix}
                onChange={(event) => setPhonePrefix(event.target.value)}
                aria-label="Prefijo telefónico"
                className="w-[78px] rounded-l-[3px] border-r border-[#ccc] bg-white px-2 text-[13px] text-[#111] outline-none"
              >
                <option value="+51">+51</option>
                <option value="+1">+1</option>
                <option value="+34">+34</option>
                <option value="+52">+52</option>
                <option value="+54">+54</option>
                <option value="+56">+56</option>
                <option value="+57">+57</option>
                <option value="+591">+591</option>
                <option value="+593">+593</option>
              </select>
              <input
                name="phone"
                type="tel"
                placeholder="Ingrese numero de celular"
                className="min-w-0 flex-1 rounded-r-[3px] border-0 bg-white px-3 text-[14px] text-[#111] placeholder:text-[#aaa] outline-none"
              />
            </div>
          </label>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <label className="block text-[16px] font-semibold">
              Fecha de Reserva
              <input
                type="date"
                name="date"
                defaultValue={state.date}
                className="mt-2 h-10 w-full rounded-[3px] border-0 bg-white px-3 text-[14px] text-[#111] outline-none"
              />
            </label>
            <label className="block text-[16px] font-semibold">
              Cantidad de Personas
              <select
                name="adults"
                defaultValue={state.adults ?? "1"}
                className="mt-2 h-10 w-full rounded-[3px] border-0 bg-white px-3 text-[14px] text-[#111] outline-none"
              >
                <option value="1">1 Persona</option>
                <option value="2">2 Personas</option>
                <option value="3">3 Personas</option>
                <option value="4">4 Personas</option>
              </select>
            </label>
          </div>

          <label className="mt-6 flex items-center gap-3 text-[13px] font-semibold">
            <input name="terms" type="checkbox" required className="h-5 w-5 accent-[#111]" />
            Términos y Condiciones
          </label>

          <Button
            type="submit"
            variant="primary"
            width="260px"
            className="mt-6 mx-auto block"
          >
            Continuar con la reserva
          </Button>
        </form>
      </main>
    </>
  );
}

export default ReservaTourPaso1Page;
