import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { GiRomanToga } from "react-icons/gi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-300 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          {/* <Image src={logo} alt="Logo" className="h-8 w-auto" /> */}
          <GiRomanToga className="h-10 w-auto text-white" />

        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; 2024 FindBrahman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
