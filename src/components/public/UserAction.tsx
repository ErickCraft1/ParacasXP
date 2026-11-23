interface UserActionProps {
  name?: string;
  iconClassName?: string;
  className?: string;
  userId?: string;
}

function UserAction({
  name = "Iniciar Sesión",
  iconClassName = "h-8 w-8",
  className = "",
  userId = "1",
}: UserActionProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/user/${userId}/profile`)}
      className={`flex min-w-[76px] cursor-pointer flex-col items-center gap-1 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M4.5 21v-2.2A5.8 5.8 0 0 1 10.3 13h3.4a5.8 5.8 0 0 1 5.8 5.8V21" />
      </svg>
      <span className="text-xs whitespace-nowrap">{name}</span>
    </button>
  );
}

export default UserAction;
import { useNavigate } from "react-router-dom";
