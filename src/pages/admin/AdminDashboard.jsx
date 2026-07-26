import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import TechStacksTab from './TechStacksTab';
import ProjectsTab from './ProjectsTab';
import CertificatesTab from './CertificatesTab';
import AchievementsTab from './AchievementsTab';
import ReviewsTab from './ReviewsTab';
import ExperienceTab from './ExperienceTab';
import EducationTab from './EducationTab';
import BlogsTab from './BlogsTab';

const TABS = [
  { id: 'tech-stacks', label: 'Tech Stacks', icon: 'code' },
  { id: 'projects', label: 'Projects', icon: 'folder_open' },
  { id: 'certificates', label: 'Certificates', icon: 'badge' },
  { id: 'achievements', label: 'Achievements', icon: 'emoji_events' },
  { id: 'reviews', label: 'Reviews', icon: 'rate_review' },
  { id: 'experience', label: 'Experience', icon: 'work' },
  { id: 'education', label: 'Education', icon: 'school' },
  { id: 'blogs', label: 'Blogs', icon: 'article' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tech-stacks');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminEmail = localStorage.getItem('adminEmail');
    if (!token || !adminEmail) {
      navigate('/admin-login');
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin-login');
  };

  return authChecked ? (
    <div className="min-h-screen bg-zinc-900 flex flex-col md:flex-row">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between bg-zinc-800 p-4 ring-1 ring-zinc-50/5">
        <h1 className="text-lg font-semibold text-zinc-50">Admin Dashboard</h1>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="menu-btn">
          <span className="material-symbols-rounded">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${mobileOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-zinc-800 md:min-h-screen ring-1 ring-zinc-50/5`}>
        <div className="p-4">
          <div className="hidden md:block mb-6">
            <h1 className="text-xl font-semibold text-zinc-50">Admin Dashboard</h1>
            <p className="text-xs text-zinc-400 mt-1">Portfolio Content Manager</p>
          </div>

          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-sky-400 text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-700/50'
                }`}
              >
                <span className="material-symbols-rounded text-[20px]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-zinc-700/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-zinc-700/50 transition-colors"
            >
              <span className="material-symbols-rounded text-[20px]">logout</span>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {activeTab === 'tech-stacks' && <TechStacksTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'certificates' && <CertificatesTab />}
        {activeTab === 'achievements' && <AchievementsTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
        {activeTab === 'experience' && <ExperienceTab />}
        {activeTab === 'education' && <EducationTab />}
        {activeTab === 'blogs' && <BlogsTab />}
      </main>
    </div>
  ) : null;
};

export default AdminDashboard;
