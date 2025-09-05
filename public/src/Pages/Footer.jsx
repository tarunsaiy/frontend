import React from "react";
import { FaUser, FaEnvelope, FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-20 shadow-inner border-t border-yellow-600">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Owner Info */}
        <div className="text-center md:text-left space-y-2 flex flex-col md:flex-row md:items-center md:space-x-6 md:space-y-0">
          <div className="flex items-center gap-3">
            <FaUser className="text-yellow-400 text-xl" aria-hidden="true" />
            <p className="font-extrabold text-2xl tracking-wide text-yellow-400">
              tarunsai
            </p>
          </div>
          <p className="text-sm text-gray-400 font-medium md:ml-2">
            Full Stack Developer & SDE
          </p>
          <a
            href="mailto:tarunsaiyendava@gmail.com"
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-all duration-300"
            aria-label="Send email to Tarunsai"
          >
            <FaEnvelope className="animate-pulse text-yellow-400" />
            <span className="text-sm">tarunsaiyendava@gmail.com</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 md:mt-0 text-sm text-gray-400 font-semibold select-none flex items-center gap-2">
          <FaRegCopyright />
          <span>
            {new Date().getFullYear()} TarunSai — All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
