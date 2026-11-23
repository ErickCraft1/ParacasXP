// import { useParams } from "react-router-dom";
import PublicNav from "../../../components/public/PublicNav";
import UserAccountMenu from "../../../components/public/UserAccountMenu";
import Button from "../../../components/common/Button";
import PageTitle from "../../../components/common/PageTitle";

function UserProfilePage() {
  // const { userId } = useParams();

  return (
    <>
      <PageTitle title="Perfil del cliente - Datos personales | Paracas XP" />
      <PublicNav />
      <main className="min-h-[calc(100vh-128px)] bg-[#4b8eb7] px-6 py-12">
        <section className="mx-auto flex max-w-[1040px] items-start gap-10 rounded-[6px] border border-[#111] bg-[#d84b4e] px-12 py-10 text-white">
          <UserAccountMenu active="Datos Personales" />

          <form
            className="min-w-0 flex-1"
            onSubmit={(event) => event.preventDefault()}
          >
            <h1 className="m-0 border-b border-dashed border-white/70 pb-3 text-[18px] font-semibold">
              Datos Personales
            </h1>

            <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-8">
              <label className="block text-[18px] font-semibold">
                Nombre y Apellido
                <input
                  name="fullName"
                  type="text"
                  placeholder="Erick J. Carrera"
                  className="mt-3 h-10 w-full rounded-[2px] border-0 bg-white px-3 text-[14px] text-[#111] placeholder:text-[#aaa] outline-none"
                />
              </label>

              <label className="block text-[18px] font-semibold">
                DNI / Pasaporte
                <input
                  name="document"
                  type="text"
                  placeholder="15286432"
                  className="mt-3 h-10 w-full rounded-[2px] border-0 bg-white px-3 text-[14px] text-[#111] placeholder:text-[#aaa] outline-none"
                />
              </label>

              <label className="block text-[18px] font-semibold">
                Celular
                <div className="mt-3 flex h-10">
                  <select
                    aria-label="Prefijo telefónico"
                    className="w-[62px] rounded-l-[2px] border-r border-[#ccc] bg-white px-2 text-[13px] text-[#111] outline-none"
                  >
                    <option value="+51">+51</option>
                    <option value="+1">+1</option>
                    <option value="+34">+34</option>
                  </select>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="956123456"
                    className="min-w-0 flex-1 rounded-r-[2px] border-0 bg-white px-3 text-[14px] text-[#111] placeholder:text-[#aaa] outline-none"
                  />
                </div>
              </label>

              <label className="block text-[18px] font-semibold">
                Correo
                <input
                  name="email"
                  type="email"
                  disabled
                  placeholder="erjcarrea@gmail.com"
                  className="mt-3 h-10 w-full cursor-not-allowed rounded-[2px] border-0 bg-[#d9dde1] px-3 text-[14px] text-[#777] placeholder:text-[#777] opacity-80 outline-none"
                />
              </label>
            </div>

            <div className="mt-10 flex justify-center">
              <Button type="submit" variant="primary" width="180px">
                Guardar
              </Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default UserProfilePage;
