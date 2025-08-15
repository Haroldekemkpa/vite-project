import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">Harold Ekemkpa</h2>
          <p className="text-sm mt-1">Frontend & Full Stack Developer</p>
        </div>

        {/* Center: Navigation */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium">
          <li>
            <a href="#home" className="hover:text-orange-400">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-orange-400">
              About
            </a>
          </li>
          <li>
            <a href="#resume" className="hover:text-orange-400">
              Resume
            </a>
          </li>
          <li>
            <a href="#testimonial" className="hover:text-orange-400">
              Testimonial
            </a>
          </li>
          <li>
            <a href="#hire" className="hover:text-orange-400">
              Hire me
            </a>
          </li>
        </ul>

        {/* Right: Social Links */}
        <div className="flex gap-4">
          <a
            href="https://github.com/Haroldekemkpa"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/harold-ekemkpa/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://x.com/harold_ekemkpa"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <Twitter size={20} />
          </a>
          {/* <a
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <Facebook size={20} />
          </a> */}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Harold Ekemkpa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
