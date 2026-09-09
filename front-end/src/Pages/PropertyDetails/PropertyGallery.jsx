import React, {
  useState,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PropertyGallery = ({
  images = [],
  title,
}) => {
  const [activeImage, setActiveImage] =
    useState(0);

  const nextImage = () => {
    setActiveImage((current) =>
      current === images.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    );
  };

  if (!images.length) {
    return null;
  }

  return (
    <section>

      {/* DESKTOP */}
      <div className="hidden h-[520px] grid-cols-[1.35fr_1fr] gap-2 overflow-hidden rounded-[32px] md:grid">

        <div className="relative overflow-hidden">
          <img
            src={images[0]}
            alt={title}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2">

          {images
            .slice(1, 5)
            .map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${title} ${index + 2}`}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                {index === 3 &&
                  images.length > 5 && (
                    <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white">
                      +{images.length - 5} more
                    </span>
                  )}
              </div>
            ))}

        </div>

      </div>

      {/* MOBILE */}
      <div className="relative h-[350px] overflow-hidden rounded-[28px] md:hidden">

        <img
          src={images[activeImage]}
          alt={title}
          className="h-full w-full object-cover"
        />

        <button
          onClick={previousImage}
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
          {activeImage + 1} / {images.length}
        </div>

      </div>

    </section>
  );
};

export default PropertyGallery;