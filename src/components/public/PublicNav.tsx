import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../../components/common/Nav";
import Search from "../common/Search";
import CartAction from "./CartAction";
import UserAction from "./UserAction";
import LanguageAction from "../common/LanguageAction";
import type { ReactNode } from "react";
import BrandLink from "./BrandLink";

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

function productSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface PublicNavProps {
  reservationSteps?: ReactNode;
}

function PublicNav({ reservationSteps }: PublicNavProps) {
  const { pathname } = useLocation();
  const [users, setUsers] = useState<User[]>([]);
  const [productNameResult, setProductNameResult] = useState<{
    slug: string;
    name: string;
  }>({ slug: "", name: "" });

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) =>
        console.error(
          error instanceof Error
            ? `Error fetching users: ${error.message}`
            : "Unknown error occurred while fetching users",
        ),
      );
  }, []);

  useEffect(() => {
    if (!pathname.startsWith("/product/")) return;

    const slug = pathname.split("/").filter(Boolean)[1];

    fetch("/api/products")
      .then((response) => response.json())
      .then((products: Product[]) => {
        const product = products.find(
          (item) => productSlug(item.name) === slug,
        );
        setProductNameResult({
          slug: slug ?? "",
          name: product?.name ?? "",
        });
      })
      .catch((error) => console.error(error));
  }, [pathname]);

  const productName =
    productNameResult.slug === pathname.split("/").filter(Boolean)[1]
      ? productNameResult.name
      : "";

  if (
    pathname === "/reserva-tour/paso-1" ||
    pathname === "/reserva-tour/paso-2" ||
    pathname === "/reserva-tour/paso-3" ||
    pathname === "/reserva-tour/paso-3/resumen"
  ) {
    return (
      <Nav
        variant="reservation"
        start={<BrandLink />}
        middle={<div className="flex justify-center">{reservationSteps}</div>}
        end={
          <div className="flex items-center gap-6">
            <CartAction />
            <LanguageAction />
            <UserAction name={users[0]?.name ?? "UserName"} />
          </div>
        }
      />
    );
  }

  if (/^\/user\/[^/]+\/(ticket|profile|notifications|cards)$/.test(pathname)) {
    return (
      <Nav
        variant="search"
        start={
          <div className="flex w-full items-center gap-10">
            <BrandLink />
            <Search
              width="min(680px, 54vw)"
              className="mx-auto"
              placeholder="search"
            >
              Buscar
            </Search>
          </div>
        }
        breadcrumbs={
          <div className="flex items-center gap-8">
            <button
              type="button"
              className="flex items-center gap-2 font-semibold"
            >
              Lugares
              <span aria-hidden="true">⌄</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 font-semibold"
            >
              Región
              <span aria-hidden="true">⌄</span>
            </button>
          </div>
        }
        end={
          <div className="flex items-center gap-6">
            <UserAction name={users[0]?.name ?? "UserName"} />
          </div>
        }
      />
    );
  }

  if (pathname === "/login" || pathname === "/register")
    return (
      <Nav
        variant="search"
        start={
          <div className="flex w-full items-center gap-6">
            <BrandLink />
            <Search
              width="min(680px, 54vw)"
              className="mx-auto"
              placeholder="search"
            >
              Buscar
            </Search>
          </div>
        }
        end={
          <figure id="language-selector" className=" gap-2">
            <img src="/path/to/your/logo.png" alt="UserIcon" />
            {users[0] ? <span>{users[0].name}</span> : <span>Loading...</span>}
          </figure>
        }
      />
    );
  if (pathname === "/") {
    return (
      <Nav
        variant="home"
        start={
          <div className="flex items-center">
            <BrandLink />
            <div className="ml-40 flex items-center gap-12">
              <button
                type="button"
                className="flex items-center gap-3 text-[22px] font-semibold"
              >
                Lugares
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m5 7.5 5 5 5-5" />
                </svg>
              </button>
              <button
                type="button"
                className="flex items-center gap-3 text-[22px] font-semibold"
              >
                Región
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m5 7.5 5 5 5-5" />
                </svg>
              </button>
            </div>
          </div>
        }
        end={<UserAction name={users[0]?.name ?? "Iniciar Sesión"} />}
      />
    );
  }
  if (pathname === "/products") {
    return (
      <Nav
        variant="search"
        start={
          <div className="flex w-full items-center gap-6">
            <BrandLink />
            <Search
              width="min(680px, 54vw)"
              className="mx-auto"
              placeholder="search"
            >
              Buscar
            </Search>
          </div>
        }
        breadcrumbs={
          <div className="flex items-center gap-4">
            <span>Región</span>
            <span className="text-[#777]">›</span>
            <strong>Ica</strong>
          </div>
        }
        end={<UserAction name={users[0]?.name ?? "Iniciar Sesión"} />}
      />
    );
  }
  if (pathname.startsWith("/product/")) {
    return (
      <Nav
        variant="search"
        start={
          <div className="flex w-full items-center gap-6">
            <BrandLink />
            <Search
              width="min(680px, 54vw)"
              className="mx-auto"
              placeholder="search"
            >
              Buscar
            </Search>
          </div>
        }
        breadcrumbs={
          <div className="flex items-center gap-4">
            <span>Región</span>
            <span className="text-[#777]">›</span>
            <strong>Ica</strong>
            {productName && (
              <>
                <span className="text-[#777]">›</span>
                <strong>{productName}</strong>
              </>
            )}
          </div>
        }
        end={<UserAction name={users[0]?.name ?? "Iniciar Sesión"} />}
      />
    );
  }
}

export default PublicNav;
