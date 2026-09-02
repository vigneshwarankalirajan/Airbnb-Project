import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    // Users & Access
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Users",
      path: "/users",
      icon: "👥",
    },
    {
      name: "Admin Users",
      path: "/admin-users",
      icon: "🛡️",
    },
    {
      name: "Roles",
      path: "/roles",
      icon: "🔐",
    },
    {
      name: "Permissions",
      path: "/permissions",
      icon: "🔑",
    },
    {
      name: "Role Permissions",
      path: "/role-permissions",
      icon: "⚙️",
    },
    {
      name: "User Verifications",
      path: "/user-verifications",
      icon: "✅",
    },
    {
      name: "User Preferences",
      path: "/user-preferences",
      icon: "⚙️",
    },

    // Property & Listing
    {
      name: "Properties",
      path: "/properties",
      icon: "🏠",
    },
    {
      name: "Property Images",
      path: "/property-images",
      icon: "🖼️",
    },
    {
      name: "Categories",
      path: "/categories",
      icon: "📂",
    },
    {
      name: "Amenities",
      path: "/amenities",
      icon: "✨",
    },
    {
      name: "Property Amenities",
      path: "/property-amenities",
      icon: "🛋️",
    },
    {
      name: "Property Rules",
      path: "/property-rules",
      icon: "📋",
    },
    {
      name: "Listing Status History",
      path: "/listing-status-history",
      icon: "📜",
    },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-[calc(100vh-64px)]">

      <div className="p-5">

        {/* Users & Access */}
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-4">
          Users & Access
        </p>

        <nav className="space-y-1">

          {menuItems
            .filter((item) =>
              [
                "/dashboard",
                "/users",
                "/admin-users",
                "/roles",
                "/permissions",
                "/role-permissions",
                "/user-verifications",
                "/user-preferences",
              ].includes(item.path)
            )
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>

                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </NavLink>
            ))}

        </nav>

        {/* Property & Listing */}
        <p className="text-xs uppercase tracking-wider text-gray-400 mt-8 mb-4">
          Property & Listing
        </p>

        <nav className="space-y-1">

          {menuItems
            .filter((item) =>
              [
                "/properties",
                "/property-images",
                "/categories",
                "/amenities",
                "/property-amenities",
                "/property-rules",
                "/listing-status-history",
              ].includes(item.path)
            )
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>

                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </NavLink>
            ))}

        </nav>

      </div>

    </aside>
  );
}

export default Sidebar;