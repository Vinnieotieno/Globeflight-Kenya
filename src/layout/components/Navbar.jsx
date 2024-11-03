import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Mail, Phone, MapPin, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Container from "@/components/Container";

export default function Navbar({ data }) {
  const [isSticky, setIsSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-[999]">
      {/* Top contact bar */}
      <div className="bg-green-500 text-white py-2 px-4 flex flex-wrap justify-between items-center text-sm md:flex-nowrap md:justify-between">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            saleskenya@globeflight.co.ke
          </span>
          <span className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            +254729341277
          </span>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <MapPin className="w-4 h-4 mr-2" />
          NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className={`py-4 bg-white transition-shadow ${isSticky ? "shadow-xl" : ""}`}>
        <Container className="flex justify-between items-center text-base">
          {/* Logo */}
          <Link to="/">
            <img src={data.logo} className="w-33 h-20 object-cover" alt="globeflight.co.ke" />
          </Link>

         {/* Desktop menu */}
         <ul className="md:flex space-x-6 hidden">
            {data.navItems.map(({ link, path, external }) => (
              <li key={path} className="relative">
                {external ? (
                  <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                  >
                    {link}
                  </a>
                ) : (
                  <Link
                    to={path}
                    className={`block text-base hover:text-green-500 ${
                      pathname === path ? "font-bold text-green-500" : ""
                    }`}
                  >
                    {link}
                  </Link>
                )}

                {/* Dropdowns for Services and Contact Us */}
                {(link === "Services" || link === "Contact Us") && openDropdown === link && (
                  <ul
                    className="absolute top-full left-0 bg-white shadow-md py-2 px-4 w-40 transform transition-transform duration-200 ease-out opacity-100"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <li>
                      <Link to={`/${link.toLowerCase()}`} className="block py-1 hover:text-green-500">
                        {link} Page
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            ))}

            {/* Additional Links: Track and Bigdrop */}
            <li>
              <Link
                to="/track"
                className={`block text-base hover:text-green-500 ${
                  pathname === "/track" ? "font-medium text-green-500" : ""
                }`}
              >
                Track
              </Link>
            </li>
            <li>
              <a
                href="https://bigdrop.co.ke/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base hover:text-green-500"
              >
                Bigdrop
              </a>
            </li>

            {/* Blog Link */}
            <li>
              <Link
                to="/blog"
                className={`block text-base hover:text-green-500 ${
                  pathname === "/blog" ? "font-medium text-green-500" : ""
                }`}
              >
                Blog
              </Link>
            </li>
          </ul>

          {/* Get a Quote button - Desktop and Mobile */}
          <Link
            to="/contact-us"
            className="hidden md:inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            aria-label="Get A Quote"
          >
            Get A Quote
          </Link>

          {/* Mobile menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none text-gray-700 focus:text-green-500">
                  <Menu className="h-6 w-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-4 p-4 shadow-lg rounded-lg bg-white">
                <DropdownMenuGroup>
                  {data.navItems.map(({ link, path, external }) => (
                    <DropdownMenuItem key={path}>
                      {external ? (
                        <a
                          href={path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-base hover:text-green-500 w-full"
                          onClick={closeDropdown}
                        >
                          {link}
                        </a>
                      ) : (
                        <Link
                          to={path}
                          className={`block text-base hover:text-green-500 ${
                            pathname === path ? "font-medium text-green-500" : ""
                          }`}
                          onClick={closeDropdown}
                        >
                          {link}
                        </Link>
                      )}
                    </DropdownMenuItem>
                  ))}
                  {/* Blog Link in Mobile Dropdown */}
                  <DropdownMenuItem>
                    <Link
                      to="/blog"
                      className="block text-base hover:text-green-500 w-full"
                      onClick={closeDropdown}
                    >
                      Blog
                    </Link>
                  </DropdownMenuItem>

                  {/* Additional Links: Track and Bigdrop */}
                  <DropdownMenuItem>
                    <Link
                      to="/track"
                      className="block text-base hover:text-green-500 w-full"
                      onClick={closeDropdown}
                    >
                      Track
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a
                      href="https://bigdrop.co.ke/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-base hover:text-green-500 w-full"
                    >
                      Bigdrop
                    </a>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link
                      to="/contact-us"
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full text-left"
                    >
                      Get A Quote
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Container>
      </nav>
    </header>
  );
}
