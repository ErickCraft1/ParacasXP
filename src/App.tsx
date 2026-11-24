import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/public/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import NewSalePage from "./pages/admin/NewSalePage";
import ReturnsPage from "./pages/admin/ReturnsPage";
import ExternalPaymentsPage from "./pages/admin/ExternalPaymentsPage";
import UpcomingReservationsPage from "./pages/admin/UpcomingReservationsPage";
import AccountsPage from "./pages/admin/AccountsPage";
import TermsPage from "./pages/admin/TermsPage";
import TourRegistrationPage from "./pages/admin/TourRegistrationPage";
import ProductsPage from "./pages/public/ProductsPage";
import ProductPage from "./pages/public/ProductPage";
import ReservaTourPaso1Page from "./pages/public/reservation/ReservaTourPaso1Page";
import ReservaTourPaso2Page from "./pages/public/reservation/ReservaTourPaso2Page";
import ReservaTourPaso3Page from "./pages/public/reservation/ReservaTourPaso3Page";
import ReservaTourPaso3_2Page from "./pages/public/reservation/ReservaTourPaso3_2Page";
import UserTicketPage from "./pages/public/user/UserTicketPage";
import UserProfilePage from "./pages/public/user/UserProfilePage";
import UserNotificationsPage from "./pages/public/user/UserNotificationsPage";
import UserCardsPage from "./pages/public/user/UserCardsPage";

function RouteTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Mantiene sincronizado el título del navegador con la sección administrativa activa.
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

    if (pathname.startsWith("/admin")) {
      document.title = `${adminTitles[pathname] ?? "Panel Administrativo"}`;
    } else if (pathname === "/") {
      document.title = "Paracas XP - Inicio";
    } else if (pathname === "/products") {
      document.title = "Productos - Región Ica";
    } else if (pathname.startsWith("/product/")) {
      document.title = "Detalle del producto";
    } else if (pathname.startsWith("/reserva-tour/paso-")) {
      document.title =
        "Proceso de reserva de tour - Reserva Nacional de Paracas";
    } else if (/^\/user\/[^/]+\/ticket$/.test(pathname)) {
      const userId = pathname.split("/")[2];
      document.title = `Ticket TRIP-9042 - Usuario ${userId}`;
    } else if (/^\/user\/[^/]+\/profile$/.test(pathname)) {
      document.title = "Perfil del cliente - Datos personales";
    } else if (/^\/user\/[^/]+\/notifications$/.test(pathname)) {
      document.title = "Perfil del cliente - Notificaciones";
    } else if (/^\/user\/[^/]+\/cards$/.test(pathname)) {
      document.title = "Perfil del cliente - Tarjetas asociadas";
    } else {
      document.title = "Paracas XP";
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteTitle />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route
            path="/reserva-tour/paso-1"
            element={<ReservaTourPaso1Page />}
          />
          <Route
            path="/reserva-tour/paso-2"
            element={<ReservaTourPaso2Page />}
          />
          <Route
            path="/reserva-tour/paso-3"
            element={<ReservaTourPaso3Page />}
          />
          <Route
            path="/reserva-tour/paso-3/resumen"
            element={<ReservaTourPaso3_2Page />}
          />
          <Route path="/user/:userId/ticket" element={<UserTicketPage />} />
          <Route path="/user/:userId/profile" element={<UserProfilePage />} />
          <Route
            path="/user/:userId/notifications"
            element={<UserNotificationsPage />}
          />
          <Route path="/user/:userId/cards" element={<UserCardsPage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/new-sale" element={<NewSalePage />} />
          <Route path="/admin/returns" element={<ReturnsPage />} />
          <Route
            path="/admin/external-payments"
            element={<ExternalPaymentsPage />}
          />
          <Route
            path="/admin/upcoming-reservations"
            element={<UpcomingReservationsPage />}
          />
          <Route path="/admin/accounts" element={<AccountsPage />} />
          <Route path="/admin/terms" element={<TermsPage />} />
          <Route
            path="/admin/tour-registration"
            element={<TourRegistrationPage />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
