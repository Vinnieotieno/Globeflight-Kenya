import { Building, HelpCircle, MailOpen, MessageSquareDot } from "lucide-react";

export const contactCards = [
  {
    icon: HelpCircle,
    title: "Knowledgebase",
    desc: "We're here to help with any questions.",
    cta: {
      name: "Contact Support",
      link: "tel:+254795889533",
    },
  },
  {
    icon: MessageSquareDot,
    title: "FAQ",
    desc: "Search our FAQ for answers to anything you might ask.",
    cta: {
      name: "Visit FAQ",
      link: "/contact-us#faq",
    },
  },
  {
    icon: MailOpen,
    title: "Contact us by email",
    desc: "If you wish to write us an email instead please use",
    cta: {
      name: "cs@globeflight.co.ke",
      link: "mailto:cs@globeflight.co.ke",
    },
  },
  {
    icon: Building,
    title: "Location",
    desc: "If you wish to visit our offices",
    location: [
      {
        location: "NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road",
        country:"Kenya",
        link: "tel:+254729341277",
      },
      {
        location: "Warehouse, Semco Business Park Mombasa Road",
        country:"Kenya",
        link: "tel:+254729341277",
      },
      {
        location: "2006 fort argyle road",
        country:"United States",
        link: "tel:+19124649333",
      },
    ],
  },
];

export const faqs = [
  {
    question: "Which countries do you currently offer freight services from?",
    answer:
      "We currently operate in 15 countries and 26 destinations. They include: China (Guangzhou, Hongkong), Dubai (Al-Mamzar, Deira, Sharjah, Abu-Dhabi), India (Mumbai), Kenya (Nairobi) Pakistan (Karachi), Tanzania (Dar es Salaam), Thailand (Bangkok), Turkey (Istanbul), Uganda (Kampala), United Kingdom (London), United States (New York,NY; Washington DC; Dallas, TX; Atlanta, GA; Houston, TX), South Africa (Jo'burg), Netherlands (Amsterdam).",
  },
  {
    question: "Do you export to the above destinations as well?",
    answer: "Yes, World Wings have partnered with other agents like DHL, FedEx,Aramex and others ...",
  },
  {
    question: "How do I know my freight charges? ",
    answer: "Please send us an email. Value added services such as door delivery and re-packaging for international shipping are chargeable.",
  },
  {
    question: "What is chargeable weight in air freight?",
    answer:
      "Chargeable weight is the actual or volumetric weight (v/m) of the package, whichever is higher. Volumetric weight (also known as Dimensional Weight) is calculated by multiplying length by width by height of each package (cubic size) then dividing by 165 (if measured in inches) or by 5,000 (if measured in centimetres).",
  },

  {
    question: "Why don’t you just use actual weight for invoicing?",
    answer:
      "By basing charges on weight alone, low density packages become unprofitable for freight carriers due to the amount of space they take up in an aircraft.",
  },
  {
    question: "Why are your rates so competitive? Do they include duty and customs clearance?",
    answer:
      "We are able to offer cheaper rates in comparison to our competition because of the excellent business relationship we enjoy with our network of agents and carriers which provide us the best routing for our consignments. Price quotations received from our staffs are all inclusive (all-in) from our office of dispatch up to the point of collection by consignee.",
  },
  {
    question: "Is my shipment insured?",
    answer:
      "No. On request, we however facilitate purchase of supplementary freight insurance through the air or ocean line during the freight booking process.",
  },
  {
    question: "Can I track my shipment?",
    answer: "At the moment we are developing the tracking systems but you can always reach out to our staff for new updates.",
  },

  {
    question: "Can you store my shipment in your warehouse?",
    answer:
      "For a period of 7 days from the day we receive it in our warehouse we will store it free of charge. Thereafter it will attract a storage fee per day depending on chargeable weight. Three months from date of arrival at our warehouse and without collection commitment from consignee, we will auction the consignment to recover incurred costs.",
  },
  {
    question: "What is minimum chargeable weight and how does it affect me?",
    answer:
      "It is the lowest weight we will accept to render our freighting service. It varies from country to country. Any package that weighs less than minimum weight will be invoiced at minimum weight freight charge. ",
  },
  {
    question: "Can you ship anything I want to?",
    answer: "We will ship all our clients’ general goods. Depending on several factors we will at discretion decide whether to ship hazardous goods. Such include: gases, flammable liquid, flammable solids, oxidizing substances and organic peroxides, toxic and infectious substances, radioactive materials, corrosive materials, magnetized materials, dry ice, machines equipped with fuel tanks. For more information and clarifications you can send us an email .",
  },
];