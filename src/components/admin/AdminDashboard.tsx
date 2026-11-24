import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import PaymentMethodsChart from "./PaymentMethodsChart";
import ReservationsTable from "./ReservationsTable";
import SalesChart from "./SalesChart";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-[#4b8eb7] lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminHeader />
        <main className="grid gap-0 bg-[#4b8eb7] p-0 xl:grid-cols-2">
          <SalesChart />
          <PaymentMethodsChart />
          <ReservationsTable />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;