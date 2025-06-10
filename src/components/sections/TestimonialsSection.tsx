import { useState } from "react";
import { testimonials } from "../../data/testimonials";
import { User, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-[#262729] py-20">
      <div className="max-w-7xl mx-auto px-3">
        {/* Section Header */}
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 text-center mb-2">
            <h2
              className="font-oswald text-5xl font-semibold tracking-wider leading-tight mb-4 uppercase text-center"
              style={{
                background:
                  "linear-gradient(90.01deg, #F8E3C9 0.01%, rgba(226, 209, 187, 0.64) 105.98%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              What our customers have to say
            </h2>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-full overflow-hidden px-0 pb-6 pt-0 relative z-10">
        <div
          className="flex transition-transform duration-200 ease-linear"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="w-full flex-shrink-0 flex items-center justify-center px-4"
              style={{
                transform: index === currentSlide ? "scale(1)" : "scale(0.9)",
                transition: "transform 0.2s linear",
              }}
            >
              <div className="bg-[#393B3C] p-12 max-w-4xl w-full">
                <div className="flex items-center gap-4 text-white/70 font-semibold mb-4">
                  <User className="w-4 h-4 fill-[#F8E3C9]" />
                  <span>{testimonial.name}</span>
                </div>

                <blockquote className="text-white">
                  <div className="relative">
                    <div className="absolute left-7 top-0">
                      <Quote className="w-5 h-3 fill-[#696A6B]" />
                    </div>
                    <p className="text-white font-medium leading-7 pt-3">
                      {testimonial.feedback}
                    </p>
                  </div>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between mt-6">
          {/* Pagination Dots */}
          <div className="flex gap-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 inline-block transition-colors ${
                  currentSlide === index
                    ? "bg-[#F8E3C9]"
                    : "bg-[#E2D1BB]/64 opacity-20"
                }`}
              />
            ))}
          </div>

          {/* Arrow Controls */}
          <div className="flex gap-5">
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-10 h-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <ChevronLeft className="w-5 h-3 fill-[#E2D1BB]" />
            </button>
            <button
              onClick={nextSlide}
              className="flex items-center justify-center w-10 h-4 cursor-pointer hover:opacity-80 transition-opacity"
              style={{ transform: "scaleX(-1)" }}
            >
              <ChevronLeft className="w-5 h-3 fill-[#E2D1BB]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
