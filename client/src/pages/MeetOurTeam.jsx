import { useState } from 'react';

export default function MeetOurTeam() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Tariful Mia",
      role: "President",
      department: "Narayan Pur Bipader Bondhu Welfare Society",
      description: "Leading our mission with dedication and vision",
      image: "/images/tariful.jpg",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      darkBgGradient: "from-purple-900/20 to-pink-900/20",
      facebook: "https://www.facebook.com/tariful.mia.2025",
      whatsapp: "919733725202",
      socialType: "facebook-whatsapp"
    },
    {
      id: 2,
      name: "Ripan Khan",
      role: "Account Department",
      department: "Financial Management",
      description: "Managing financial operations and transparency",
      image: "/images/ripan.jpg",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20",
      facebook: "",
      whatsapp: "",
      socialType: "facebook-whatsapp"
    },
    {
      id: 3,
      name: "Amir Sohel Sardar",
      role: "Technical Department",
      department: "B.Tech CSE",
      description: "Upcoming Software Developer Engineer",
      image: "/images/amir.jpg",
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-50 to-teal-50",
      darkBgGradient: "from-green-900/20 to-teal-900/20",
      
      linkedin: "https://www.linkedin.com/in/amir-sohel-sardar-735698243/",
      socialType: "github-linkedin"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-pink-900/10 py-16 px-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-16 text-center animate-fadeIn">
        <div className="inline-block mb-4 animate-bounce">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-sm font-semibold text-purple-700 dark:text-purple-300 shadow-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Our Leadership
          </span>
        </div>
        
        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          Meet Our
          <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mt-2 bg-[length:200%_auto] animate-gradient">
            Dedicated Team
          </span>
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          The passionate individuals driving our mission of hope and humanity forward
        </p>
      </div>

      {/* Floating background elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="fixed top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Team Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            className="group relative animate-slideUp"
            onMouseEnter={() => setHoveredCard(member.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Card Container */}
            <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 transform hover:-translate-y-4 hover:scale-105">
              {/* Animated gradient border glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl`}></div>
              
              {/* Rotating ring effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${member.gradient} rounded-3xl opacity-0 group-hover:opacity-75 blur transition-opacity duration-500 animate-spin-slow`}></div>

              <div className={`relative bg-gradient-to-br ${member.bgGradient} dark:${member.darkBgGradient} p-8`}>
                {/* Floating particles */}
                <div className="absolute top-6 right-6 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-50" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 right-8 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-50" style={{animationDelay: '2s'}}></div>

                {/* Image Section */}
                <div className="flex justify-center mb-6">
                  <div className="relative group/img">
                    {/* Outer pulse ring */}
                    <div className={`absolute -inset-6 bg-gradient-to-r ${member.gradient} rounded-full opacity-20 group-hover:opacity-40 animate-pulse`}></div>
                    {/* Middle glow */}
                    <div className={`absolute -inset-3 bg-gradient-to-r ${member.gradient} rounded-full opacity-40 blur-lg group-hover:opacity-60 transition-opacity duration-500`}></div>
                    
                    {/* Main image with border */}
                    <div className="relative w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                      />
                      {/* Overlay gradient on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    </div>

                    {/* Status indicator */}
                    <div className="absolute bottom-1 right-1 w-7 h-7 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg">
                      <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="text-center space-y-3">
                  {/* Name */}
                  <h2 className={`text-2xl lg:text-3xl font-extrabold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent transform transition-all duration-300 ${hoveredCard === member.id ? 'scale-110' : ''}`}>
                    {member.name}
                  </h2>

                  {/* Role Badge */}
                  <div className={`inline-block px-5 py-2 bg-gradient-to-r ${member.gradient} rounded-full text-white font-bold text-sm shadow-lg transform transition-all duration-300 ${hoveredCard === member.id ? 'scale-105 shadow-2xl' : ''}`}>
                    {member.role}
                  </div>

                  {/* Department Info */}
                  <div className="space-y-2 pt-3">
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                      {member.department}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium px-4">
                      {member.description}
                    </p>
                  </div>

                  {/* Decorative line with pulse dot */}
                  <div className="flex items-center justify-center gap-2 pt-4">
                    <div className={`h-1 w-12 bg-gradient-to-r ${member.gradient} rounded-full transform transition-all duration-500 ${hoveredCard === member.id ? 'w-20' : ''}`}></div>
                    <div className={`w-3 h-3 bg-gradient-to-r ${member.gradient} rounded-full animate-pulse`}></div>
                    <div className={`h-1 w-12 bg-gradient-to-r ${member.gradient} rounded-full transform transition-all duration-500 ${hoveredCard === member.id ? 'w-20' : ''}`}></div>
                  </div>

                 {/* Social Links or Contact */}
                  <div className="flex justify-center gap-3 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {member.socialType === "facebook-whatsapp" ? (
                      <>
                        {/* Facebook Icon */}
                        <a 
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-full bg-gradient-to-r ${member.gradient} flex items-center justify-center text-white hover:scale-125 transition-transform duration-300 shadow-lg`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        {/* WhatsApp Icon */}
                        <a 
                          href={`https://wa.me/${member.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-full bg-gradient-to-r ${member.gradient} flex items-center justify-center text-white hover:scale-125 transition-transform duration-300 shadow-lg`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                        </a>
                      </>
                    ) : (
                      <>
                       
                        {/* LinkedIn Icon */}
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-full bg-gradient-to-r ${member.gradient} flex items-center justify-center text-white hover:scale-125 transition-transform duration-300 shadow-lg`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}