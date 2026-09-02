import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../Services/api";


function Users() {

  // =========================================================
  // STATE
  // =========================================================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const [saving, setSaving] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password_hash: "",
    phone: "",
    role: "guest",
    status: "Active",
  });


  // =========================================================
  // GET USERS
  // =========================================================

  const fetchUsers = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getUsers();

      setUsers(Array.isArray(data) ? data : []);

    } catch (err) {

      console.error("Failed to fetch users:", err);

      setError(
        err.message || "Failed to load users."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchUsers();

  }, []);


  // =========================================================
  // SEARCH
  // =========================================================

  const filteredUsers = useMemo(() => {

    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return users;
    }

    return users.filter((user) => {

      return (

        String(user.id || "")
          .toLowerCase()
          .includes(searchText)

        ||

        String(user.name || "")
          .toLowerCase()
          .includes(searchText)

        ||

        String(user.email || "")
          .toLowerCase()
          .includes(searchText)

        ||

        String(user.phone || "")
          .toLowerCase()
          .includes(searchText)

        ||

        String(user.role || "")
          .toLowerCase()
          .includes(searchText)

      );

    });

  }, [users, search]);


  // =========================================================
  // ROLE FILTER
  // =========================================================

  const adminUsers = filteredUsers.filter(
    (user) =>
      String(user.role || "").toLowerCase() === "admin"
  );


  const hostUsers = filteredUsers.filter(
    (user) =>
      String(user.role || "").toLowerCase() === "host"
  );


  const guestUsers = filteredUsers.filter(
    (user) =>
      String(user.role || "").toLowerCase() === "guest"
  );


  // =========================================================
  // COUNTS
  // =========================================================

  const totalUsers = users.length;


  const activeUsers = users.filter(
    (user) =>
      String(user.status || "").toLowerCase() === "active"
  ).length;


  const inactiveUsers = users.filter(
    (user) =>
      String(user.status || "").toLowerCase() !== "active"
  ).length;


  // =========================================================
  // ADD USER
  // =========================================================

  const handleAddUser = () => {

    setEditingUser(null);

    setFormData({
      name: "",
      email: "",
      password_hash: "",
      phone: "",
      role: "guest",
      status: "Active",
    });

    setError("");

    setShowModal(true);

  };


  // =========================================================
  // EDIT USER
  // =========================================================

  const handleEditUser = (user) => {

    setEditingUser(user);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      password_hash: "",
      phone: user.phone || "",
      role: user.role || "guest",
      status: user.status || "Active",
    });

    setError("");

    setShowModal(true);

  };


  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }));

  };


  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setSaving(true);

      setError("");


      // UPDATE

      if (editingUser) {

        await updateUser(
          editingUser.id,
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            status: formData.status,
          }
        );

      }

      // CREATE

      else {

        await createUser(formData);

      }


      // Close modal

      setShowModal(false);

      setEditingUser(null);


      // Reload database data

      await fetchUsers();

    } catch (err) {

      console.error(
        "Failed to save user:",
        err
      );

      setError(
        err.message || "Failed to save user."
      );

    } finally {

      setSaving(false);

    }

  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (user) => {

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );


    if (!confirmed) {
      return;
    }


    try {

      setError("");

      await deleteUser(user.id);

      await fetchUsers();

    } catch (err) {

      console.error(
        "Failed to delete user:",
        err
      );

      setError(
        err.message || "Failed to delete user."
      );

    }

  };


  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {

    if (saving) {
      return;
    }

    setShowModal(false);

    setEditingUser(null);

  };


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-GB"
    );

  };


  // =========================================================
  // ROLE LABEL
  // =========================================================

  const getRoleLabel = (role) => {

    if (!role) {
      return "-";
    }

    return (
      role.charAt(0).toUpperCase() +
      role.slice(1).toLowerCase()
    );

  };


  // =========================================================
  // STATUS BADGE
  // =========================================================

  const StatusBadge = ({ status }) => {

    const isActive =
      String(status || "").toLowerCase() === "active";


    return (

      <span
        className={
          isActive
            ? "inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
            : "inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
        }
      >

        <span
          className={
            isActive
              ? "mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"
              : "mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500"
          }
        />

        {status || "Inactive"}

      </span>

    );

  };


  // =========================================================
  // USER TABLE
  // =========================================================

  const UserTable = ({
    title,
    subtitle,
    data,
    role,
  }) => {

    return (

      <section className="mb-8">

        {/* Section Header */}

        <div className="mb-3 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-gray-800">
              {title}
            </h2>

            <p className="mt-0.5 text-sm text-gray-500">
              {subtitle}
            </p>

          </div>


          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
            {data.length}
          </span>

        </div>


        {/* Table Card */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              {/* Header */}

              <thead>

                <tr className="border-b border-gray-200 bg-gray-50">

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                    ID
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                    Name
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                    Role
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                    Created
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>

                </tr>

              </thead>


              {/* Body */}

              <tbody>

                {data.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="px-5 py-12 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
                          👤
                        </div>

                        <p className="font-medium text-gray-600">
                          No {role} users found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          Users with this role will appear here.
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : (

                  data.map((user) => (

                    <tr
                      key={user.id}
                      className="border-b border-gray-100 transition hover:bg-gray-50 last:border-b-0"
                    >

                      {/* ID */}

                      <td className="px-5 py-4 text-sm font-medium text-gray-600">
                        #{user.id}
                      </td>


                      {/* Name */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                            {user.name
                              ? user.name
                                  .charAt(0)
                                  .toUpperCase()
                              : "U"}
                          </div>

                          <div>

                            <p className="text-sm font-semibold text-gray-800">
                              {user.name}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* Email */}

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {user.email}
                      </td>


                      {/* Phone */}

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {user.phone || "-"}
                      </td>


                      {/* Role */}

                      <td className="px-5 py-4">

                        <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                          {getRoleLabel(user.role)}
                        </span>

                      </td>


                      {/* Status */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={user.status}
                        />

                      </td>


                      {/* Created */}

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {formatDate(user.created_at)}
                      </td>


                      {/* Actions */}

                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleEditUser(user)
                            }
                            className="rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                          >
                            Edit
                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(user)
                            }
                            className="rounded-lg bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </section>

    );

  };


  // =========================================================
  // MAIN UI
  // =========================================================

  return (

    <div className="min-h-screen bg-[#f5f6f8]">

      <Navbar />


      <div className="flex">

        <Sidebar />


        <main className="min-w-0 flex-1 p-6 lg:p-8">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

  {/* Users Icon */}
  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl shadow-sm">
    👥
  </div>

  <div>

    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
      Users
    </h1>

    <p className="mt-1 text-sm text-gray-500">
      Manage registered Airbnb users
    </p>

  </div>

</div>


            <button
              type="button"
              onClick={handleAddUser}
              className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
            >
              + Add User
            </button>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

              <span>
                {error}
              </span>

              <button
                type="button"
                onClick={() => setError("")}
                className="font-bold"
              >
                ×
              </button>

            </div>

          )}


          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-3">


            {/* Total */}

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {totalUsers}
                  </h2>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-lg">
                  👥
                </div>

              </div>

            </div>


            {/* Active */}

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Active Users
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-green-600">
                    {activeUsers}
                  </h2>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-lg">
                  ✓
                </div>

              </div>

            </div>


            {/* Inactive */}

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Inactive Users
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-red-600">
                    {inactiveUsers}
                  </h2>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-lg">
                  !
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="mb-7 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

            <div className="relative">

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by name, email, phone or role..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />

            </div>

          </div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">

              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />

              <p className="text-sm text-gray-500">
                Loading users...
              </p>

            </div>

          ) : (

            <>

              {/* ADMIN */}

              <UserTable
                title="Admin Users"
                subtitle="System administrators"
                data={adminUsers}
                role="admin"
              />


              {/* HOST */}

              <UserTable
                title="Host Users"
                subtitle="Property hosts and owners"
                data={hostUsers}
                role="host"
              />


              {/* GUEST */}

              <UserTable
                title="Guest Users"
                subtitle="Registered Airbnb guests"
                data={guestUsers}
                role="guest"
              />

            </>

          )}

        </main>

      </div>


      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {

            if (event.target === event.currentTarget) {
              closeModal();
            }

          }}
        >

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  {editingUser
                    ? "Edit User"
                    : "Add New User"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {editingUser
                    ? "Update user information"
                    : "Create a new Airbnb user"}
                </p>

              </div>


              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                ×
              </button>

            </div>


            {/* Modal Body */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* Name */}

              <div>

                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  required
                />

              </div>


              {/* Email */}

              <div>

                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  required
                />

              </div>


              {/* Password */}

              {!editingUser && (

                <div>

                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password_hash"
                    value={formData.password_hash}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    required
                  />

                </div>

              )}


              {/* Phone */}

              <div>

                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />

              </div>


              {/* Role + Status */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Role
                  </label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  >

                    <option value="guest">
                      Guest
                    </option>

                    <option value="host">
                      Host
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </div>


                <div>

                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                    <option value="Suspended">
                      Suspended
                    </option>

                  </select>

                </div>

              </div>


              {/* Buttons */}

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving
                    ? "Saving..."
                    : editingUser
                    ? "Update User"
                    : "Create User"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}


export default Users;