import type { ReactNode } from "react";

interface ReservationCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

function ReservationCard({
  title,
  children,
  className = "",
  titleClassName = "text-[16px]",
}: ReservationCardProps) {
  return (
    <section
      className={`rounded-[6px] border border-[#111] bg-[#d84b4e] px-6 py-5 text-white ${className}`}
    >
      <h2 className={`m-0 font-semibold ${titleClassName}`}>{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default ReservationCard;
