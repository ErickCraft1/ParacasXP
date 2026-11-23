import { Link } from "react-router-dom";

function BrandLink() {
  return (
    <Link
      to="/"
      aria-label="Ir al inicio"
      className="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full"
    >
      <img
        src="/path/to/your/logo.png"
        alt="Paracas XP"
        className="h-full w-full"
      />
    </Link>
  );
}

export default BrandLink;
