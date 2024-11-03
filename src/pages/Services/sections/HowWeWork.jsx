import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { howItWorks } from "@/constants/servicepage";
import { ArrowDown } from "lucide-react";
import React from "react";

const HowWeWork = () => {
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:-translate-x-10">
              <div className="col-span-4">
                <img
                  className="rounded-xl"
                  src="https://plus.unsplash.com/premium_photo-1663047709514-336b03e07f76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1taWdyYW50fGVufDB8fDB8fHww"
                  alt="Image Description"
                />
              </div>

              <div className="col-span-3">
                <img
                  className="rounded-xl h-64 object-cover"
                  src="https://schlossky.com/wp-content/uploads/2019/05/Blog-WHAT-IS-AN-IMMIGRATION-CONSULTANT-1080x675.jpg"
                  alt=""
                />
              </div>

              <div className="col-span-5">
                <img
                  className="rounded-xl h-96 object-cover"
                  src="https://newszetu.com/wp-content/uploads/2020/11/Kenyan-Passport.jpg"
                  alt="rollinscodes.com"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
            <div className="space-y-4 sm:space-y-6">
              <div className="">
                <h4 className="md:text-base text-xs text-brandBluish font-medium ">How it Works</h4>
              </div>
              <div className="flex flex-col space-y-4">
                {howItWorks.map((card, idx) => (
                  <Card key={idx} className="shadow-lg">
                    <CardHeader className="py-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                        {idx !== howItWorks.length - 1 && <ArrowDown />}
                      </div>
                      <CardDescription>{card.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
