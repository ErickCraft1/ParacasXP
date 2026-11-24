import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

interface Account {
  name: string;
  role: "Administrador" | "Vendedor";
  email: string;
  phone?: string;
  active?: boolean;
  missingRecoveryPhone?: boolean;
}

const initialAccounts: Account[] = [
  {
    name: "UserName",
    role: "Administrador",
    email: "admin@paracasxp.com",
    phone: "910 405 358",
    active: true,
  },
  {
    name: "UserName 2",
    role: "Vendedor",
    email: "example@correo.com",
    active: false,
  },
];

function AccountsPage() {
  const [search, setSearch] = useState("");
  const [accounts, setAccounts] = useState(initialAccounts);
  const [editing, setEditing] = useState<Account | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Account["role"]>("Vendedor");
  const [active, setActive] = useState(true);

  const visibleAccounts = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return accounts.filter((account) =>
      `${account.name} ${account.email} ${account.role}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [accounts, search]);

  function resetForm() {
    setEditing(null);
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("Vendedor");
    setActive(true);
  }

  function editAccount(account: Account) {
    setEditing(account);
    setName(account.name);
    setEmail(account.email);
    setPhone(account.phone ?? "");
    setPassword("");
    setRole(account.role);
    setActive(account.active ?? true);
  }

  function saveAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Los datos de acceso y teléfono solo pertenecen a cuentas Administrador.
    const nextAccount: Account = {
      name: name.trim(),
      email: email.trim(),
      role,
      phone: role === "Administrador" ? phone.trim() : undefined,
      active: role === "Administrador" ? active : undefined,
      missingRecoveryPhone:
        role === "Administrador" ? !phone.trim() : undefined,
    };

    if (editing) {
      setAccounts((current) =>
        current.map((account) =>
          account.name === editing.name ? nextAccount : account,
        ),
      );
    } else {
      setAccounts((current) => [...current, nextAccount]);
    }
    resetForm();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#4b8eb7] lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminHeader title="Cuentas" />
        <main className="min-h-[calc(100vh-68px)] bg-[#4b8eb7] p-6 lg:p-8">
          <section className="mx-auto grid max-w-[1000px] gap-8 border-2 border-[#d9d9d9] bg-[#ef4f55] p-10 lg:grid-cols-[1fr_420px]">
            <div>
              <input
                className="mb-8 h-9 w-full max-w-[390px] rounded-full border border-[#333] bg-white px-4"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="⌕ search"
                value={search}
              />
              <div className="space-y-8">
                {visibleAccounts.map((account) => (
                  <article
                    className="border border-[#333] bg-[#8bb7e9] p-8 text-[#333]"
                    key={account.name}
                  >
                    <h2 className="text-xl font-semibold">{account.name}</h2>
                    <div className="mt-4 flex gap-3">
                      <span className="border border-[#777] bg-[#d9d9d9] px-3 py-1 text-sm">
                        {account.role}
                      </span>
                      <span
                        className={`px-3 py-1 text-sm text-white ${account.active ? "bg-[#2563eb]" : "bg-[#333]"}`}
                      >
                        {account.active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <p className="mt-4 text-sm">{account.email}</p>
                    {account.role === "Administrador" && account.phone && (
                      <p className="mt-2 text-xs text-[#555]">
                        Teléfono: {account.phone}
                      </p>
                    )}
                    <div className="mt-4 flex gap-3">
                      <button
                        className="border border-[#333] bg-white px-4 py-1"
                        onClick={() => editAccount(account)}
                        type="button"
                      >
                        ✎ Editar
                      </button>
                      {account.role !== "Administrador" && (
                        <button
                          className="bg-[#ef4f55] px-4 py-1 text-white"
                          onClick={() =>
                            setAccounts((current) =>
                              current.filter(
                                (item) => item.name !== account.name,
                              ),
                            )
                          }
                          type="button"
                        >
                          🗑 Eliminar
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <form className="h-fit bg-[#8bb7e9] p-5" onSubmit={saveAccount}>
              <h2 className="text-xl font-semibold text-white">
                {editing ? "Editar Cuenta" : "Agregar Cuenta"}
              </h2>
              <h3 className="mt-5 border-b border-dashed border-white pb-2 text-lg font-semibold text-white">
                Datos
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <label className="text-sm font-semibold">
                  Nombre
                  <input
                    className="mt-2 h-10 w-full border border-[#777] bg-white px-3"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Nombre de Usuario"
                    required
                    value={name}
                  />
                </label>
                <label className="text-sm font-semibold">
                  Correo
                  <input
                    className="mt-2 h-10 w-full border border-[#777] bg-white px-3"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="example@correo.com"
                    required
                    type="email"
                    value={email}
                  />
                </label>
                {role === "Administrador" && (
                  <label className="text-sm font-semibold">
                    Teléfono
                    <input
                      className="mt-2 h-10 w-full border border-[#777] bg-white px-3"
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="123 456 789"
                      type="tel"
                      value={phone}
                    />
                  </label>
                )}
                <label className="text-sm font-semibold">
                  Contraseña
                  <input
                    className="mt-2 h-10 w-full border border-[#777] bg-white px-3"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="********"
                    type="password"
                    value={password}
                  />
                </label>
              </div>
              {role === "Administrador" && (
                <>
                  <h3 className="mt-6 border-b border-dashed border-white pb-2 text-lg font-semibold text-white">
                    Acceso
                  </h3>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold">
                      Rol
                      <select
                        className="mt-2 h-10 w-full border border-[#777] bg-[#ef4f55] px-3 text-white"
                        onChange={(event) =>
                          setRole(event.target.value as Account["role"])
                        }
                        value={role}
                      >
                        <option>Vendedor</option>
                        <option>Administrador</option>
                      </select>
                    </label>
                    <label className="mt-4 flex items-center gap-2 text-sm font-semibold">
                      <input
                        checked={active}
                        onChange={(event) => setActive(event.target.checked)}
                        type="checkbox"
                      />{" "}
                      Cuenta Activa
                    </label>
                  </div>
                </>
              )}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  className="bg-[#ef4f55] px-5 py-2 text-white"
                  onClick={resetForm}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="bg-[#2563eb] px-5 py-2 text-white"
                  type="submit"
                >
                  Guardar
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AccountsPage;
