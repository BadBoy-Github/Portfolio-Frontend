import { useState } from "react";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa6";

const socialLinks = [
  {
    href: "https://github.com/BadBoy-Github",
    icon: <TbBrandGithubFilled />,
    alt: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/elayabarathi/",
    icon: <FaLinkedinIn />,
    alt: "LinkedIn",
  },
];

const categories = [
  { value: "query", label: "Query" },
  { value: "feedback", label: "Feedback" },
  { value: "question", label: "Question" },
  { value: "issue", label: "Issue" },
  { value: "collab", label: "Collaboration" },
  { value: "chitchat", label: "Chit Chat" },
  { value: "others", label: "Others" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "query",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ loading: false, success: true, error: "" });
        setFormData({
          name: "",
          email: "",
          subject: "",
          category: "query",
          message: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus((prev) => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setStatus({
          loading: false,
          success: false,
          error: data.error || "Failed to send message",
        });
      }
    } catch {
      setStatus({
        loading: false,
        success: false,
        error: "Network error. Please try again.",
      });
    }
  };

  return (
    <section id="contactme" className="section">
      <div className=" lg:grid lg:grid-cols-2 lg:items-stretch">
        <div className="mb-12 lg:mb-0 lg:flex lg:flex-col">
          <h2 className="headline-2 lg:max-w-[12ch]">
            Contact me for collaboration
          </h2>

          <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] lg:max-w-[30ch]">
            Reach out today to discuss your project needs or learning plans &
            start collaborating on something amazing!
          </p>

          <div className="flex items-center gap-2 mt-auto">
            {socialLinks.map(({ href, icon }, key) => (
              <a
                key={key}
                href={href}
                target="_blank"
                className="w-12 h-12 grid place-items-center ring-inset ring-2 ring-zinc-50/5 rounded-lg transition-[background-color,color]
                                hover:bg-zinc-50 hover:text-zinc-950 active:bg-zinc-50/80 duration-500 text-2xl"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="xl:pl-10 2xl:pl-20">
          <div className="md:grid md:items-center md:grid-cols-2 md:gap-2">
            <div className="mb-4">
              <label htmlFor="name" className="label ">
                Name
              </label>

              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                placeholder="Enter your name"
                className="text-field "
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="label ">
                Email
              </label>

              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="text-field "
              />
            </div>
          </div>

          <div className="md:grid md:items-center md:grid-cols-2 md:gap-2">
            <div className="mb-4">
              <label htmlFor="subject" className="label ">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter subject"
                className="text-field "
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="label ">
                Category
              </label>

              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="text-field "
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="label ">
              Message
            </label>

            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Enter your message"
              className="text-field resize-y min-h-32 max-h-80 "
            ></textarea>
          </div>

          {/* Status Messages */}
          {status.success && (
            <div className="mb-4 p-3 bg-green-500/20 text-green-400 rounded-lg text-sm">
              ✓ Message sent successfully! I&apos;ll get back to you soon.
            </div>
          )}

          {status.error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
              ✗ {status.error}
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="btn btn-primary [&]:max-w-full w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
