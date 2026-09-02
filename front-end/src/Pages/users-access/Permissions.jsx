import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from "../../Services/api";


function Permissions() {

  const [permissions, setPermissions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [moduleFilter, setModuleFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);

  const [editingPermission, setEditingPermission] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    module: "",
  });


  // =====================================================
  // GET PERMISSIONS
  // =====================================================

  const fetchPermissions = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getPermissions();

      setPermissions(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchPermissions();

  }, []);


  // =====================================================
  // UNIQUE MODULES
  // =====================================================

  const modules = useMemo(() => {

    const moduleList = permissions
      .map((permission) => permission.module)
      .filter(Boolean);

    return [...new Set(moduleList)];

  }, [permissions]);


  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredPermissions = useMemo(() => {

    return permissions.filter((permission) => {

      const searchText = search.toLowerCase();

      const matchesSearch =
        permission.name
          ?.toLowerCase()
          .includes(searchText) ||

        permission.description
          ?.toLowerCase()
          .includes(searchText) ||

        permission.module
          ?.toLowerCase()
          .includes(searchText);


      const matchesModule =
        moduleFilter === "all" ||
        permission.module === moduleFilter;


      return (
        matchesSearch &&
        matchesModule
      );

    });

  }, [
    permissions,
    search,
    moduleFilter,
  ]);


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // =====================================================
  // ADD
  // =====================================================

  const handleAdd = () => {

    setEditingPermission(null);

    setFormData({
      name: "",
      description: "",
      module: "",
    });

    setShowModal(true);

  };


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (permission) => {

    setEditingPermission(permission);

    setFormData({
      name: permission.name || "",
      description: permission.description || "",
      module: permission.module || "",
    });

    setShowModal(true);

  };


  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");

      if (editingPermission) {

        await updatePermission(
          editingPermission.id,
          formData
        );

      } else {

        await createPermission(formData);

      }

      setShowModal(false);

      setEditingPermission(null);

      await fetchPermissions();

    } catch (err) {

      setError(err.message);

    }

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (permissionId) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this permission?"
    );

    if (!confirmed) {
      return;
    }

    try {

      setError("");

      await deletePermission(permissionId);

      await fetchPermissions();

    } catch (err) {

      setError(err.message);

    }

  };


  // =====================================================
  // PERMISSION ICON
  // =====================================================

  const getPermissionIcon = (permissionName) => {

    const icons = {

      // Property
      view_property: "👁️",
      create_property: "➕",
      update_property: "✏️",
      delete_property: "🗑️",

      view_properties: "🏠",
      manage_properties: "🏠",

      // Booking
      view_booking: "📋",
      create_booking: "📅",
      update_booking: "📝",
      delete_booking: "🗑️",
      cancel_booking: "❌",
      manage_bookings: "📅",

      // Users
      view_users: "👤",
      create_user: "👤",
      update_user: "✏️",
      delete_user: "🗑️",
      manage_users: "👥",

      // Payments
      view_payments: "💳",
      create_payment: "💰",
      update_payment: "💳",
      delete_payment: "🗑️",
      refund_payment: "↩️",
      manage_payments: "💳",

      // Roles & Permissions
      view_roles: "🛡️",
      create_role: "🛡️",
      update_role: "✏️",
      delete_role: "🗑️",
      manage_roles: "🛡️",

      view_permissions: "🔐",
      create_permission: "🔐",
      update_permission: "✏️",
      delete_permission: "🗑️",
      manage_permissions: "🔐",

      // Reports
      view_reports: "📊",
      create_report: "📊",
      manage_reports: "📊",

      // Reviews
      view_reviews: "⭐",
      create_review: "⭐",
      update_review: "✏️",
      delete_review: "🗑️",
      manage_reviews: "⭐",

      // Categories
      view_categories: "🗂️",
      create_category: "➕",
      update_category: "✏️",
      delete_category: "🗑️",
      manage_categories: "🗂️",

      // Amenities
      view_amenities: "🛋️",
      create_amenity: "➕",
      update_amenity: "✏️",
      delete_amenity: "🗑️",
      manage_amenities: "🛋️",

      // Notifications
      view_notifications: "🔔",
      create_notification: "🔔",
      manage_notifications: "🔔",

      // Messages
      view_messages: "💬",
      send_messages: "💬",
      manage_messages: "💬",

      // Settings
      view_settings: "⚙️",
      update_settings: "⚙️",
      manage_settings: "⚙️",

    };

    return icons[permissionName] || "🔑";

  };


  // =====================================================
  // MODULE COLOR
  // =====================================================

  const getModuleStyle = (module) => {

    if (!module) {

      return "bg-gray-100 text-gray-600 border-gray-200";

    }

    const styles = [
      "bg-blue-50 text-blue-700 border-blue-200",
      "bg-purple-50 text-purple-700 border-purple-200",
      "bg-emerald-50 text-emerald-700 border-emerald-200",
      "bg-orange-50 text-orange-700 border-orange-200",
      "bg-pink-50 text-pink-700 border-pink-200",
    ];


    let hash = 0;

    for (let i = 0; i < module.length; i++) {

      hash += module.charCodeAt(i);

    }


    return styles[hash % styles.length];

  };


  return (

    <div className="min-h-screen bg-[#f7f7f7]">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">


          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                  <span className="text-blue-600 text-xl">
                    🔑
                  </span>

                </div>


                <div>

                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Permissions
                  </h1>

                  <p className="text-gray-500 text-sm mt-1">
                    Manage system permissions and access capabilities
                  </p>

                </div>

              </div>

            </div>


            <button
              onClick={handleAdd}
              className="bg-gray-900 text-white px-5 py-3 rounded-xl font-medium hover:bg-gray-800 transition shadow-sm"
            >

              <span className="mr-2">
                +
              </span>

              Add Permission

            </button>

          </div>


          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">


            {/* TOTAL */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Total Permissions
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    {permissions.length}
                  </h2>

                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  🔑
                </div>

              </div>

            </div>


            {/* MODULES */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Modules
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    {modules.length}
                  </h2>

                </div>

                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  📦
                </div>

              </div>

            </div>


            {/* UNCATEGORIZED */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Uncategorized
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">

                    {
                      permissions.filter(
                        (permission) =>
                          !permission.module
                      ).length
                    }

                  </h2>

                </div>

                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  ⚠️
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>

          )}


          {/* =================================================
              MAIN CARD
          ================================================= */}

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">


            {/* TOOLBAR */}

            <div className="p-5 border-b border-gray-100">

              <div className="flex flex-col lg:flex-row gap-3">


                {/* SEARCH */}

                <div className="relative flex-1">

                  <input
                    type="text"
                    placeholder="Search permissions..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />

                </div>


                {/* MODULE FILTER */}

                <select
                  value={moduleFilter}
                  onChange={(e) =>
                    setModuleFilter(
                      e.target.value
                    )
                  }
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                >

                  <option value="all">
                    All Modules
                  </option>

                  {modules.map((module) => (

                    <option
                      key={module}
                      value={module}
                    >
                      {module}
                    </option>

                  ))}

                </select>

              </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            {loading ? (

              <div className="py-20 text-center">

                <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full mx-auto mb-4">
                </div>

                <p className="text-gray-500">
                  Loading permissions...
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-gray-50/70 text-xs uppercase tracking-wider text-gray-500">

                      <th className="px-6 py-4 text-left">
                        Permission
                      </th>

                      <th className="px-6 py-4 text-left">
                        Description
                      </th>

                      <th className="px-6 py-4 text-left">
                        Module
                      </th>

                      <th className="px-6 py-4 text-left">
                        Created
                      </th>

                      <th className="px-6 py-4 text-right">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredPermissions.length === 0 ? (

                      <tr>

                        <td
                          colSpan="5"
                          className="py-16 text-center"
                        >

                          <div className="text-4xl mb-3">
                            🔑
                          </div>

                          <h3 className="font-semibold text-gray-800">
                            No permissions found
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Try changing your search or module filter.
                          </p>

                        </td>

                      </tr>

                    ) : (

                      filteredPermissions.map(
                        (permission) => (

                          <tr
                            key={permission.id}
                            className="border-t border-gray-100 hover:bg-gray-50 transition"
                          >


                            {/* PERMISSION */}

                            <td className="px-6 py-5">

                              <div className="flex items-center gap-3">

                                {/* DYNAMIC PERMISSION ICON */}

                                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">

                                  {getPermissionIcon(
                                    permission.name
                                  )}

                                </div>


                                <div>

                                  <p className="font-semibold text-gray-900">
                                    {permission.name}
                                  </p>

                                  <p className="text-xs text-gray-400">
                                    Permission #{permission.id}
                                  </p>

                                </div>

                              </div>

                            </td>


                            {/* DESCRIPTION */}

                            <td className="px-6 py-5 max-w-md">

                              <p className="text-sm text-gray-600">
                                {permission.description ||
                                  "No description"}
                              </p>

                            </td>


                            {/* MODULE */}

                            <td className="px-6 py-5">

                              <span
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${getModuleStyle(
                                  permission.module
                                )}`}
                              >

                                <span className="w-1.5 h-1.5 rounded-full bg-current">
                                </span>

                                {permission.module ||
                                  "Uncategorized"}

                              </span>

                            </td>


                            {/* CREATED */}

                            <td className="px-6 py-5 text-sm text-gray-500">

                              {permission.created_at
                                ? new Date(
                                    permission.created_at
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "-"}

                            </td>


                            {/* ACTIONS */}

                            <td className="px-6 py-5">

                              <div className="flex justify-end gap-2">

                                <button
                                  onClick={() =>
                                    handleEdit(
                                      permission
                                    )
                                  }
                                  className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
                                  title="Edit"
                                >
                                  ✏️
                                </button>


                                <button
                                  onClick={() =>
                                    handleDelete(
                                      permission.id
                                    )
                                  }
                                  className="px-3 py-2 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition"
                                  title="Delete"
                                >
                                  🗑
                                </button>

                              </div>

                            </td>

                          </tr>

                        )
                      )

                    )}

                  </tbody>

                </table>

              </div>

            )}


            {/* FOOTER */}

            {!loading &&
              filteredPermissions.length > 0 && (

                <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">

                  <span>
                    Showing {filteredPermissions.length} of{" "}
                    {permissions.length} permissions
                  </span>

                  <span>
                    Permission Management
                  </span>

                </div>

              )}

          </div>

        </main>

      </div>


      {/* =================================================
          MODAL
      ================================================= */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">


            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b">

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-xl font-bold text-gray-900">

                    {editingPermission
                      ? "Edit Permission"
                      : "Create New Permission"}

                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Define a system capability
                  </p>

                </div>


                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-500 text-xl"
                >
                  ×
                </button>

              </div>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >


              {/* NAME */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Permission Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: manage_bookings"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Example: Manage all booking operations"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* MODULE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Module
                </label>

                <input
                  type="text"
                  name="module"
                  value={formData.module}
                  onChange={handleChange}
                  placeholder="Example: Booking"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* BUTTONS */}

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800"
                >

                  {editingPermission
                    ? "Save Changes"
                    : "Create Permission"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );
}


export default Permissions;