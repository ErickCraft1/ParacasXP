import { useState, type ReactNode } from "react";

export interface FilterValues {
  location: string[];
  type: string[];
  price: string[];
  rating: string[];
}

interface FilterOptionProps {
  label: string;
  name: FilterName;
  value: string;
  rating?: number;
  checked?: boolean;
  onChange?: (value: string, checked: boolean) => void;
}

function FilterOption({
  label,
  name,
  value,
  rating,
  checked = false,
  onChange,
}: FilterOptionProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[16px] leading-6">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange?.(value, event.target.checked)}
        className="h-[14px] w-[14px] rounded-[2px] accent-[#ff4b55]"
      />
      {rating ? (
        <span className="flex items-center gap-1">
          {Array.from({ length: rating }, (_, index) => (
            <span key={index} className="text-[19px] text-[#ffad26]">
              ★
            </span>
          ))}
        </span>
      ) : (
        <span>{label}</span>
      )}
    </label>
  );
}

interface FilterSectionProps {
  title: string;
  open?: boolean;
  children: ReactNode;
}

function FilterSection({
  title,
  open = false,
  children,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <section className="mb-3">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center gap-2 py-1 text-left text-[20px] font-semibold text-[#111]"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>
      {isOpen && <div className="mt-1">{children}</div>}
    </section>
  );
}

interface FilterProps {
  onChange?: (filters: FilterValues) => void;
}

type FilterName = keyof FilterValues;

function Filter({ onChange }: FilterProps) {
  const [selected, setSelected] = useState<FilterValues>({
    location: [],
    type: [],
    price: [],
    rating: [],
  });

  const toggleOption = (name: FilterName, value: string, checked: boolean) => {
    setSelected((current) => {
      const values = current[name] ?? [];
      const next = {
        ...current,
        [name]: checked
          ? [...values, value]
          : values.filter((item) => item !== value),
      } as FilterValues;

      onChange?.(next);
      return next;
    });
  };

  return (
    <aside className="w-[300px] rounded-[6px] border-2 border-[#ff4b55] bg-white px-6 py-5 text-[#111]">
      <h2 className="mb-4 text-[20px] font-semibold">Filtro</h2>

      <FilterSection title="Lugar" open>
        <FilterOption
          name="location"
          value="paracas"
          label="Paracas"
          checked={selected.location?.includes("paracas")}
          onChange={(value, checked) => toggleOption("location", value, checked)}
        />
        <FilterOption
          name="location"
          value="chincha"
          label="Chincha"
          checked={selected.location?.includes("chincha")}
          onChange={(value, checked) => toggleOption("location", value, checked)}
        />
      </FilterSection>

      <FilterSection title="Tipo" open>
        <FilterOption
          name="type"
          value="tour"
          label="Tour"
          checked={selected.type?.includes("tour")}
          onChange={(value, checked) => toggleOption("type", value, checked)}
        />
        <FilterOption
          name="type"
          value="paquete"
          label="Paquete"
          checked={selected.type?.includes("paquete")}
          onChange={(value, checked) => toggleOption("type", value, checked)}
        />
      </FilterSection>

      <FilterSection title="Precio" open>
        <FilterOption
          name="price"
          value="40-120"
          label="S/. 40 - S/. 120"
          checked={selected.price?.includes("40-120")}
          onChange={(value, checked) => toggleOption("price", value, checked)}
        />
        <FilterOption
          name="price"
          value="121-200"
          label="S/. 121 - S/. 200"
          checked={selected.price?.includes("121-200")}
          onChange={(value, checked) => toggleOption("price", value, checked)}
        />
      </FilterSection>

      <FilterSection title="Calificación" open>
        <FilterOption
          name="rating"
          value="4"
          label=""
          rating={4}
          checked={selected.rating?.includes("4")}
          onChange={(value, checked) => toggleOption("rating", value, checked)}
        />
      </FilterSection>
    </aside>
  );
}

export default Filter;