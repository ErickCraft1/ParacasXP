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
                Correo
                <input
                  name="email"
                  type="email"
                  placeholder="erjcarrea@gmail.com"
                  className="mt-3 h-10 w-full rounded-[2px] border-0 bg-white px-3 text-[14px] text-[#111] placeholder:text-[#aaa] outline-none"
                />
              </label>

              <label className="block text-[18px] font-semibold">
                Contraseña
                <input
                  name="password"
                  type="password"
                  placeholder="********"
                  className="mt-3 h-10 w-full rounded-[2px] border-0 bg-white px-3 text-[14px] text-[#111] placeholder:text-[#aaa] outline-none"
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
