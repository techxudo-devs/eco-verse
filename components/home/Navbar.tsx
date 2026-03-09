"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, X } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaTiktok, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import qrImage from "@/public/assets/qr.avif"
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const slideEase = [0.76, 0, 0.24, 1] as const;

  const leftPanelVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.8, ease: slideEase } },
    exit: { x: "-100%", transition: { duration: 0.8, ease: slideEase } }
  };

  const rightPanelVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.8, ease: slideEase } },
    exit: { x: "100%", transition: { duration: 0.8, ease: slideEase } }
  };

  const menuLinks = [
    { name: "HOME", active: false },
    { name: "AGENCY", active: true },
    { name: "PROJECTS", active: false },
    { name: "EXPERTISE", active: false },
    { name: "FAQ", active: false },
    { name: "CONTACT", active: false }
  ];

  return (
    <>
      {/* HEADER BUTTONS */}
      <div className="fixed left-0 top-0 z-[100] w-full bg-transparent p-7 pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">

          {/* MENU BUTTON */}
          <button
            onClick={toggleMenu}
            className={`rounded-full p-6 transition-all duration-300 cursor-pointer hover:scale-110 ${isOpen ? "bg-orange-300 text-[#00522D]" : "bg-orange-200 text-black"
              }`}
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {isOpen ? <X size={18} strokeWidth={2} /> : <MenuIcon size={18} strokeWidth={2} />}
            </motion.div>
          </button>

          {/* WHATSAPP BUTTON */}
          {!isOpen && (
            <button
              className="rounded-full bg-orange-200 p-5 text-[#00522D] transition-transform duration-300 cursor-pointer hover:scale-110"
              type="button"
              aria-label="Open WhatsApp"
            >
              <FaWhatsapp size={24} />
            </button>
          )}
        </div>
      </div>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex overflow-hidden">

            {/* LEFT PANEL */}
            <motion.div
              variants={leftPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-1/2 h-full bg-[#00522D] flex flex-col justify-center pl-[8%] lg:pl-[12%]"
            >
              <nav className="flex flex-col mb-6">
                {menuLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={`#${link.name.toLowerCase()}`}
                    onClick={toggleMenu}
                    className={`font-beni font-black text-[4rem] lg:text-[5.5rem] leading-[0.8] uppercase transition-colors duration-300 hover:text-orange-400 ${link.active ? "text-orange-400" : "text-white"
                      }`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* SOCIAL ICONS */}
              <div className="flex items-center gap-2">
                {[FaInstagram, FaTiktok, FaPinterestP, FaLinkedinIn].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-white border-2 border-white rounded-full p-1.5 lg:p-2.5 hover:bg-white hover:text-[#00522D] transition-colors duration-300"
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div
              variants={rightPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-1/2 h-full bg-[#00522D] flex flex-col justify-center items-center px-8"
            >
              {/* QR CODE */}
              <Image src={qrImage} alt="QR Image" className="" />

              {/* TEXT */}
              <h2 className="font-beni font-black text-[80px] leading-[0.7] text-white text-center uppercase">
                <span className="block">SHALL WE</span>
                <span className="block">CONNECT ON</span>
                <span className="block">WHATSAPP?</span>
              </h2>

              <p className="font-clash font-bold text-white text-center text-xl leading-snug w-full max-w-[350px] mt-6">
                Because we prefer genuine, quick, and straightforward exchanges.
                Scan the QR code, send your message, and we'll reply (very quickly).
              </p>

              {/* CTA */}
              <button className="mt-10 bg-orange-500 transition-all duration-300 text-white font-clash font-semibold text-sm px-6 py-4 rounded-lg cursor-pointer hover:scale-95">
                Chat with Margaux
              </button>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;