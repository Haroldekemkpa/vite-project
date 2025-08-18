import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useContext } from "react";
import { createContext } from "react";
import { CommentContextAPI } from "../context/ContextApi";
import assets from "../assets/assets";

export default function TestimonialCarousel() {
  const { comments } = useContext(CommentContextAPI);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying && comments.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === comments.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, comments.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? comments.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === comments.length - 1 ? 0 : currentIndex + 1
    );
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No testimonials available</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-16 px-4 md:px-20" id="testimonial">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          What Clients Say
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Real feedback from real collaborators.
        </p>
      </div>

      <div
        className="relative max-w-4xl mx-auto bg-gray-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main carousel container */}
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {comments.map((cur, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="bg-white h-full min-h-[320px] flex flex-col justify-between shadow-lg p-6 rounded-2xl text-center mx-4">
                  <div>
                    <img
                      src={cur.profile_img || assets.img}
                      alt={cur.name}
                      className="w-20 h-20 mx-auto rounded-full border-4 border-orange-400 object-cover mb-4"
                    />
                    <p className="text-gray-700 text-sm italic mb-4 leading-relaxed">
                      "{cur.comment}"
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cur.name}
                    </h3>
                    <p className="text-sm text-orange-500">{cur.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {comments.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-orange-500 scale-110"
                  : "bg-orange-200 hover:bg-orange-300"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
