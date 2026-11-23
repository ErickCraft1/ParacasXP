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
    if (pathname === "/") {
      document.title = "Paracas XP - Inicio";
    } else if (pathname === "/products") {
      document.title = "Productos - Región Ica | Paracas XP";
    } else if (pathname.startsWith("/product/")) {
      document.title = "Detalle del producto | Paracas XP";
    } else if (pathname.startsWith("/reserva-tour/paso-")) {
      document.title =
        "Proceso de reserva de tour - Reserva Nacional de Paracas";
    } else if (/^\/user\/[^/]+\/ticket$/.test(pathname)) {
      const userId = pathname.split("/")[2];
      document.title = `Ticket TRIP-9042 - Usuario ${userId} | Paracas XP`;
    } else if (/^\/user\/[^/]+\/profile$/.test(pathname)) {
      document.title = "Perfil del cliente - Datos personales | Paracas XP";
    } else if (/^\/user\/[^/]+\/notifications$/.test(pathname)) {
      document.title = "Perfil del cliente - Notificaciones | Paracas XP";
    } else if (/^\/user\/[^/]+\/cards$/.test(pathname)) {
      document.title = "Perfil del cliente - Tarjetas asociadas | Paracas XP";
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
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
