import { useState } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  "Panel Administrativo",
  "Realizar una Venta",
  "Notificaciones",
  "Devoluciones",
  "Pagos Externos",
  "Próximas Reservas",
  "T&C",
  "Registro de Tour",
  "Historial de Reservas",
  "Cuentas",
  "Ayuda y Soporte",
  "Cerrar Sesión",
];

const menuRoutes: Partial<Record<string, string>> = {
  "Panel Administrativo": "/admin",
  "Realizar una Venta": "/admin/new-sale",
  "Devoluciones": "/admin/returns",
  "Pagos Externos": "/admin/external-payments",
  "Próximas Reservas": "/admin/upcoming-reservations",
  "T&C": "/admin/terms",
  "Cuentas": "/admin/accounts",
  "Registro de Tour": "/admin/tour-registration",
};

function AdminSidebar() {
  const [selected, setSelected] = useState("");

  return (
    <aside className="w-full shrink-0 border-r border-[#333] bg-white lg:w-64">
      <div className="flex items-center justify-between border-b border-[#333] px-5 py-5">
        <div className="w-full border border-[#444] py-2 text-center">
          <p className="text-2xl leading-7">UserName</p>
          <p className="text-lg">Admin</p>
        </div>
        <button className="ml-3 self-start text-2xl" type="button">
          ×
        </button>
      </div>
      <nav aria-label="Menú administrativo">
        {menuItems.map((item, index) => {
          const className = (isActive: boolean) =>
            `flex h-[57px] w-full items-center gap-3 border-b border-[#555] px-4 text-left text-[16px] ${
              isActive ? "bg-[#8bb7e9]" : "bg-white"
            }`;
          const content = (
            <>
              <span className="w-5 text-xl leading-none" aria-hidden="true">
                {
                  ["▣", "🛒", "♧", "▣", "▣", "▣", "▤", "▤", "▣", "♙", "◉", "↪"][
                    index
                  ]
                }
              </span>
              <span>{item}</span>
            </>
          );

          return menuRoutes[item] ? (
            <NavLink
              className={({ isActive }) => className(isActive)}
              end={menuRoutes[item] === "/admin"}
              key={item}
              onClick={() => setSelected("")}
              to={menuRoutes[item]}
            >
              {content}
            </NavLink>
          ) : (
            <button
              onClick={() => setSelected(item)}
              className={className(selected === item)}
              key={item}
              type="button"
            >
              {content}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
