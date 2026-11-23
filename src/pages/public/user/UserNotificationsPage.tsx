import PublicNav from "../../../components/public/PublicNav";
import UserAccountMenu from "../../../components/public/UserAccountMenu";
import ToggleSwitch from "../../../components/common/ToggleSwitch";
import Button from "../../../components/common/Button";
import PageTitle from "../../../components/common/PageTitle";

function UserNotificationsPage() {
  return (
    <>
      <PageTitle title="Perfil del cliente - Notificaciones | Paracas XP" />
      <PublicNav />
      <main className="min-h-[calc(100vh-128px)] bg-[#4b8eb7] px-6 py-12">
        <section className="mx-auto flex max-w-[1040px] items-start gap-10 rounded-[6px] border border-[#111] bg-[#d84b4e] px-12 py-10 text-white">
          <UserAccountMenu active="Notificaciones" />

          <div className="min-w-0 flex-1">
            <h1 className="m-0 border-b border-dashed border-white/70 pb-3 text-[18px] font-semibold">
              Notificaciones
            </h1>

            <div className="mt-8 space-y-8">
              <div>
                <div className="flex items-center justify-between gap-6">
                  <h2 className="m-0 text-[22px] font-semibold">
                    Notificarme mis reservas:
                  </h2>
                  <ToggleSwitch label="Notificar reservas" defaultChecked />
                </div>
                  <p className="mt-2 text-[13px]">
                    Notificarme 2 días antes sobre mis reservas de tours que debo realizar o mi correo.
                  </p>
              </div>

              <div>
                <div className="flex items-center justify-between gap-6">
                  <h2 className="m-0 text-[22px] font-semibold">
                    Notificarme mis devoluciones:
                  </h2>
                  <ToggleSwitch label="Notificar devoluciones" defaultChecked />
                </div>
                  <p className="mt-2 text-[13px]">
                    Notificarme el proceso de mis devoluciones por correo
                  </p>
              </div>

              <div>
                <div className="flex items-center justify-between gap-6">
                  <h2 className="m-0 text-[22px] font-semibold">
                    Notificarme inicio sesión:
                  </h2>
                  <ToggleSwitch label="Notificar inicio de sesión" defaultChecked />
                </div>
                  <p className="mt-2 text-[13px]">
                    Notificarme si alguien inicia sesión con mi correo
                  </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Button type="button" variant="primary" width="180px">
                Guardar
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default UserNotificationsPage;
