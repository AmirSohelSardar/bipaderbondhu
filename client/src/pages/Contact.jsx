import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState(""); // success or error

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/xpwzyppl", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      setStatus("SUCCESS");
      form.reset(); // Clear form
    } else {
      setStatus("ERROR");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-10">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Contact Us
      </h1>

      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full p-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full p-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-lg font-medium transition"
          >
            Send Message
          </button>
        </form>

        {/* Status Message */}
        {status === "SUCCESS" && (
          <p className="text-green-500 mt-4 text-center font-medium">
            ✅ Message sent successfully!
          </p>
        )}
        {status === "ERROR" && (
          <p className="text-red-500 mt-4 text-center font-medium">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
