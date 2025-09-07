"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";

interface ProductImageSlideshowProps {
  images: string[];
  alt: string;
  className?: string;
}

const ProductImageSlideshow: React.FC<ProductImageSlideshowProps> = memo(({
  images,
  alt,
  className = ""
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Limit to maximum 3 images and memoize to prevent unnecessary recalculations
  const displayImages = useMemo(() => images.slice(0, 3), [images]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  }, [displayImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  }, [displayImages.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // Memoize current image URL to prevent unnecessary re-renders
  const currentImageUrl = useMemo(() =>
    displayImages[currentImageIndex] || "",
    [displayImages, currentImageIndex]
  );

  // Memoize alt text
  const currentAlt = useMemo(() =>
    `${alt} - Image ${currentImageIndex + 1}`,
    [alt, currentImageIndex]
  );

  if (displayImages.length === 0) {
    return (
      <div className={`relative w-full h-full bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-sm">No image available</div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Main Image - Clean, stable display like Amazon */}
      {currentImageUrl ? (
        <Image
          src={currentImageUrl}
          alt={currentAlt}
          fill
          style={{ objectFit: "contain" }}
          priority={currentImageIndex === 0}
          quality={90}
          sizes="(max-width: 320px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">No image available</div>
        </div>
      )}

      {/* Simple navigation dots - only if multiple images */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToImage(index);
              }}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex
                  ? "bg-blue-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Simple navigation arrows - only if multiple images */}
      {displayImages.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-700 px-2 py-1 rounded shadow-sm"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-700 px-2 py-1 rounded shadow-sm"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
});

ProductImageSlideshow.displayName = 'ProductImageSlideshow';

export default ProductImageSlideshow;
