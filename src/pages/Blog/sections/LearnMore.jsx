
import React from "react";
import { Button } from "@/components/ui/button";

export default function LearnMoreSection() {
  return (
    <div className="flex justify-center items-center mt-12 mb-8">
      <div className="bg-green-400 p-6 rounded-md shadow-md flex flex-col md:flex-row items-center max-w-4xl w-full">
        <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-red-600 font-bold text-xl mb-2">
            You Want to Learn More about this Topic?
          </h2>
          <p className="text-gray-800">
            The authors of our article will be happy to answer your questions. Just send us a message using the contact form, and we will go deeper into the topic together.
          </p>
        </div>
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <Button variant="outline" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md">
            Write Email now
          </Button>
        </div>
      </div>
    </div>
  );
}
