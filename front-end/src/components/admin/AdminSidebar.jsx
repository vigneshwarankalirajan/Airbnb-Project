import {
  LayoutDashboard,
  Users,
  UserCog,
  Building2,
  CalendarCheck,
  CreditCard,
  WalletCards,
  Star,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      label: "Users",
      icon: Users,
      path: "/users-access/users",
    },
    {
      label: "Hosts",
      icon: UserCog,
      path: "/users-access/admin-users",
    },
    {
      label: "Properties",
      icon: Building2,
      path: "/admin/properties",
    },
    {
      label: "Bookings",
      icon: CalendarCheck,
      path: "/admin/bookings",
    },
    {
      label: "Payments",
      icon: CreditCard,
      path: "/admin/payments",
    },
    {
      label: "Payment Methods",
      icon: WalletCards,
      path: "/admin/payment-methods",
    },
    {
      label: "Reviews",
      icon: Star,
      path: "/admin/reviews",
    },
    {
      label: "Reports",
      icon: BarChart3,
      path: "/admin/reports",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-gray-100 px-6">
        <div>
          <h1 className="text-xl font-bold text-[#123d78]">
            Airbnb
          </h1>
          <p className="text-xs text-gray-500">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-[#123d78] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#123d78]"
              }`}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-100 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;