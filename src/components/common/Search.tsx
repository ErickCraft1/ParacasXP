import { useState, type ReactNode } from "react";

interface SearchProps {
  children?: ReactNode;
  width?: string | number;
  placeholder?: string;
  className?: string;
  onSubmit?: (query: string) => void;
}

function Search({
  children = "Buscar",
  width = "100%",
  placeholder = "search",
  className = "",
  onSubmit,
}: SearchProps) {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(query.trim());
      }}
      className={`flex h-12 items-center rounded-[14px] border-2 border-[#333] bg-white px-3 ${className}`}
      style={{ width }}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="min-w-0 flex-1 bg-transparent px-2 text-base text-[#555] outline-none"
        placeholder={placeholder}
      />
      {children && (
        <button
          type="submit"
          className="h-8 shrink-0 rounded-[7px] bg-[#d84b4e] px-4 text-sm font-semibold text-white cursor-pointer border-1 border-[#4b8eb7]"
        >
          {children}
        </button>
      )}
    </form>
  );
}

export default Search;
