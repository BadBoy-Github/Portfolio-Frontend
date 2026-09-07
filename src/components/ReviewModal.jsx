import { useState } from "react";
import { Star } from "lucide-react";

const ReviewModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', content: '', rating: 5, imgSrc: '' });

  const reset = () => setForm({ name: '', email: '', company: '', content: '', rating: 5, imgSrc: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        reset();
        onSuccess?.();
        onClose();
      } else {
        alert(data.error || 'Failed to send review');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Leave a Review</h3>
          <button type="button" onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="label">Your Name</label>
            <input className="text-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" required />
          </div>
          <div>
            <label className="label">Your Email</label>
            <input className="text-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" required />
          </div>
          <div>
            <label className="label">Your Designation</label>
            <input className="text-field" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Enter your job role" />
          </div>
          <div>
            <label className="label">Your Image URL</label>
            <input className="text-field" value={form.imgSrc} onChange={(e) => setForm({ ...form, imgSrc: e.target.value })} placeholder="https://example.com/your-image.jpg" />
          </div>
          <div>
            <label className="label">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })} className="transition-all duration-200">
                  <Star size={28} className={`cursor-pointer ${star <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}`} />
                </button>
              ))}
              <span className="text-sm text-zinc-400 ml-2">{form.rating}/5</span>
            </div>
          </div>
          <div>
            <label className="label">Review Content</label>
            <textarea className="text-field" rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write your review here..." required />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Sending...' : 'Send Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
