import type { ReactNode } from "react";
import LanguageAction from "./LanguageAction";

interface NavProps {
  start?: ReactNode;
  middle?: ReactNode;
  end?: ReactNode;
  variant?: "home" | "menu" | "search" | "reservation";
  breadcrumbs?: ReactNode;
}

function Nav({ start, middle, end, variant = "menu", breadcrumbs }: NavProps) {
  return (
    <nav className="w-full bg-white text-[#111]">
      <div
        className={
          variant === "reservation"
            ? "grid h-[128px] grid-cols-[68px_1fr_300px] items-center gap-6 px-10"
            : `flex items-center justify-between px-4 md:px-10 ${
                "h-[68px]"
              }`
        }
      >
        {variant === "reservation" ? (
          <>
            <div className="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full">
              {start}
            </div>
            <div className="flex justify-center">{middle}</div>
            <div className="flex shrink-0 justify-end gap-5">{end}</div>
          </>
        ) : (
          <>
            <div
              className={
                variant === "search"
                  ? "flex min-w-0 flex-1 items-center"
                  : "flex items-center"
              }
            >
              {start}
            </div>

            <div className="flex shrink-0 items-center gap-6 pl-4">
              <LanguageAction />
              {end}
            </div>
          </>
        )}
      </div>

      {breadcrumbs && (
        <div className="grid h-[68px] grid-cols-[138px_1fr] gap-6 items-center border-t border-[#ececf0] px-10 text-[22px] font-semibold text-[#777]">
          <div />
          <div className="flex items-center">{breadcrumbs}</div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
