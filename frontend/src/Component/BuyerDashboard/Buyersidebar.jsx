import { NavLink } from "react-router-dom";

// Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const PurchasedIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13M7 13h10M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

const SavedIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
  </svg>
);

// const DownloadIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//       d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
//   </svg>
// );

const PaymentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// NavItem component using NavLink
const NavItem = ({ icon, title, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group flex items-center px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
        isActive
          ? 'bg-[rgb(221,167,123)] text-[rgb(31,91,120)] font-semibold'
          : 'text-[rgb(31,91,120)] hover:bg-[rgb(221,167,123)]/30'
      }`
    }
  >
    <div className="mr-3 transform group-hover:scale-105 group-active:scale-95 transition-transform duration-150">
      {icon}
    </div>
    <span className="transform group-hover:scale-105 group-active:scale-95 transition-transform duration-150">
      {title}
    </span>
  </NavLink>
);

// Buyer Sidebar component
const Buyersidebar = () => {
  return (
    <div className="w-72 bg-[rgb(221,167,123)]/10 min-h-screen flex flex-col">
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6 mx-4 flex-1 flex flex-col justify-between">
        <nav className="flex flex-col gap-5">
          <NavItem icon={<DashboardIcon />} title="Dashboard" to="/buyer/dashboard" />
          <NavItem icon={<PurchasedIcon />} title="Purchased Docs" to="/buyer/B_purchased" />
          <NavItem icon={<SavedIcon />} title="Saved" to="/buyer/B_Saved" />
          {/* <NavItem icon={<DownloadIcon />} title="Downloade's" to="/buyer/B_Downloaded" /> */}
          <NavItem icon={<PaymentIcon />} title="Payment History" to="/buyer/B_Payment" />
        </nav>

        <div className="text-xs text-center text-gray-500 mt-10">
          © 2025 Edulinker
        </div>
      </div>
    </div>
  );
};
 


export default Buyersidebar;