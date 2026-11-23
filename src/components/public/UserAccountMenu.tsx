import { useNavigate, useParams } from "react-router-dom";

interface UserAccountMenuProps {
  active:
    | "Datos Personales"
    | "Notificaciones"
    | "Tarjetas Asociadas"
    | "Mi Ticket"
    | "Historial de Compra";
}

function UserAccountMenu({ active }: UserAccountMenuProps) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const items = [
    "Datos Personales",
    "Notificaciones",
    "Tarjetas Asociadas",
    "Mi Ticket",
    "Historial de Compra",
  ];

  const routes: Record<string, string> = {
    "Datos Personales": `/user/${userId}/profile`,
    "Notificaciones": `/user/${userId}/notifications`,
    "Tarjetas Asociadas": `/user/${userId}/cards`,
    "Mi Ticket": `/user/${userId}/ticket`,
  };

  return (
    <aside className="w-[180px] shrink-0 border border-[#111] text-center">
      <div className="flex h-[70px] flex-col justify-center bg-[#4b8eb7] text-[17px] font-semibold">
        <span>UserName</span>
        <span>Cuenta</span>
      </div>
      {items.map((item) => (
        <button
          type="button"
          key={item}
          onClick={() => routes[item] && navigate(routes[item])}
          className={`h-[36px] w-full border-t border-[#111] px-3 text-[15px] font-semibold ${
            item === active
              ? "bg-white text-[#111]"
              : "bg-[#4b8eb7] text-white"
          }`}
        >
          {item}
        </button>
      ))}
      <button
        type="button"
        className="h-[36px] w-full border-t border-[#111] bg-[#4b8eb7] px-3 text-[15px] font-semibold text-white"
      >
        Cerrar Sesión
      </button>
    </aside>
  );
}

export default UserAccountMenu;
