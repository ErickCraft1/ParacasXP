import PublicNav from "../../components/public/PublicNav";
import Search from "../../components/common/Search";
import { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  alt: string;
}

function productSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error(
          error instanceof Error
            ? `Error fetching products: ${error.message}`
            : "Unknown error occurred while fetching products",
        ),
      );
  }, []);
  return (
    <>
      <PageTitle title="Paracas XP - Inicio" />
      <PublicNav />
      <main className="flex min-h-screen flex-col items-center gap-4 px-6 py-12 md:px-12">
        <h1 className="mt-0 text-4xl text-white">
          <strong>Bienvenido a Paracas</strong>
        </h1>
        <Search width="min(680px, 54vw)" />
        <section className="flex w-full max-w-[1120px] flex-col gap-4 rounded-[4px] px-10 py-8 text-white">
          <h2 className="text-white text-3xl">Región Ica</h2>
          <div className="flex w-full items-center justify-between gap-4">
            <p className="text-xl">Disfruta de la belleza del sur chico</p>
            <Link
              to="/products"
              className="flex h-10 shrink-0 items-center justify-center rounded-[7px] bg-[#d84b4e] px-12 text-sm font-semibold text-white cursor-pointer border-1 border-[#4b8eb7]"
            >
              Ver más
            </Link>
          </div>

          {products.length > 0 && (
            <div className="relative w-full">
              <button
                type="button"
                aria-label="Productos anteriores"
                className="absolute left-[-36px] top-[180px] z-10 hidden h-10 w-10 items-center cursor-pointer justify-center text-4xl text-white md:flex"
                onClick={() =>
                  setActiveSlide((current) =>
                    current === 0 ? products.length - 1 : current - 1,
                  )
                }
              >
                ‹
              </button>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {[0, 1, 2].map((offset) => {
                  const product =
                    products[(activeSlide + offset) % products.length];

                  return (
                    <article
                      key={product.id}
                      className="overflow-hidden rounded-[6px] bg-[#f7f9fb] text-[#1d2a33] shadow-sm"
                    >
                      <div className="relative h-[240px] overflow-hidden bg-black">
                        <img
                          src={product.img}
                          alt={product.alt}
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                        <button
                          type="button"
                          aria-label={`Agregar ${product.name} a favoritos`}
                          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#d84b4e] text-[#ffff] cursor-pointer"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-6 w-6"
                            fill="currentColor"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>
                      </div>

                      <div className="px-5 pb-5 pt-4">
                        <h3 className="mb-3 text-left text-lg font-semibold text-[#1d2a33]">
                          {product.name}
                        </h3>
                        <div className="mb-4 flex items-center justify-between">
                          <span className="flex items-center gap-2 font-semibold">
                            <span>4.5</span>
                            <span
                              className="text-[#ffad26]"
                              aria-label="4.5 estrellas"
                            >
                              ★
                            </span>
                            <span className="text-sm text-[#178ec2]">
                              (100)
                            </span>
                          </span>
                          <span className="font-semibold">
                            {product.price.toFixed(0)} USD
                          </span>
                        </div>
                        <Link
                          to={`/product/${productSlug(product.name)}`}
                          className="flex h-9 w-full items-center justify-center rounded-[7px] border border-[#4b8eb7] bg-[#d84b4e] text-sm font-semibold text-white cursor-pointer"
                        >
                          Ver más detalles
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              <button
                type="button"
                aria-label="Productos siguientes"
                className="absolute right-[-36px] top-[180px] z-10 hidden h-10 w-10 items-center justify-center cursor-pointer text-4xl text-white md:flex"
                onClick={() =>
                  setActiveSlide((current) => (current + 1) % products.length)
                }
              >
                ›
              </button>

              <div className="mt-5 flex justify-center gap-3">
                {products.map((product, index) => (
                  <button
                    type="button"
                    key={product.id}
                    aria-label={`Mostrar grupo ${index + 1}`}
                    onClick={() => setActiveSlide(index)}
                    className={`cursor-pointer h-5 w-5 rounded-full border-2 border-white ${
                      activeSlide === index ? "bg-white" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default HomePage;
