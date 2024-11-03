import { Card, CardHeader } from "@/components/ui/card";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/constants/contactpage";
const FAQ = () => {
  return (
    <div className="py-10">
      <div className="md:flex w-full items-start  lg:space-x-10 ">
        <div className="md:sticky md:top-28  md:w-4/12   z-[999]  ">
          <h1 className="md:text-4xl text-2xl tracking-wide  font-bold  mb-3">
            Frequently asked <span className="text-brandRed">Questions</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500">Get the answers to the most frequently asked questions</p>
        </div>
        <div className="md:w-8/12 w-full md:pt-0 pt-5">
          <Card>
            <CardHeader>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardHeader>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default FAQ;
