"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Certifitates({ onClose }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const photos = [
    { id: 1, src: "/certificates/1.jpg" },
    { id: 2, src: "/certificates/2.jpg" },
  ];

  const handleNext = () => {
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const photoElements = scrollContainerRef.current.querySelectorAll(".photo-item");
      if (photoElements[currentPhotoIndex]) {
        photoElements[currentPhotoIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentPhotoIndex]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="w-full h-full max-w-4xl flex flex-col mx-auto rounded-xl shadow-2xl">
        {/* Header */}
        <div className="bg-black text-center p-5">
          <h2 className="text-4xl font-mono text-white tracking-wider">Certificates</h2>
        </div>

        {/* Scrollable Photo Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 bg-black overflow-y-auto py-4 px-2"
        >
          <div className="flex flex-col items-center space-y-6">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={`photo-item flex justify-center transform transition-all duration-500 ${
                  index === currentPhotoIndex ? "scale-105 opacity-100" : "opacity-60"
                }`}
              >
                <img
                  src={photo.src}
                  alt={`Photo ${index + 1}`}
                  className="max-w-full max-h-[600px] rounded-xl shadow-lg border-4 border-yellow-400"
                />
              </div>
            ))}

            {/* Bottom space for better scrolling */}
            <div className="h-20"></div>
          </div>
        </div>

        {/* Bottom Buttons */}
          <div className="p-4 space-y-4">
            <button
              className="bg-yellow-500 text-black py-3 rounded-lg font-bold text-xl w-full transition-all hover:bg-yellow-600"
              onClick={handleNext}
              disabled={currentPhotoIndex === photos.length - 1}
            >
              SELANJUTNYA
            </button>
           
        <Link href="/" className="block">
          <button
            className="bg-red-500 text-white py-3 rounded-lg font-bold text-xl w-full transition-all hover:bg-red-600 w-full"
          >
            KEMBALI
          </button>
        </Link>
          </div>
      </div>
    </div>
  );
}
