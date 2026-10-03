import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, clearSession as adminClearSession } from '../AdminLogin';
import PropTypes from 'prop-types';
import { IoArrowBackCircleOutline } from "react-icons/io5";

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
      <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-paper-card border-2 border-ink rounded-wobbly-lg shadow-hard w-full max-w-sm max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b-2 border-dashed border-ink/20 shrink-0">
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          <button onClick={onCancel} className="text-ink-soft hover:text-marker transition-colors">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5">
          <p className="text-ink-soft text-sm">{message}</p>
        </div>
        <div className="flex gap-3 justify-end p-5 border-t-2 border-dashed border-ink/20 shrink-0">
          <button onClick={onCancel} className="btn btn-outline">Cancel</button>
          <button onClick={onConfirm} className="btn btn-primary !bg-accent-red hover:!bg-accent-red/80 text-paper">Delete</button>
        </div>
      </div>
    </div>
  );
};

const FormModal = ({ open, onClose, title, error, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-ink/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-paper-card border-2 border-ink rounded-wobbly-lg shadow-hard w-full max-w-3xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b-2 border-dashed border-ink/20 shrink-0">
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          <button onClick={onClose} className="text-ink-soft hover:text-marker transition-colors">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5">
          {error && <p className="text-accent-red text-sm mb-4">{error}</p>}
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

const TOAST_KEY = 'adminToast';
const LOGOUT_TOAST_KEY = 'adminLogoutToast';

const getPersistentToast = () => {
  try {
    const raw = sessionStorage.getItem(TOAST_KEY);
    if (!raw) return null;
    const toast = JSON.parse(raw);
    sessionStorage.removeItem(TOAST_KEY);
    return toast;
  } catch {
    return null;
  }
};

const getLogoutToast = () => {
  try {
    const raw = sessionStorage.getItem(LOGOUT_TOAST_KEY);
    if (!raw) return null;
    const toast = JSON.parse(raw);
    sessionStorage.removeItem(LOGOUT_TOAST_KEY);
    return toast;
  } catch {
    return null;
  }
};

const setPersistentToast = (message, type = 'success') => {
  sessionStorage.setItem(TOAST_KEY, JSON.stringify({ message, type }));
};

const setLogoutToast = (message, type = 'success') => {
  sessionStorage.setItem(LOGOUT_TOAST_KEY, JSON.stringify({ message, type }));
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tech-stacks');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate('/admin-login');
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  useEffect(() => {
    const pending = getPersistentToast();
    if (pending) {
      addToast(pending.message, pending.type);
    }
  }, [navigate, addToast]);

  const handleLogout = () => {
    adminClearSession();
    setLogoutToast('Logged out successfully', 'success');
    navigate('/admin-login');
  };

  const handleGoToWebsite = () => {
    navigate("/");
  };

  if (!authChecked) return null;

  return (
    <div className="min-h-screen bg-paper flex flex-col md:flex-row md:h-screen">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between bg-paper-card border-b-2 border-dashed border-ink/20 p-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-ink">
            Admin Dashboard
          </h1>
          <a href="/" className="text-xs text-ballpoint hover:text-ink transition-colors">
            Go to Website
          </a>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="menu-btn">
          <span className="material-symbols-rounded">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${mobileOpen ? "block" : "hidden"} md:flex md:w-64 md:h-screen md:overflow-hidden bg-paper-card border-r-2 border-dashed border-ink/20`}
      >
        <div className="p-4 w-64">
          <div className="hidden md:flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-ink">
                Admin Dashboard
              </h1>
              <p className="text-xs text-ink-soft mt-1">
                Portfolio Content Manager
              </p>
            </div>

          </div>

          <nav className="space-y-1">
            <TabButton
              id="tech-stacks"
              label="Tech Stacks"
              icon="code"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileOpen={setMobileOpen}
            />
            <TabButton
              id="projects"
              label="Projects"
              icon="folder_open"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileOpen={setMobileOpen}
            />
            <TabButton
              id="certificates"
              label="Certificates"
              icon="badge"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileOpen={setMobileOpen}
            />
            <TabButton
              id="achievements"
              label="Achievements"
              icon="emoji_events"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileOpen={setMobileOpen}
            />
            <TabButton
              id="reviews"
              label="Reviews"
              icon="rate_review"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileOpen={setMobileOpen}
            />
            <TabButton
              id="experience"
              label="Experience"
              icon="work"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileOpen={setMobileOpen}
            />
            <TabButton
              id="education"
              label="Education"
              icon="school"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileOpen={setMobileOpen}
            />
            <TabButton
              id="blogs"
              label="Blogs"
              icon="article"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setMobileOpen={setMobileOpen}
            />
          </nav>

          <div className="mt-8 pt-6 border-t-2 border-dashed border-ink/20">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-wobbly-sm text-sm font-medium text-ballpoint hover:text-ink hover:bg-paper/80 transition-colors"
              onClick={handleGoToWebsite}
            >
              <IoArrowBackCircleOutline className="size-5" />
              <p>Go to Website</p>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-wobbly-sm text-sm font-medium text-accent-red hover:text-ink hover:bg-paper/80 transition-colors"
            >
              <span className="material-symbols-rounded text-[20px]">
                logout
              </span>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:h-screen md:overflow-y-auto bg-paper">
        {activeTab === "tech-stacks" && <TechStacksTab addToast={addToast} />}
        {activeTab === "projects" && <ProjectsTab addToast={addToast} />}
        {activeTab === "certificates" && (
          <CertificatesTab addToast={addToast} />
        )}
        {activeTab === "achievements" && (
          <AchievementsTab addToast={addToast} />
        )}
        {activeTab === "reviews" && <ReviewsTab addToast={addToast} />}
        {activeTab === "experience" && <ExperienceTab addToast={addToast} />}
        {activeTab === "education" && <EducationTab addToast={addToast} />}
        {activeTab === "blogs" && <BlogsTab addToast={addToast} />}
      </main>

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-wobbly-sm shadow-hard text-sm font-medium flex items-center gap-2 ${
              toast.type === "success"
                ? 'bg-marker text-ink'
                : 'bg-accent-red text-paper'
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
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-wobbly-sm text-sm font-medium transition-colors ${
      activeTab === id
        ? 'bg-marker text-ink shadow-hard-sm'
        : 'text-ink-soft hover:text-ink hover:bg-paper/80'
    }`}
  >
    <span className="material-symbols-rounded text-[20px]">{icon}</span>
    {label}
  </button>
);

export { ConfirmModal, FormModal, AdminDashboard };
export default AdminDashboard;
