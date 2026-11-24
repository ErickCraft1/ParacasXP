import { useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

type TourType = "Tour" | "Paquete Turístico";

interface TourItem {
  name: string;
  type: TourType;
  price: number;
  available: boolean;
  image: string;
  description: string;
  region?: string;
  routeName?: string;
}

const initialTours: TourItem[] = [
  { name: "Islas Ballestas", type: "Tour", price: 40, available: true, image: "", description: "" },
  { name: "Reserva Nacional de Paracas", type: "Tour", price: 40, available: true, image: "", description: "" },
  { name: "Full Day", type: "Paquete Turístico", price: 70, available: true, image: "", description: "" },
  { name: "Sobrevuelo de las líneas de Nazca", type: "Tour", price: 230, available: true, image: "", description: "" },
  { name: "Full Day - Ica", type: "Paquete Turístico", price: 180, available: true, image: "", description: "" },
  { name: "Yaku Park", type: "Tour", price: 150, available: true, image: "", description: "" },
  { name: "Full Day - Chincha", type: "Paquete Turístico", price: 200, available: true, image: "", description: "" },
  { name: "Huacachina", type: "Tour", price: 90, available: true, image: "", description: "" },
];

function TourRegistrationPage() {
  const [tours, setTours] = useState(initialTours);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TourItem | null>(null);
  const [kind, setKind] = useState<TourType>("Tour");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [description, setDescription] = useState("");
  const [routeName, setRouteName] = useState("Islas Ballestas");
  const [region, setRegion] = useState("RNP (Reserva Nacional de Paracas)");
  const [imageName, setImageName] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const visibleTours = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return tours.filter((tour) =>
      `${tour.name} ${tour.type}`.toLowerCase().includes(normalized),
    );
  }, [search, tours]);

  function resetForm() {
    setShowForm(false);
    setEditing(null);
    setKind("Tour");
    setName("");
    setPrice("");
    setAvailable(true);
    setDescription("");
    setRouteName("Islas Ballestas");
    setRegion("RNP (Reserva Nacional de Paracas)");
    setImageName("");
  }

  function startEditing(tour: TourItem) {
    setEditing(tour);
    setKind(tour.type);
    setName(tour.name);
    setPrice(String(tour.price));
    setAvailable(tour.available);
    setDescription(tour.description);
    setRouteName(tour.routeName ?? "Islas Ballestas");
    setRegion(tour.region ?? "RNP (Reserva Nacional de Paracas)");
    setImageName(tour.image);
    setShowForm(true);
  }

  function saveTour(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // El tour y la ruta regional solo se usan en paquetes turísticos.
    const nextTour: TourItem = {
      name: name.trim(),
      type: kind,
      price: Number(price),
      available,
      image: imageName,
      description: description.trim(),
      routeName: kind === "Paquete Turístico" ? routeName : undefined,
      region: kind === "Paquete Turístico" ? region : undefined,
    };

    if (editing) {
      setTours((current) =>
        current.map((tour) => (tour.name === editing.name ? nextTour : tour)),
      );
    } else {
      setTours((current) => [...current, nextTour]);
    }
    resetForm();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#4b8eb7] lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminHeader title="Gestion de Tour y Paquetes" />
        <main className="min-h-[calc(100vh-68px)] bg-[#4b8eb7] p-6 lg:p-8">
          <section
            className={`mx-auto grid w-full gap-0 border-2 border-[#d9d9d9] bg-[#ef4f55] ${
              showForm
                ? "max-w-none lg:grid-cols-[minmax(0,1fr)_470px]"
                : "max-w-none"
            }`}
          >
            <div className="p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <input
                  className="h-9 w-full max-w-[430px] rounded-full border border-[#333] bg-white px-4"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="⌕ search"
                  value={search}
                />
                <button
                  className="shrink-0 rounded bg-[#8bb7e9] px-4 py-2 text-sm font-semibold text-white"
                  onClick={() => setShowForm(true)}
                  type="button"
                >
                  + Agregar Tour
                </button>
              </div>

              <div className="overflow-x-auto bg-white">
                <table className="w-full min-w-[520px] border-collapse text-center text-sm">
                  <thead>
                    <tr>
                      {["Imagen", "Nombre", "Tipo", "Precio", "Disponible", "Acción"].map((heading) => (
                        <th className="border border-[#777] px-2 py-3" key={heading}>{heading}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleTours.map((tour) => (
                      <tr key={tour.name}>
                        <td className="border border-[#777] px-2 py-3">
                          {tour.image ? (
                            <span className="text-xs">{tour.image}</span>
                          ) : (
                            <span className="mx-auto block h-10 w-14 bg-[#d9d9d9]" />
                          )}
                        </td>
                        <td className="border border-[#777] px-2 py-3">{tour.name}</td>
                        <td className="border border-[#777] px-2 py-3">{tour.type}</td>
                        <td className="border border-[#777] px-2 py-3">S/. {tour.price.toFixed(2)}</td>
                        <td className="border border-[#777] px-2 py-3">
                          {tour.available ? "Disponible" : "No disponible"}
                        </td>
                        <td className="border border-[#777] px-2 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              className="rounded bg-[#8bb7e9] px-3 py-1 text-white"
                              onClick={() => startEditing(tour)}
                              type="button"
                            >
                              ✎
                            </button>
                            <button
                              className="rounded bg-[#ef4f55] px-3 py-1 text-white"
                              onClick={() =>
                                setTours((current) =>
                                  current.filter((item) => item.name !== tour.name),
                                )
                              }
                              type="button"
                            >
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {showForm && (
              <form className="bg-[#ef4f55] p-5 text-white" onSubmit={saveTour}>
                <h2 className="text-xl font-semibold">
                  {editing ? "Editar" : "Agregar"} Tour / Paquete Turístico
                </h2>
                <div className="mt-4 flex gap-8">
                  <label className="flex items-center gap-2">
                    <input
                      checked={kind === "Tour"}
                      name="kind"
                      onChange={() => setKind("Tour")}
                      type="radio"
                    />
                    Tour
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      checked={kind === "Paquete Turístico"}
                      name="kind"
                      onChange={() => setKind("Paquete Turístico")}
                      type="radio"
                    />
                    Paquete Turístico
                  </label>
                </div>

                <div className="mt-5 grid grid-cols-[160px_1fr] gap-4">
                  <div>
                    <label className="font-semibold">Imagen / video:</label>
                    <input
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(event) =>
                        setImageName(event.target.files?.[0]?.name ?? "")
                      }
                      ref={imageInputRef}
                      type="file"
                    />
                    <button
                      className="mt-2 flex h-28 w-full items-center justify-center border border-[#777] bg-white text-[#777]"
                      onClick={() => imageInputRef.current?.click()}
                      type="button"
                    >
                      {imageName || "Imagen o Video"}
                    </button>
                  </div>
                  <div className="space-y-4">
                    <label className="block font-semibold">
                      Nombre:
                      <input
                        className="mt-2 h-10 w-full border border-[#777] bg-white px-3 font-normal text-[#333]"
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Nombre"
                        required
                        value={name}
                      />
                    </label>
                    <label className="block font-semibold">
                      Precio:
                      <span className="mt-2 flex">
                        <span className="flex h-10 items-center bg-[#8bb7e9] px-3">S/.</span>
                        <input
                          className="h-10 min-w-0 flex-1 border border-[#777] bg-white px-3 font-normal text-[#333]"
                          min={0}
                          onChange={(event) => setPrice(event.target.value)}
                          placeholder="120"
                          required
                          step="0.01"
                          type="number"
                          value={price}
                        />
                      </span>
                    </label>
                    <label className="block font-semibold">
                      Descripción:
                      <textarea
                        className="mt-2 h-20 w-full border border-[#777] bg-white px-3 py-2 font-normal text-[#333]"
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Descripción"
                        value={description}
                      />
                    </label>
                  </div>
                </div>

                <label className="mt-4 flex items-center gap-2 font-semibold">
                  <input
                    checked={available}
                    onChange={(event) => setAvailable(event.target.checked)}
                    type="checkbox"
                  />
                  Disponible
                </label>

                {kind === "Paquete Turístico" && (
                  <div className="mt-5">
                    <p className="mb-2 font-semibold">Seleccionar:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        className="h-10 rounded bg-[#8bb7e9] px-3 text-white"
                        onChange={(event) => setRouteName(event.target.value)}
                        value={routeName}
                      >
                        <option>Islas Ballestas</option>
                        <option>Reserva Nacional de Paracas</option>
                        <option>Huacachina</option>
                        <option>Full Day</option>
                      </select>
                      <select
                        className="h-10 rounded bg-[#8bb7e9] px-3 text-white"
                        onChange={(event) => setRegion(event.target.value)}
                        value={region}
                      >
                        <option>RNP (Reserva Nacional de Paracas)</option>
                        <option>Ica</option>
                        <option>Chincha</option>
                        <option>Nazca</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    className="rounded bg-[#d84b4e] px-5 py-2"
                    onClick={resetForm}
                    type="button"
                  >
                    Cancelar
                  </button>
                  <button
                    className="rounded bg-[#2563eb] px-5 py-2"
                    type="submit"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default TourRegistrationPage;
