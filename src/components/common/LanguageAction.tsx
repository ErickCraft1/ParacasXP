interface LanguageActionProps {
  label?: string;
  iconClassName?: string;
  className?: string;
}

function LanguageAction({
  label = "Español",
  iconClassName = "h-7 w-7",
  className = "",
}: LanguageActionProps) {
  return (
    <figure className={`flex min-w-12 flex-col items-center gap-1 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
      <span className="text-xs">{label}</span>
    </figure>
  );
}

export default LanguageAction;
