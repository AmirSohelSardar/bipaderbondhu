import {
  FaFacebookF,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
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
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Narayan Pur Bipader Bondhu Welfare Society.
          All rights reserved.
        </div>

      </div>
    </footer>
  );
}
