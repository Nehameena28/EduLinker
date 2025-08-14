
import { NavLink } from "react-router-dom";

// Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const MaterialsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const SalesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const PaymentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// NavItem component using NavLink only
const NavItem = ({ icon, title, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group flex items-center px-3 md:px-4 py-3 md:py-3 rounded-lg transition-all duration-200 cursor-pointer touch-manipulation ${
        isActive
          ? 'bg-[rgb(221,167,123)] text-[rgb(31,91,120)] font-semibold'
          : 'text-[rgb(31,91,120)] hover:bg-[rgb(221,167,123)]/30 active:bg-[rgb(221,167,123)]/50'
      }`
    }
  >
    <div className="mr-2 md:mr-3 transform group-hover:scale-105 group-active:scale-95 transition-transform duration-150">
      {icon}
    </div>
    <span className="text-sm md:text-base transform group-hover:scale-105 group-active:scale-95 transition-transform duration-150">
      {title}
    </span>
  </NavLink>
);

// Sidebar component
const Sidebar = () => {
  return (
    <div className="w-full md:w-64 bg-[rgb(221,167,123)]/10 h-full sticky top-0 overflow-hidden">
      <div className="bg-white h-full md:rounded-xl shadow-sm p-4 md:p-6 flex flex-col justify-start overflow-y-auto scrollbar-hide">
        <nav className="flex flex-col gap-2 md:gap-4">
          <NavItem icon={<DashboardIcon />} title="Dashboard" to="/seller/dashboard" />
          <NavItem icon={<UploadIcon />} title="Upload Material" to="/seller/S_upload" />
          <NavItem icon={<MaterialsIcon />} title="All Materials" to="/seller/S_Sell" />
          <NavItem icon={<SalesIcon />} title="Sales History" to="/seller/S_History" />
          <NavItem icon={<PaymentIcon />} title="Payment Info" to="/seller/S_payment" />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;