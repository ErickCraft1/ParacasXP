import { useLocation } from "react-router-dom";
import Nav from "../common/Nav";

interface AdminHeaderProps {
  title?: string;
}

const adminTitles: Record<string, string> = {
  "/admin": "Panel Administrativo",
  "/admin/new-sale": "Nueva Venta",
  "/admin/returns": "Devoluciones",
  "/admin/external-payments": "Pagos Externos",
  "/admin/upcoming-reservations": "Próximas Reservas",
  "/admin/terms": "Términos y Condiciones",
  "/admin/tour-registration": "Gestion de Tour y Paquetes",
  "/admin/accounts": "Cuentas",
};

function AdminHeader({ title }: AdminHeaderProps) {
  const { pathname } = useLocation();
  const pageTitle = title ?? adminTitles[pathname] ?? "Panel Administrativo";

  return (
    <Nav
      start={
        <h1 className="text-4xl font-semibold text-[#4c5664]">{pageTitle}</h1>
      }
    />
  );
}

export default AdminHeader;
