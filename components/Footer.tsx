import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-rose-50 text-gray-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="flex items-center space-x-2">
              <FaEnvelope />
              <a href="mailto:care@ratnaasya.in" className="hover:underline">
                care@Ratnaasya.in
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold">Policies</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Shipping And Delivery</a></li>
              <li><a href="#" className="hover:underline">Refund And Return Policy</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold">Useful Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:underline">My Account</a></li>
              <li><a href="#" className="hover:underline">Orders</a></li>
              <li><a href="#" className="hover:underline">All Collections</a></li>
              <li><a href="#" className="hover:underline">Search</a></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:underline">Any 9 Jewellery Pieces For ₹499 – Mix & Match</a></li>
              <li><a href="#" className="hover:underline">Combo</a></li>
              <li><a href="#" className="hover:underline">Any 5 Premium Jewellery Pieces For ₹1500 – Mix</a></li>
              <li><a href="#" className="hover:underline">Your Style</a></li>
              <li><a href="#" className="hover:underline">Earrings</a></li>
              <li><a href="#" className="hover:underline">Finger Rings</a></li>
              <li><a href="#" className="hover:underline">Nosepin</a></li>
              <li><a href="#" className="hover:underline">Bracelets</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm">
                @2025 NAARIVERSE A Brand Of Quantum Commerce
            </p>
            <div className="flex justify-center items-center space-x-2 mt-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg" alt="Discover" className="h-6" />
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;