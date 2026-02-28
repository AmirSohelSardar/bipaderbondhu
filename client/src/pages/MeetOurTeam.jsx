import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function MeetOurTeam() {
  const teamMembers = [
    {
      id: 1,
      name: "Tariful Mia",
      role: "President",
      department: "Narayan Pur Bipader Bondhu Welfare Society",
      description: "Leading our mission with dedication, integrity, and vision.",
      image: "/images/tariful.jpg",
      facebook: "https://www.facebook.com/tariful.mia.2025",
      whatsapp: "919733725202",
      gradient: "from-fuchsia-500 to-pink-500",
    },
    {
      id: 2,
      name: "Ripan Khan",
      role: "Accounts Manager",
      department: "Financial Management",
      description: "Ensuring transparency and responsible financial operations.",
      image: "/images/ripan.jpg",
      gradient: "from-sky-500 to-cyan-500",
    },
  {
  id: 3,
  name: "Amir Sohel Sardar",
  role: "Technical Department",
  department: "Technology and Development",
  description:
    "Managing digital platforms and ensuring smooth technical operations.",
  image: "/images/amir.jpg",
  gradient: "from-emerald-500 to-teal-500",
}
];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Meet Our Team
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Dedicated people behind our mission and impact
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => {
          const hasSocials = member.facebook || member.whatsapp;

          return (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Glow */}
              <div
                className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500 bg-gradient-to-r ${member.gradient}`}
              />

              {/* Content */}
              <div className="relative z-10 p-8 text-center">
                {/* Avatar */}
                <div className="relative mx-auto w-32 h-32">
                  <img
                    src={member.image}
                    alt={`${member.name} profile`}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://api.dicebear.com/7.x/identicon/svg";
                    }}
                    className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />

                  {member.isSecret && (
                    <span className="absolute bottom-1 right-1 text-xs bg-black/80 text-white px-2 py-0.5 rounded-full">
                      Anonymous
                    </span>
                  )}
                </div>

                {/* Name */}
                <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h2>

                {/* Role */}
                <span
                  className={`mt-3 inline-block px-5 py-1.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r ${member.gradient}`}
                >
                  {member.role}
                </span>

                {!member.isSecret && (
                  <>
                    <p className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {member.department}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {member.description}
                    </p>
                  </>
                )}

                {/* Social Links */}
                {!member.isSecret && hasSocials && (
                  <div className="mt-6 flex justify-center gap-4">
                    {member.facebook && (
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} Facebook`}
                        className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 text-white transition hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <FaFacebookF />
                      </a>
                    )}

                    {member.whatsapp && (
                      <a
                        href={`https://wa.me/${member.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} WhatsApp`}
                        className="w-11 h-11 flex items-center justify-center rounded-full bg-green-500 text-white transition hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        <FaWhatsapp />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
