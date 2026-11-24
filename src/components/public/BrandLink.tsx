import { Link } from "react-router-dom";

function BrandLink() {
  return (
    <Link
      to="/"
      aria-label="Ir al inicio"
      className="h-[48px] w-[48px] shrink-0 overflow-hidden rounded-full"
    >
      <img
        src="/logo_paracas.jpeg"
        alt="Paracas XP"
        className="h-full w-full"
      />
    </Link>
  );
}

export default BrandLink;
