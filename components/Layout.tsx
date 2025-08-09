import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TREATMENTS } from '../constants';
import { Icon } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
}

const Header: React.FC = () => {
  const linkStyle = "text-gray-600 hover:text-slate-800 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkStyle = "text-slate-900 font-semibold";

  const handleStartConsultation = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const treatmentsSection = document.getElementById('treatments');
      if(window.location.pathname !== '/') {
          // If not on homepage, navigate first then scroll
          window.location.href = '/#treatments';
      } else {
         treatmentsSection?.scrollIntoView({ behavior: 'smooth' });
      }
  };


  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-slate-800 text-2xl font-bold tracking-tight">
              MANNEX
            </Link>
          </div>
           <div className="hidden md:flex items-center space-x-6">
              {Object.keys(TREATMENTS).map((key) => (
                  <NavLink
                    key={key}
                    to={`/treatment/${key}`}
                    className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                  >
                    {TREATMENTS[key].name}
                  </NavLink>
                ))}
                <NavLink
                  to="/learn"
                  className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                >
                  Learn
                </NavLink>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={handleStartConsultation} className="bg-slate-700 text-white font-bold px-5 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors duration-300">
               Start Consultation
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-800 text-white">
    <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-4">MANNEX</h3>
                <p className="text-gray-400">Reimagining men's wellness.</p>
                 <div className="flex space-x-4 mt-4">
                    <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white"><Icon classes="fab fa-facebook-f" /></a>
                    <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white"><Icon classes="fab fa-twitter" /></a>
                    <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white"><Icon classes="fab fa-instagram" /></a>
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Treatments</h4>
                <ul className="space-y-2 text-gray-400">
                    {Object.entries(TREATMENTS).map(([id, { name }]) => (
                        <li key={id}><Link to={`/treatment/${id}`} className="hover:text-white">{name}</Link></li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white">About Us</a></li>
                    <li><Link to="/learn" className="hover:text-white">Learn</Link></li>
                    <li><a href="#" className="hover:text-white">Careers</a></li>
                </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white">Contact Us</a></li>
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} MANNEX. All rights reserved.</p>
            <p className="mt-2">Disclaimer: The information on this website is not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
        </div>
    </div>
  </footer>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow bg-white">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;