interface CartActionProps {
  iconClassName?: string;
  className?: string;
}

function CartAction({
  iconClassName = "h-8 w-8",
  className = "",
}: CartActionProps) {
  return (
    <figure className={`flex min-w-[76px] flex-col items-center gap-1 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 7H6" />
      </svg>
      <span className="text-xs">Carrito</span>
    </figure>
  );
}

export default CartAction;
