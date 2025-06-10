import { Phone, Mail, Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#262729]">
      <div className="max-w-7xl mx-auto px-3">
        {/* Top Section */}
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 flex flex-col md:flex-row justify-between py-10 border-b border-[#F8E3C9]/40">
            {/* Contact Info */}
            <div className="flex flex-col md:flex-row gap-10 mb-6 md:mb-0">
              <a
                href="tel:+918123959702"
                className="text-white text-sm font-semibold hover:text-[#F8E3C9] transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                +91-8123959702
              </a>
              <a
                href="mailto:support@meatdelicacy.com"
                className="text-white text-sm font-semibold hover:text-[#F8E3C9] transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                support@meatdelicacy.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5">
              <h6 className="text-white text-sm font-semibold">Follow Us</h6>
              <a
                href="#"
                className="text-white hover:text-[#F8E3C9] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-[#F8E3C9] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <ul className="flex flex-wrap justify-center gap-8 md:gap-16 py-9 text-center">
              <li>
                <a
                  href="/contact"
                  className="text-white text-sm font-semibold hover:text-[#F8E3C9] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-white text-sm font-semibold hover:text-[#F8E3C9] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-white text-sm font-semibold hover:text-[#F8E3C9] transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/refund"
                  className="text-white text-sm font-semibold hover:text-[#F8E3C9] transition-colors"
                >
                  Refund & Return Policy
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="text-white text-sm font-semibold hover:text-[#F8E3C9] transition-colors"
                >
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#393B3C] text-white font-semibold py-4 text-center">
        <p className="text-sm">Copyright © 2024 Meat Delicacy</p>
      </div>
    </footer>
  );
};
