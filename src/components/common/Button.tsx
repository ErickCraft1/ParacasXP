import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "danger";
  width?: string;
}

function Button({
  children,
  variant = "primary",
  width,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const styles =
    variant === "danger"
      ? "border border-[#4b8eb7] bg-[#d84b4e] text-white"
      : "border border-[#2f6f91] bg-[#4b8eb7] text-white";

  return (
    <button
      {...props}
      type={type}
      className={`h-10 cursor-pointer rounded-[6px] px-4 text-[16px] font-semibold ${styles} ${className}`}
      style={width ? { width } : undefined}
    >
      {children}
    </button>
  );
}

export default Button;
