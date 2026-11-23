import PublicNav from "../../components/public/PublicNav";
import Filter, { type FilterValues } from "../../components/public/Filter";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  alt: string;
  location?: string;
  type?: string;
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

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterValues>({
    location: [],
    type: [],
    price: [],
    rating: [],
  });

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredProducts = products.filter((product) => {
    if (
      filters.location.length &&
      !filters.location.includes((product.location ?? "").toLowerCase())
    ) {
      return false;
    }
    if (
      filters.type.length &&
      !filters.type.includes((product.type ?? "").toLowerCase())
    ) {
      return false;
    }
    if (
      filters.price.length &&
      !filters.price.some((range) => {
        if (range === "40-120")
          return product.price >= 40 && product.price <= 120;
        if (range === "121-200")
          return product.price >= 121 && product.price <= 200;
        return false;
      })
    ) {
      return false;
    }
    if (
      filters.rating.length &&
      !filters.rating.some(
        (rating) => (product.rating ?? 4.5) >= Number(rating),
      )
    ) {
      return false;
    }
    return true;
  });

  return (
    <>
      <PageTitle title="Productos - Región Ica | Paracas XP" />
      <PublicNav />
      <main className="min-h-screen">
        <div className="border-b-4 border-dashed border-[#ef5d63] px-10 py-6 text-white md:px-20">
          <h1 className="m-0 text-[36px] font-semibold text-white">
            Disfruta de la belleza del sur chico
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 px-10 py-12 md:grid-cols-[300px_1fr] md:px-12">
          <Filter onChange={setFilters} />

          <section className="grid grid-cols-1 content-start gap-4 lg:grid-cols-2">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="grid h-[138px] grid-cols-[104px_1fr] items-center gap-5 rounded-[6px] border border-[#ef5d63] bg-white px-4 text-[#111]"
              >
                <div className="h-[90px] w-full overflow-hidden rounded-[2px] bg-[#b7d8e5]">
                  <img
                    src={product.img}
                    alt={product.alt}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="flex h-full items-center justify-between gap-3 py-4">
                  <div className="min-w-0">
                    <h2 className="m-0 truncate text-[21px] font-semibold leading-tight text-[#111]">
                      {product.name}
                    </h2>
                    <div className="mt-1 flex items-center gap-2 text-[16px]">
                      <span>4.5</span>
                      <span className="text-[#ffad26]">★</span>
                      <span className="text-[#178ec2]">(100)</span>
                    </div>
                    <p className="mt-1 text-[16px] font-medium text-[#111]">
                      S/. {product.price.toFixed(2)}
                    </p>
                  </div>

                  <Link
                    to={`/product/${productSlug(product.name)}`}
                    className="shrink-0 rounded-[7px] bg-[#d84b4e] px-3 py-2 text-sm font-semibold text-white"
                  >
                    Button
                  </Link>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export default ProductsPage;
