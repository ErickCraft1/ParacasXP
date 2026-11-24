import { useMemo, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

interface Term {
  title: string;
  category: "Cancelación" | "Servicio";
  effectiveDate: string;
  content: string;
  active: boolean;
}

const initialTerms: Term[] = [
  { title: "Política de Cancelación", category: "Cancelación", effectiveDate: "12/09/2026", content: "Política vigente...", active: true },
  { title: "Retrasos o Cancelaciones", category: "Servicio", effectiveDate: "12/09/2026", content: "Información sobre retrasos...", active: false },
];

function TermsPage() {
  const [search, setSearch] = useState("");
  const [terms, setTerms] = useState(initialTerms);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Term["category"]>("Cancelación");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [content, setContent] = useState("");
  const [active, setActive] = useState(true);

  const visibleTerms = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return terms.filter((term) =>
      `${term.title} ${term.category}`.toLowerCase().includes(normalized),
    );
  }, [search, terms]);

  function saveTerm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTerms((current) => [
      ...current,
      { title: title.trim(), category, effectiveDate, content: content.trim(), active },
    ]);
    setTitle("");
    setEffectiveDate("");
    setContent("");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#4b8eb7] lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminHeader title="Términos y Condiciones" />
        <main className="min-h-[calc(100vh-68px)] bg-[#4b8eb7] p-8">
          <section className="mx-auto grid max-w-[1000px] gap-8 border-2 border-[#d9d9d9] bg-[#ef4f55] p-10 lg:grid-cols-[1fr_420px]">
            <div>
              <input className="mb-8 h-9 w-full max-w-[390px] rounded-full border border-[#333] bg-white px-4" onChange={(event) => setSearch(event.target.value)} placeholder="⌕ search" value={search} />
              <div className="space-y-8">
                {visibleTerms.map((term) => (
                  <article className="border border-[#333] bg-[#8bb7e9] p-8 text-[#333]" key={term.title}>
                    <h2 className="text-xl font-semibold">{term.title}</h2>
                    <div className="mt-4 flex gap-3">
                      <span className="border border-[#777] bg-[#d9d9d9] px-3 py-1 text-sm">{term.category}</span>
                      <span className="bg-[#2563eb] px-3 py-1 text-sm text-white">{term.active ? "Activo" : "Inactivo"}</span>
                    </div>
                    <p className="mt-4 text-sm">Vigente desde: {term.effectiveDate || "-"}</p>
                    <div className="mt-5 flex gap-3">
                      <button className="bg-[#ef4f55] px-5 py-2 text-white" type="button">Editar</button>
                      <button className="bg-[#ef4f55] px-5 py-2 text-white" onClick={() => setTerms((current) => current.filter((item) => item.title !== term.title))} type="button">Eliminar</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <form className="h-fit bg-[#8bb7e9] p-5" onSubmit={saveTerm}>
              <h2 className="text-xl font-semibold text-white">Agregar T&amp;C</h2>
              <label className="mt-5 block text-sm font-semibold">Título<input className="mt-2 h-10 w-full border border-[#777] bg-white px-3" onChange={(event) => setTitle(event.target.value)} placeholder="Título" required value={title} /></label>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <label className="text-sm font-semibold">Categoría<select className="mt-2 h-10 w-full bg-[#ef4f55] px-3 text-white" onChange={(event) => setCategory(event.target.value as Term["category"])} value={category}><option>Cancelación</option><option>Servicio</option></select></label>
                <label className="text-sm font-semibold">Estado<select className="mt-2 h-10 w-full bg-[#ef4f55] px-3 text-white" onChange={(event) => setActive(event.target.value === "Activo")} value={active ? "Activo" : "Inactivo"}><option>Activo</option><option>Inactivo</option></select></label>
              </div>
              <label className="mt-4 block text-sm font-semibold">Vigencia desde<input className="mt-2 h-10 w-full border border-[#777] bg-white px-3" onChange={(event) => setEffectiveDate(event.target.value)} type="date" value={effectiveDate} /></label>
              <label className="mt-4 block text-sm font-semibold">Contenido<textarea className="mt-2 h-28 w-full border border-[#777] bg-white px-3 py-2" onChange={(event) => setContent(event.target.value)} placeholder="Texto" required value={content} /></label>
              <div className="mt-6 flex justify-end gap-3">
                <button className="bg-[#ef4f55] px-5 py-2 text-white" type="button">Cancelar</button>
                <button className="bg-[#2563eb] px-5 py-2 text-white" type="submit">Guardar</button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default TermsPage;
