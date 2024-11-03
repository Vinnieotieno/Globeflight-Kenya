import Container from "@/components/Container";
import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ data }) => {
  return (
    <footer className="w-full  py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <Container>
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center">
            <img src={data.brand} className="w-52 h-24 object-cover " alt="rollinscodes.com" />
          </Link>

          <div className="mt-3">
            <p className="text-gray-500">{data.text1}</p>
            <p className="text-gray-500">&copy; {data.text2}</p>
          </div>

          <div className="mt-3 space-x-2">
            {data.socials.map((social, idx) => (
              <a
                target="blank"
                key={idx}
                className="inline-flex justify-center items-center size-10 text-center  hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                href={social.link}>
                {React.createElement(social.icon, { size: "20" })}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
