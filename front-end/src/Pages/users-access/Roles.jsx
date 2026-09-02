import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../../Services/api";


function Roles() {

  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [showModal, setShowModal] =
    useState(false);

  const [editingRole, setEditingRole] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });


  // =====================================================
  // FETCH ROLES
  // =====================================================

  const fetchRoles = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getRoles();

      setRoles(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchRoles();

  }, []);


  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredRoles = useMemo(() => {

    return roles.filter((role) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        role.name
          ?.toLowerCase()
          .includes(searchText) ||

        role.description
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        role.status?.toLowerCase() ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  }, [
    roles,
    search,
    statusFilter,
  ]);


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // =====================================================
  // ADD ROLE
  // =====================================================

  const handleAdd = () => {

    setEditingRole(null);

    setFormData({
      name: "",
      description: "",
      status: "active",
    });

    setShowModal(true);

  };


  // =====================================================
  // EDIT ROLE
  // =====================================================

  const handleEdit = (role) => {

    setEditingRole(role);

    setFormData({
      name: role.name || "",
      description: role.description || "",
      status: role.status || "active",
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

      if (editingRole) {

        await updateRole(
          editingRole.id,
          formData
        );

      } else {

        await createRole(formData);

      }

      setShowModal(false);

      setEditingRole(null);

      await fetchRoles();

    } catch (err) {

      setError(err.message);

    }

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (roleId) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this role?"
    );

    if (!confirmed) {
      return;
    }

    try {

      setError("");

      await deleteRole(roleId);

      await fetchRoles();

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

        return (
          "bg-emerald-50 text-emerald-700 " +
          "border-emerald-200"
        );

      case "inactive":

        return (
          "bg-gray-100 text-gray-600 " +
          "border-gray-200"
        );

      case "suspended":

        return (
          "bg-red-50 text-red-700 " +
          "border-red-200"
        );

      default:

        return (
          "bg-gray-100 text-gray-600 " +
          "border-gray-200"
        );

    }

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

                <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">

                  <span className="text-purple-600 text-xl">
                    🔐
                  </span>

                </div>


                <div>

                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Roles
                  </h1>

                  <p className="text-gray-500 text-sm mt-1">
                    Create and manage user access roles
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

              Add Role

            </button>

          </div>


          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">


            {/* TOTAL */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-sm text-gray-500">
                    Total Roles
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    {roles.length}
                  </h2>

                </div>

                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  🔐
                </div>

              </div>

            </div>


            {/* ACTIVE */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-sm text-gray-500">
                    Active Roles
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">

                    {
                      roles.filter(
                        (role) =>
                          role.status
                            ?.toLowerCase() ===
                          "active"
                      ).length
                    }

                  </h2>

                </div>

                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  ✓
                </div>

              </div>

            </div>


            {/* INACTIVE */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-sm text-gray-500">
                    Inactive Roles
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-2">

                    {
                      roles.filter(
                        (role) =>
                          role.status
                            ?.toLowerCase() ===
                          "inactive"
                      ).length
                    }

                  </h2>

                </div>

                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  ○
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
                    placeholder="Search roles..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300"
                  />

                </div>


                {/* FILTER */}

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
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

                <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-purple-500 rounded-full mx-auto mb-4">
                </div>

                <p className="text-gray-500">
                  Loading roles...
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-gray-50/70 text-xs uppercase tracking-wider text-gray-500">

                      <th className="px-6 py-4 text-left">
                        Role
                      </th>

                      <th className="px-6 py-4 text-left">
                        Description
                      </th>

                      <th className="px-6 py-4 text-left">
                        Status
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

                    {filteredRoles.length === 0 ? (

                      <tr>

                        <td
                          colSpan="5"
                          className="py-16 text-center"
                        >

                          <div className="text-4xl mb-3">
                            🔐
                          </div>

                          <h3 className="font-semibold text-gray-800">
                            No roles found
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Try changing your search or filter.
                          </p>

                        </td>

                      </tr>

                    ) : (

                      filteredRoles.map((role) => (

                        <tr
                          key={role.id}
                          className="border-t border-gray-100 hover:bg-gray-50 transition"
                        >


                          {/* ROLE */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">

                                {role.name
                                  ?.charAt(0)
                                  ?.toUpperCase()}

                              </div>


                              <div>

                                <p className="font-semibold text-gray-900 capitalize">
                                  {role.name}
                                </p>

                                <p className="text-xs text-gray-400">
                                  Role #{role.id}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* DESCRIPTION */}

                          <td className="px-6 py-5 max-w-md">

                            <p className="text-sm text-gray-600 truncate">
                              {role.description ||
                                "No description"}
                            </p>

                          </td>


                          {/* STATUS */}

                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${getStatusStyle(
                                role.status
                              )}`}
                            >

                              <span className="w-1.5 h-1.5 rounded-full bg-current">
                              </span>

                              {role.status}

                            </span>

                          </td>


                          {/* CREATED */}

                          <td className="px-6 py-5 text-sm text-gray-500">

                            {role.created_at
                              ? new Date(
                                  role.created_at
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
                                  handleEdit(role)
                                }
                                className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
                                title="Edit"
                              >
                                ✏️
                              </button>


                              <button
                                onClick={() =>
                                  handleDelete(
                                    role.id
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

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            )}


            {/* FOOTER */}

            {!loading &&
              filteredRoles.length > 0 && (

                <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">

                  <span>
                    Showing {filteredRoles.length} of{" "}
                    {roles.length} roles
                  </span>

                  <span>
                    Role Management
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

                    {editingRole
                      ? "Edit Role"
                      : "Create New Role"}

                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Define role access and status
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


              {/* ROLE NAME */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: Host"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
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
                  placeholder="Describe what this role can do..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                />

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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
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
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800"
                >

                  {editingRole
                    ? "Save Changes"
                    : "Create Role"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );
}


export default Roles;