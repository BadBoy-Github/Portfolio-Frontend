import { useState } from "react";
import { TbBrandGithubFilled } from "react-icons/tb";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import { Star } from "lucide-react";

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
  {
    href: "mailto:elayabarathiedison@gmail.com",
    icon: <BiLogoGmail />,
    alt: "Gmail",
  }
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

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) {
      return "Name is required";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
      return "Name should contain only letters";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateSubject = (value) => {
    if (!value.trim()) {
      return "Subject is required";
    }
    if (value.trim().length < 3) {
      return "Subject must be at least 3 characters";
    }
    if (value.trim().length > 100) {
      return "Subject must be less than 100 characters";
    }
    return "";
  };

  const validateMessage = (value) => {
    if (!value.trim()) {
      return "Message is required";
    }
    if (value.trim().length < 10) {
      return "Message must be at least 10 characters";
    }
    if (value.trim().length > 2000) {
      return "Message must be less than 2000 characters";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      subject: validateSubject(formData.subject),
      message: validateMessage(formData.message),
    };

    // Remove empty error messages
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Validate on blur
    let error = "";
    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "subject":
        error = validateSubject(value);
        break;
      case "message":
        error = validateMessage(value);
        break;
      default:
        break;
    }

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ loading: false, success: false, error: "" });
        setFormData({
          name: "",
          email: "",
          subject: "",
          category: "query",
          message: "",
        });
        setErrors({});
        showToast("Message sent successfully", "success");
      } else {
        setStatus({
          loading: false,
          success: false,
          error: data.error || "Failed to send message",
        });
        showToast(data.error || "Failed to send message", "error");
      }
    } catch {
      setStatus({
        loading: false,
        success: false,
        error: "Network error. Please try again.",
      });
      showToast("Network error. Please try again.", "error");
    }
  };

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', company: '', content: '', rating: 5, imgSrc: '' });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewForm),
      });
      const data = await res.json();
      if (data.success) {
        setReviewOpen(false);
        setReviewForm({ name: '', email: '', company: '', content: '', rating: 5, imgSrc: '' });
        showToast('Your review sent successfully', 'success');
      } else {
        showToast(data.error || 'Failed to send review', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setReviewLoading(false);
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
            {socialLinks.map(({ href, icon, alt }, key) => (
              <a
                key={key}
                href={href}
                target="_blank"
                aria-label={`Visit my ${alt} profile`}
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
                onBlur={handleBlur}
                autoComplete="name"
                placeholder="Enter your name"
                className={`text-field ${errors.name ? "ring-2 ring-red-500" : ""}`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="label ">
                Email
              </label>

              <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                placeholder="Enter your email"
                className={`text-field ${errors.email ? "ring-2 ring-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
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
                onBlur={handleBlur}
                placeholder="Enter subject"
                className={`text-field ${errors.subject ? "ring-2 ring-red-500" : ""}`}
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
              )}
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
                className="text-field"
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
              onBlur={handleBlur}
              placeholder="Enter your message"
              className={`text-field resize-y min-h-32 max-h-80 ${errors.message ? "ring-2 ring-red-500" : ""}`}
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Status Messages */}
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

        <div className="mt-10 text-center">
          <p className="text-zinc-400 mb-3">Would you like to leave a review?</p>
          <button
            type="button"
            onClick={() => setReviewOpen(true)}
            className="btn btn-primary"
          >
            Leave a Review
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
            toast.type === 'success' ? 'bg-sky-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {toast.type === 'success' ? '✓ ' : '✗ '}{toast.message}
          </div>
        </div>
      )}

      {reviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Leave a Review</h3>
              <button
                type="button"
                onClick={() => setReviewOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div>
                <label className="label">Your Name</label>
                <input
                  className="text-field"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="label">Your Company Name</label>
                <input
                  className="text-field"
                  value={reviewForm.company}
                  onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })}
                  placeholder="Enter your company name"
                />
              </div>
              <div>
                <label className="label">Your Image URL</label>
                <input
                  className="text-field"
                  value={reviewForm.imgSrc}
                  onChange={(e) => setReviewForm({ ...reviewForm, imgSrc: e.target.value })}
                  placeholder="https://example.com/your-image.jpg"
                />
              </div>
              <div>
                <label className="label">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="transition-all duration-200"
                    >
                      <Star
                        size={28}
                        className={`cursor-pointer ${
                          star <= reviewForm.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-zinc-400 ml-2">{reviewForm.rating}/5</span>
                </div>
              </div>
              <div>
                <label className="label">Review Content</label>
                <textarea
                  className="text-field"
                  rows={3}
                  value={reviewForm.content}
                  onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                  placeholder="Write your review here..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={reviewLoading}
                className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {reviewLoading ? 'Sending...' : 'Send Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
