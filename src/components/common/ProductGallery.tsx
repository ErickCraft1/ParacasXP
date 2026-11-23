import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  onViewMore?: () => void;
}

function ProductGallery({ images, alt, onViewMore }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const visibleImages =
    images.length > 0
      ? Array.from(
          { length: Math.min(5, images.length) },
          (_, index) => images[index % images.length],
        )
      : [];

  const openViewer = (index: number) => {
    setSelectedIndex(index % images.length);
  };

  const closeViewer = () => setSelectedIndex(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  if (visibleImages.length === 0) {
    return (
      <div className="h-[340px] overflow-hidden rounded-[3px] bg-[#355b69]" />
    );
  }

  return (
    <div className="relative">
      <div className="grid h-[340px] grid-cols-[2fr_1fr_1fr] grid-rows-2 gap-1 overflow-hidden rounded-[3px]">
        {visibleImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            role="button"
            tabIndex={0}
            onClick={() => openViewer(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") openViewer(index);
            }}
            aria-label={`Abrir imagen ${index + 1}`}
            className={`relative overflow-hidden bg-[#355b69] ${
              index === 0
                ? "col-start-1 row-start-1 row-span-2"
                : index === 1
                  ? "col-start-2 row-start-1"
                  : index === 2
                    ? "col-start-3 row-start-1"
                    : index === 3
                      ? "col-start-2 row-start-2"
                      : "col-start-3 row-start-2"
            }`}
          >
            <img
              src={image}
              alt={`${alt} ${index + 1}`}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            {index === 4 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onViewMore?.();
                  openViewer(index);
                }}
                className="absolute bottom-3 right-3 h-9 rounded-[6px] border border-white/70 bg-[#d84b4e] px-4 text-sm font-semibold text-white"
              >
                Ver más
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/85 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeViewer();
          }}
        >
          <button
            type="button"
            aria-label="Cerrar galería"
            onClick={closeViewer}
            className="absolute right-6 top-5 text-4xl text-white"
          >
            ×
          </button>

          <Swiper
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop={images.length > 2}
            initialSlide={selectedIndex}
            navigation
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: -40,
              depth: 220,
              modifier: 1,
              scale: 0.78,
              slideShadows: false,
            }}
            className="h-[72vh] w-full max-w-[1100px]"
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={`${image}-${index}`}
                className="!flex w-[min(64vw,720px)] items-center justify-center"
              >
                <img
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  className="h-[72vh] w-full rounded-[4px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
