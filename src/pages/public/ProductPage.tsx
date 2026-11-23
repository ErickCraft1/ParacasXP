import { useNavigate, useParams } from "react-router-dom";
import PublicNav from "../../components/public/PublicNav";
import ProductGallery from "../../components/common/ProductGallery";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  alt: string;
  rating?: number;
}

function productSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [productResult, setProductResult] = useState<{
    slug: string;
    product?: Product;
    loading: boolean;
    error: boolean;
  }>({
    slug: "",
    loading: true,
    error: false,
  });
  const [adults, setAdults] = useState("1");
  const [date, setDate] = useState("");
  const [hotel, setHotel] = useState("");
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((products: Product[]) => {
        const match = products.find((item) => productSlug(item.name) === slug);
        setProductResult({
          slug: slug ?? "",
          product: match,
          loading: false,
          error: false,
        });
      })
      .catch((error) => {
        console.error(error);
        setProductResult({
          slug: slug ?? "",
          loading: false,
          error: true,
        });
      });
  }, [slug]);

  const product =
    productResult.slug === slug ? productResult.product : undefined;
  const loading =
    productResult.slug !== slug || productResult.loading;
  const notFound =
    productResult.slug === slug &&
    !loading &&
    (productResult.error || !product);

  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-[#4b8eb7]">
        {product ? (
          <>
            <div className="px-6 py-5 md:px-16">
              <h1 className="m-0 text-[38px] font-semibold text-white">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center gap-2 text-[18px] text-white">
                <span>{product.rating ?? 4.5}</span>
                <span className="text-[#ffad26]">★</span>
                <span>(100)</span>
              </div>
            </div>

            <div className="grid gap-8 px-6 pb-12 md:grid-cols-[minmax(0,2fr)_240px] md:px-16">
              <section className="min-w-0">
                <ProductGallery
                  images={[product.img, product.img, product.img, product.img, product.img]}
                  alt={product.alt}
                />

                <div className="py-8">
                  <h2 className="m-0 text-[16px] font-semibold text-white">
                    Descripción:
                  </h2>
                  <p className="mt-2 max-w-[760px] text-[14px] leading-6 text-white">
                    {product.description}
                  </p>
                </div>

                <section className="border-t border-white/10 pt-6">
                  <h2 className="m-0 text-[24px] font-semibold text-white">
                    Valoración de nuestros Viajeros
                  </h2>
                </section>
              </section>

              <aside className="h-fit text-white">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <strong className="text-[20px]">{product.rating ?? 4.5}</strong>
                    <span className="text-[18px] text-[#ffad26]">★</span>
                    <span className="text-[16px] text-white/80">(100)</span>
                  </div>
                  <strong className="ml-auto text-[18px]">
                    S/. {product.price.toFixed(2)}
                  </strong>
                </div>

                <form
                  className="flex flex-col gap-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!date || !hotel || selectedTerms.length !== 2) return;

                    navigate("/reserva-tour/paso-1", {
                      state: {
                        adults,
                        date,
                        hotel,
                        productSlug: slug,
                        productName: product.name,
                      },
                    });
                  }}
                >
                  <select
                    value={adults}
                    onChange={(event) => setAdults(event.target.value)}
                    className="h-10 rounded-[7px] border-2 border-[#8eb9ca] bg-white px-3 text-[#111] outline-none"
                    aria-label="Cantidad de adultos"
                  >
                    <option value="1">Adulto x1</option>
                    <option value="2">Adulto x2</option>
                    <option value="3">Adulto x3</option>
                    <option value="4">Adulto x4</option>
                  </select>

                  <input
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="h-10 rounded-[7px] border-2 border-[#8eb9ca] bg-white px-3 text-[#111] outline-none"
                    aria-label="Fecha"
                  />

                  <input
                    type="text"
                    value={hotel}
                    onChange={(event) => setHotel(event.target.value)}
                    placeholder="Hotel de Recojo"
                    className="h-10 rounded-[7px] border-0 bg-white px-3 text-[#111] outline-none"
                  />

                  <button
                    type="submit"
                    className="h-10 rounded-[7px] border border-[#4b8eb7] bg-[#d84b4e] text-[16px] font-semibold text-white"
                  >
                    Comprar
                  </button>
                </form>

                <div className="mt-5 space-y-3 text-sm">
                  {["T&C 1", "T&C 2"].map((term) => (
                    <button
                      type="button"
                      key={term}
                      aria-pressed={selectedTerms.includes(term)}
                      onClick={() =>
                        setSelectedTerms((current) =>
                          current.includes(term)
                            ? current.filter((item) => item !== term)
                            : [...current, term],
                        )
                      }
                      className="flex cursor-pointer items-center gap-3 text-white"
                    >
                      <span
                        className={`grid h-4 w-4 place-items-center rounded-[2px] border border-white/50 ${
                          selectedTerms.includes(term)
                            ? "bg-[#1d637f]"
                            : "bg-transparent"
                        }`}
                      >
                        {selectedTerms.includes(term) && (
                          <span className="text-[10px] leading-none text-white">✓</span>
                        )}
                      </span>
                      {term}
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          </>
        ) : loading ? (
          <p className="px-16 py-12 text-white">Cargando producto...</p>
        ) : notFound ? (
          <p className="px-16 py-12 text-white">Producto no encontrado.</p>
        ) : null}
      </main>
    </>
  );
}

export default ProductPage;
