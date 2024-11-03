'use client';

export default function Component() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6"> {/* Reduced mb-10 to mb-6 */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0"> {/* Reduced mb-6 to mb-4 */}
            <h2 className="text-3xl md:text-3xl font-bold text-green-500 text-center md:text-left">
              GLOBEFLIGHT KENYA&apos;S
              <br className="hidden md:block" />
              RELATIONSHIPS
            </h2>
          </div>
          
          {/* Vertical stroke for larger screens */}
          <div className="hidden md:block w-4 bg-green-500 h-20 mx-8"></div>
          
          {/* Horizontal stroke for mobile */}
          <div className="md:hidden w-full h-0.5 bg-gray-300 my-4"></div>
          
          <p className="text-base md:text-lg text-gray-700 w-full md:w-1/2 text-center md:text-left">
            Globeflight Kenya prides itself on building relationships and engaging with various authorising
            bodies such as:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center justify-items-center">
          <div className="relative w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px] h-[100px] md:h-[120px]">
            <img
              src="/kra-logo.png"
              alt="Kenya Revenue Authority logo"
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="relative w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px] h-[100px] md:h-[120px]">
            <img
              src="/kpa-logo.png"
              alt="Kenya Ports Authority logo"
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="relative w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px] h-[100px] md:h-[120px]">
            <img
              src="/kebs-logo.png"
              alt="Kenya Bureau of Standards logo"
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
