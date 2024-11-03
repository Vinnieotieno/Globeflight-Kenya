import React, { useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Container from "@/components/Container";
import RatingStars from "@/components/ui/rating-stars";
import { testimonials } from "@/constants/homepage";

const Testimonials = () => {
  // Reference for the CarouselNext button to trigger it programmatically
  const nextButtonRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Programmatically click the next button every 5 seconds
      if (nextButtonRef.current) {
        nextButtonRef.current.click();
      }
    }, 10000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 text-brandDark bg-gray-50">
      <Container>
        <div className="mx-auto text-center mb-12">
          <h2 className="text-4xl font-semibold tracking-tight text-brandSunset mb-4">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-lg tracking-tight text-muted-foreground">
            Our clients are thrilled with our service, allowing them to easily book appointments and aquire for rates.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-full space-y-8"
          >
            <CarouselContent className="flex items-center space-x-4">
              {testimonials.map((testimonial, idx) => (
                <CarouselItem key={idx} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="rounded-lg border bg-brandShell p-6 shadow-lg text-brandDark">
                    <div className="mb-4">
                      <RatingStars rating={testimonial.rating} size="xl" className="fill-yellow-500" />
                    </div>
                    <p className="text-brandMidnight mb-6">{testimonial.review}</p>
                    <div className="font-semibold text-brandMidnight">{testimonial.name}</div>
                    <div className="text-sm text-brandTide">{testimonial.title}</div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-between mt-8">
              <CarouselPrevious aria-label="Previous testimonial" className="h-10 w-10 rounded-full bg-brandShell border border-brandSunset hover:bg-brandLighter" />
              <CarouselNext
                ref={nextButtonRef}  // Set ref for programmatic control
                aria-label="Next testimonial"
                className="h-10 w-10 rounded-full bg-brandShell border border-brandSunset hover:bg-brandLighter"
              />
            </div>
          </Carousel>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
