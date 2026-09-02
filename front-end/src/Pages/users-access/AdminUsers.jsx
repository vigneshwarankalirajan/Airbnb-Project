import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from "../../Services/api";


function AdminUsers() {

  const [adminUsers, setAdminUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);

  const [editingAdmin, setEditingAdmin] = useState(null);

  const [formData, setFormData] = useState({
    user_id: "",
    admin_type: "moderator",
    status: "active",
  });


  // =====================================================
  // GET ADMIN USERS
  // =====================================================

  const fetchAdminUsers = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getAdminUsers();

      setAdminUsers(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchAdminUsers();

  }, []);


  // =====================================================
  // FORM CHANGE
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

    setEditingAdmin(null);

    setFormData({
      user_id: "",
      admin_type: "moderator",
      status: "active",
    });

    setShowModal(true);

  };


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (admin) => {

    setEditingAdmin(admin);

    setFormData({
      user_id: admin.user_id,
      admin_type: admin.admin_type || "moderator",
      status: admin.status || "active",
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

      if (editingAdmin) {

        const updateData = {
          admin_type: formData.admin_type,
          status: formData.status,
        };

        await updateAdminUser(
          editingAdmin.id,
          updateData
        );

      } else {

        const createData = {
          user_id: Number(formData.user_id),
          admin_type: formData.admin_type,
          status: formData.status,
        };

        await createAdminUser(createData);

      }

      setShowModal(false);

      setEditingAdmin(null);

      await fetchAdminUsers();

    } catch (err) {

      setError(err.message);

    }

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (adminId) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this admin user?"
    );

    if (!confirmed) {
      return;
    }

    try {

      setError("");

      await deleteAdminUser(adminId);

      await fetchAdminUsers();

    } catch (err) {

      setError(err.message);

    }

  };


  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {

    switch (status?.toLowerCase()) {

      case "active":

        return {
          badge:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot:
            "bg-emerald-500",
        };

      case "inactive":

        return {
          badge:
            "bg-gray-100 text-gray-600 border-gray-200",
          dot:
            "bg-gray-400",
        };

      case "suspended":

        return {
          badge:
            "bg-red-50 text-red-700 border-red-200",
          dot:
            "bg-red-500",
        };

      default:

        return {
          badge:
            "bg-gray-100 text-gray-600 border-gray-200",
          dot:
            "bg-gray-400",
        };

    }

  };


  // =====================================================
  // ADMIN TYPE ICON
  // =====================================================

  const getAdminTypeIcon = (type) => {

    switch (type?.toLowerCase()) {

      case "super_admin":
        return "👑";

      case "admin":
        return "🛡️";

      case "moderator":
        return "👤";

      case "support":
        return "🎧";

      default:
        return "👤";

    }

  };


  // =====================================================
  // ADMIN TYPE STYLE
  // =====================================================

  const getAdminTypeStyle = (type) => {

    switch (type?.toLowerCase()) {

      case "super_admin":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "admin":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "moderator":
        return "bg-orange-50 text-orange-700 border-orange-200";

      case "support":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";

    }

  };


  // =====================================================
  // FILTER
  // =====================================================

  const filteredAdmins = useMemo(() => {

    const searchText =
      search.toLowerCase().trim();

    return adminUsers.filter((admin) => {

      const matchesSearch =

        String(admin.id)
          .toLowerCase()
          .includes(searchText) ||

        String(admin.user_id)
          .toLowerCase()
          .includes(searchText) ||

        admin.admin_type
          ?.toLowerCase()
          .includes(searchText);


      const matchesStatus =
        statusFilter === "all" ||
        admin.status?.toLowerCase() ===
          statusFilter;


      return (
        matchesSearch &&
        matchesStatus
      );

    });

  }, [
    adminUsers,
    search,
    statusFilter,
  ]);


  // =====================================================
  // STATS
  // =====================================================

  const totalAdmins =
    adminUsers.length;

  const activeAdmins =
    adminUsers.filter(
      (admin) =>
        admin.status?.toLowerCase() ===
        "active"
    ).length;

  const suspendedAdmins =
    adminUsers.filter(
      (admin) =>
        admin.status?.toLowerCase() ===
        "suspended"
    ).length;


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="min-h-screen bg-[#f7f8fa]">

      <Navbar />

      <div className="flex">

        <Sidebar />


        <main className="flex-1 p-6 lg:p-8">


          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">


            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-2xl shadow-sm">
                🛡️
              </div>


              <div>

                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Admin Users
                </h1>

                <p className="text-gray-500 mt-1">
                  Manage administrator accounts and access levels
                </p>

              </div>

            </div>


            <button
              onClick={handleAdd}
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition shadow-sm"
            >

              <span className="text-xl leading-none">
                +
              </span>

              Add Admin User

            </button>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">

              <span className="text-lg">
                ⚠️
              </span>

              <p className="text-sm font-medium">
                {error}
              </p>

            </div>

          )}


          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">


            {/* TOTAL */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500 font-medium">
                    Total Admins
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {totalAdmins}
                  </p>

                </div>


                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                  🛡️
                </div>

              </div>

            </div>


            {/* ACTIVE */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500 font-medium">
                    Active Admins
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {activeAdmins}
                  </p>

                </div>


                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                  ✓
                </div>

              </div>

            </div>


            {/* SUSPENDED */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500 font-medium">
                    Suspended
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {suspendedAdmins}
                  </p>

                </div>


                <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl">
                  !
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              MAIN TABLE CARD
          ================================================= */}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">


            {/* =================================================
                TOOLBAR
            ================================================= */}

            <div className="p-5 border-b border-gray-100">

              <div className="flex flex-col lg:flex-row gap-3">


                {/* SEARCH */}

                <div className="relative flex-1">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </div>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search by admin ID, user ID or admin type..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition"
                  />

                </div>


                {/* STATUS FILTER */}

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-purple-300"
                >

                  <option value="all">
                    All Status
                  </option>

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>

                  <option value="suspended">
                    Suspended
                  </option>

                </select>

              </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            {loading ? (

              <div className="py-20 text-center">

                <div className="animate-spin w-9 h-9 border-4 border-gray-200 border-t-purple-600 rounded-full mx-auto mb-4">
                </div>

                <p className="text-gray-500 text-sm">
                  Loading admin users...
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">


                  {/* TABLE HEADER */}

                  <thead>

                    <tr className="bg-gray-50/80 border-b border-gray-100">

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Admin
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        User ID
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Admin Type
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Created
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  {/* TABLE BODY */}

                  <tbody>

                    {filteredAdmins.length === 0 ? (

                      <tr>

                        <td
                          colSpan="6"
                          className="py-16 text-center"
                        >

                          <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center text-2xl mb-4">
                            🛡️
                          </div>

                          <h3 className="font-semibold text-gray-800">
                            No admin users found
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Try changing your search or status filter.
                          </p>

                        </td>

                      </tr>

                    ) : (

                      filteredAdmins.map(
                        (admin) => {

                          const statusStyle =
                            getStatusStyle(
                              admin.status
                            );


                          return (

                            <tr
                              key={admin.id}
                              className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70 transition"
                            >


                              {/* ADMIN */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-3">

                                  <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-lg">
                                    {getAdminTypeIcon(
                                      admin.admin_type
                                    )}
                                  </div>


                                  <div>

                                    <p className="font-semibold text-gray-900">
                                      Admin #{admin.id}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-0.5">
                                      Administrator account
                                    </p>

                                  </div>

                                </div>

                              </td>


                              {/* USER ID */}

                              <td className="px-6 py-5">

                                <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-mono text-sm">
                                  #{admin.user_id}
                                </span>

                              </td>


                              {/* ADMIN TYPE */}

                              <td className="px-6 py-5">

                                <span
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold capitalize ${getAdminTypeStyle(
                                    admin.admin_type
                                  )}`}
                                >

                                  <span>
                                    {getAdminTypeIcon(
                                      admin.admin_type
                                    )}
                                  </span>

                                  {admin.admin_type?.replace(
                                    "_",
                                    " "
                                  )}

                                </span>

                              </td>


                              {/* STATUS */}

                              <td className="px-6 py-5">

                                <span
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold capitalize ${statusStyle.badge}`}
                                >

                                  <span
                                    className={`w-2 h-2 rounded-full ${statusStyle.dot}`}
                                  />

                                  {admin.status}

                                </span>

                              </td>


                              {/* CREATED */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-2 text-sm text-gray-500">

                                  <span>
                                    📅
                                  </span>

                                  {admin.created_at
                                    ? new Date(
                                        admin.created_at
                                      ).toLocaleDateString(
                                        "en-IN",
                                        {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        }
                                      )
                                    : "-"}

                                </div>

                              </td>


                              {/* ACTIONS */}

                              <td className="px-6 py-5">

                                <div className="flex justify-end gap-2">


                                  {/* EDIT */}

                                  <button
                                    onClick={() =>
                                      handleEdit(
                                        admin
                                      )
                                    }
                                    title="Edit Admin"
                                    className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition flex items-center justify-center"
                                  >
                                    ✏️
                                  </button>


                                  {/* DELETE */}

                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        admin.id
                                      )
                                    }
                                    title="Delete Admin"
                                    className="w-9 h-9 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition flex items-center justify-center"
                                  >
                                    🗑️
                                  </button>

                                </div>

                              </td>

                            </tr>

                          );

                        }
                      )

                    )}

                  </tbody>

                </table>

              </div>

            )}


            {/* =================================================
                FOOTER
            ================================================= */}

            {!loading &&
              filteredAdmins.length > 0 && (

                <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                  <p className="text-sm text-gray-500">

                    Showing{" "}

                    <span className="font-semibold text-gray-700">
                      {filteredAdmins.length}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-gray-700">
                      {adminUsers.length}
                    </span>

                    {" "}admin users

                  </p>


                  <p className="text-xs text-gray-400">
                    Admin Management
                  </p>

                </div>

              )}

          </div>

        </main>

      </div>


      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">


          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">


            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/70">

              <div className="flex items-center justify-between">


                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                    {editingAdmin
                      ? "✏️"
                      : "🛡️"}
                  </div>


                  <div>

                    <h2 className="text-xl font-bold text-gray-900">

                      {editingAdmin
                        ? "Update Admin User"
                        : "Create Admin User"}

                    </h2>

                    <p className="text-sm text-gray-500 mt-0.5">
                      Configure administrator access
                    </p>

                  </div>

                </div>


                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="w-9 h-9 rounded-lg hover:bg-gray-200 text-gray-500 text-xl transition"
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


              {/* USER ID */}

              {!editingAdmin && (

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    User ID
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      👤
                    </span>

                    <input
                      type="number"
                      name="user_id"
                      value={formData.user_id}
                      onChange={handleChange}
                      placeholder="Enter existing user ID"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                      required
                    />

                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    Enter an existing user ID from the users table.
                  </p>

                </div>

              )}


              {/* ADMIN TYPE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Type
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    {getAdminTypeIcon(
                      formData.admin_type
                    )}
                  </span>

                  <select
                    name="admin_type"
                    value={formData.admin_type}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none appearance-none bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                  >

                    <option value="super_admin">
                      Super Admin
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                    <option value="moderator">
                      Moderator
                    </option>

                    <option value="support">
                      Support
                    </option>

                  </select>

                </div>

              </div>


              {/* STATUS */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                >

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>

                  <option value="suspended">
                    Suspended
                  </option>

                </select>

              </div>


              {/* BUTTONS */}

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition"
                >

                  {editingAdmin
                    ? "Save Changes"
                    : "Create Admin"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );
}


export default AdminUsers;