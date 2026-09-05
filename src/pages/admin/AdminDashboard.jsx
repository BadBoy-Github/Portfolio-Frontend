import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, clearSession as adminClearSession } from '../AdminLogin';
import PropTypes from 'prop-types';

import TechStacksTab from './TechStacksTab';
import ProjectsTab from './ProjectsTab';
import CertificatesTab from './CertificatesTab';
import AchievementsTab from './AchievementsTab';
import ReviewsTab from './ReviewsTab';
import ExperienceTab from './ExperienceTab';
import EducationTab from './EducationTab';
import BlogsTab from './BlogsTab';

const ConfirmModal = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className="relative bg-zinc-800 rounded-2xl ring-1 ring-zinc-50/5 shadow-xl w-full max-w-sm max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-zinc-700/50 shrink-0">
          <h3 className="text-lg font-semibold text-zinc-50">{title}</h3>
          <button onClick={onCancel} className="text-zinc-400 hover:text-zinc-200">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5">
          <p className="text-zinc-300 text-sm">{message}</p>
        </div>
        <div className="flex gap-3 justify-end p-5 border-t border-zinc-700/50 shrink-0">
          <button onClick={onCancel} className="btn btn-outline">Cancel</button>
          <button onClick={onConfirm} className="btn btn-primary !bg-red-500 hover:!bg-red-400">Delete</button>
        </div>
      </div>
    </div>
  );
};

const FormModal = ({ open, onClose, title, error, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-800 rounded-2xl ring-1 ring-zinc-50/5 shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-zinc-700/50 shrink-0">
          <h3 className="text-lg font-semibold text-zinc-50">{title}</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5">
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tech-stacks');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate('/admin-login');
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    adminClearSession();
    navigate('/admin-login');
  };

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  if (!authChecked) return null;

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col md:flex-row md:h-screen">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between bg-zinc-800 p-4 ring-1 ring-zinc-50/5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-zinc-50">Admin Dashboard</h1>
          <a href="/" className="text-xs text-sky-400 hover:text-sky-300">Go to Website</a>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="menu-btn">
          <span className="material-symbols-rounded">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${mobileOpen ? 'block' : 'hidden'} md:flex md:w-64 md:h-screen md:overflow-hidden bg-zinc-800 ring-1 ring-zinc-50/5`}>
        <div className="p-4 w-64">
          <div className="hidden md:flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-zinc-50">Admin Dashboard</h1>
              <p className="text-xs text-zinc-400 mt-1">Portfolio Content Manager</p>
            </div>
            <a href="/" className="text-xs text-sky-400 hover:text-sky-300" target="_blank" rel="noopener noreferrer">
              Go to Website
            </a>
          </div>

          <nav className="space-y-1">
            <TabButton id="tech-stacks" label="Tech Stacks" icon="code" activeTab={activeTab} setActiveTab={setActiveTab} setMobileOpen={setMobileOpen} />
            <TabButton id="projects" label="Projects" icon="folder_open" activeTab={activeTab} setActiveTab={setActiveTab} setMobileOpen={setMobileOpen} />
            <TabButton id="certificates" label="Certificates" icon="badge" activeTab={activeTab} setActiveTab={setActiveTab} setMobileOpen={setMobileOpen} />
            <TabButton id="achievements" label="Achievements" icon="emoji_events" activeTab={activeTab} setActiveTab={setActiveTab} setMobileOpen={setMobileOpen} />
            <TabButton id="reviews" label="Reviews" icon="rate_review" activeTab={activeTab} setActiveTab={setActiveTab} setMobileOpen={setMobileOpen} />
            <TabButton id="experience" label="Experience" icon="work" activeTab={activeTab} setActiveTab={setActiveTab} setMobileOpen={setMobileOpen} />
            <TabButton id="education" label="Education" icon="school" activeTab={activeTab} setActiveTab={setActiveTab} setMobileOpen={setMobileOpen} />
            <TabButton id="blogs" label="Blogs" icon="article" activeTab={activeTab} setActiveTab={setActiveTab} setMobileOpen={setMobileOpen} />
          </nav>

          <div className="mt-8 pt-6 border-t border-zinc-700/50">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-zinc-700/50 transition-colors">
              <span className="material-symbols-rounded text-[20px]">logout</span>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:h-screen md:overflow-y-auto p-4 md:p-8">
        {activeTab === 'tech-stacks' && <TechStacksTab addToast={addToast} />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'certificates' && <CertificatesTab />}
        {activeTab === 'achievements' && <AchievementsTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
        {activeTab === 'experience' && <ExperienceTab />}
        {activeTab === 'education' && <EducationTab />}
        {activeTab === 'blogs' && <BlogsTab />}
      </main>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 ${
              toast.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30'
                : 'bg-red-500/20 text-red-400 ring-1 ring-red-500/30'
            }`}
          >
            <span className="material-symbols-rounded text-[18px]">
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

const TabButton = ({ id, label, icon, activeTab, setActiveTab, setMobileOpen }) => (
  <button
    onClick={() => {
      setActiveTab(id);
      setMobileOpen && setMobileOpen(false);
    }}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
      activeTab === id
        ? 'bg-sky-400 text-zinc-950'
        : 'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-700/50'
    }`}
  >
    <span className="material-symbols-rounded text-[20px]">{icon}</span>
    {label}
  </button>
);

export { ConfirmModal, FormModal, AdminDashboard };
export default AdminDashboard;
