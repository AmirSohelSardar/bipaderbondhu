import {
  FaFacebookF,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";


export default function Footer() {
  const [stats, setStats] = useState({
  totalVisits: 0,
  uniqueVisitors: 0,
});

useEffect(() => {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/visitor`)
    .then(res => res.json())
    .then(data => setStats(data))
    .catch(() => {});
}, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-14 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
                Bipader
              </span>
              <span>Bondhu</span>
            </h2>

            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Bipader Bondhu is a non-profit organization committed to serving
              humanity through disaster relief, social welfare, and community
              support with compassion and responsibility.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/search" className="hover:text-white transition">Updates</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="/donate" className="hover:text-white transition">Donate</a></li>
            </ul>
          </div>

          {/* Our Work */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Our Work</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition">Disaster Relief</li>
              <li className="hover:text-white transition">Community Welfare</li>
              <li className="hover:text-white transition">Emergency Support</li>
              <li className="hover:text-white transition">Social Awareness</li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1" />
                Narayan Pur, Nadia, West Bengal, India
              </p>

              <p className="flex items-center gap-2">
                <FaPhoneAlt />
                <a href="tel:+919733725202" className="hover:text-white transition">
                  +91 9733725202
                </a>
              </p>

              <p className="flex items-center gap-2">
                <FaEnvelope />
                <a
                  href="mailto:narayanpurbipaderbondhu@gmail.com"
                  className="hover:text-white transition"
                >
                  narayanpurbipaderbondhu@gmail.com
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 text-xl mt-5">
              <a
                href="https://www.facebook.com/tariful.mia.2025"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition hover:scale-110"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://wa.me/919733725202"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition hover:scale-110"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Narayan+Pur+Nadia+West+Bengal+India"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition hover:scale-110"
              >
                <FaMapMarkerAlt />
              </a>
            </div>
          </div>

        </div>

{/* Bottom */}
<div className="relative border-t border-gray-800/50 mt-12 pt-8">
  {/* Decorative gradient line */}
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
  
  <div className="max-w-7xl mx-auto px-4">
    {/* Visitor Stats - Featured */}
    <div className="flex justify-center gap-8 mb-6">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span className="text-sm font-semibold text-cyan-400">{stats.totalVisits.toLocaleString()}</span>
        <span className="text-xs text-gray-400">Total Visits</span>
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="text-sm font-semibold text-blue-400">{stats.uniqueVisitors.toLocaleString()}</span>
        <span className="text-xs text-gray-400">Unique Visitors</span>
      </div>
    </div>

    {/* Copyright */}
    <p className="text-center text-sm text-gray-400">
      © {new Date().getFullYear()} <span className="text-gray-300 font-medium">Narayan Pur Bipader Bondhu Welfare Society</span>. All rights reserved.
    </p>
  </div>
</div>


      </div>
    </footer>
  );
}
