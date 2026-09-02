import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
  getVerifications,
  createVerification,
  updateVerification,
  deleteVerification,
} from "../../Services/api";


function UserVerifications() {

  const [verifications, setVerifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingVerification, setEditingVerification] =
    useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [formData, setFormData] = useState({
    user_id: "",
    document_type: "Aadhaar",
    document_number: "",
    document_url: "",
    verification_status: "pending",
    reviewed_by: "",
    reviewed_at: "",
  });


  // =====================================================
  // GET VERIFICATIONS
  // =====================================================

  const fetchVerifications = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getVerifications();

      setVerifications(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchVerifications();

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

    setEditingVerification(null);

    setFormData({
      user_id: "",
      document_type: "Aadhaar",
      document_number: "",
      document_url: "",
      verification_status: "pending",
      reviewed_by: "",
      reviewed_at: "",
    });

    setShowModal(true);

  };


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (verification) => {

    setEditingVerification(verification);

    setFormData({
      user_id: verification.user_id,
      document_type:
        verification.document_type || "",
      document_number:
        verification.document_number || "",
      document_url:
        verification.document_url || "",
      verification_status:
        verification.verification_status ||
        "pending",
      reviewed_by:
        verification.reviewed_by || "",
      reviewed_at:
        verification.reviewed_at || "",
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

      if (editingVerification) {

        const updateData = {
          document_type:
            formData.document_type,

          document_number:
            formData.document_number,

          document_url:
            formData.document_url,

          verification_status:
            formData.verification_status,

          reviewed_by:
            formData.reviewed_by
              ? Number(formData.reviewed_by)
              : null,

          reviewed_at:
            formData.reviewed_at || null,
        };

        await updateVerification(
          editingVerification.id,
          updateData
        );

      } else {

        const createData = {
          user_id:
            Number(formData.user_id),

          document_type:
            formData.document_type,

          document_number:
            formData.document_number,

          document_url:
            formData.document_url,

          verification_status:
            formData.verification_status,
        };

        await createVerification(createData);

      }

      setShowModal(false);

      setEditingVerification(null);

      await fetchVerifications();

    } catch (err) {

      setError(err.message);

    }

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (verificationId) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this verification?"
    );

    if (!confirmed) {
      return;
    }

    try {

      setError("");

      await deleteVerification(
        verificationId
      );

      await fetchVerifications();

    } catch (err) {

      setError(err.message);

    }

  };


  // =====================================================
  // DOCUMENT ICON
  // =====================================================

  const getDocumentIcon = (type) => {

    switch (type?.toLowerCase()) {

      case "aadhaar":
        return "🪪";

      case "passport":
        return "🌐";

      case "driving license":
      case "driving licence":
        return "🚗";

      case "voter id":
        return "🗳️";

      default:
        return "📄";

    }

  };


  // =====================================================
  // DOCUMENT STYLE
  // =====================================================

  const getDocumentStyle = (type) => {

    switch (type?.toLowerCase()) {

      case "aadhaar":
        return "bg-orange-50 text-orange-700 border-orange-200";

      case "passport":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "driving license":
      case "driving licence":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "voter id":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";

    }

  };


  // =====================================================
  // STATUS CONFIG
  // =====================================================

  const getStatusConfig = (status) => {

    switch (status?.toLowerCase()) {

      case "verified":

        return {
          label: "Verified",
          badge:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
          icon: "✓",
        };

      case "pending":

        return {
          label: "Pending",
          badge:
            "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
          icon: "⏳",
        };

      case "rejected":

        return {
          label: "Rejected",
          badge:
            "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500",
          icon: "×",
        };

      default:

        return {
          label: status || "Unknown",
          badge:
            "bg-gray-50 text-gray-600 border-gray-200",
          dot: "bg-gray-400",
          icon: "•",
        };

    }

  };


  // =====================================================
  // FILTER
  // =====================================================

  const filteredVerifications = useMemo(() => {

    const text =
      search.toLowerCase().trim();

    return verifications.filter(
      (verification) => {

        const matchesSearch =

          String(
            verification.id
          )
            .toLowerCase()
            .includes(text) ||

          String(
            verification.user_id
          )
            .toLowerCase()
            .includes(text) ||

          verification.document_type
            ?.toLowerCase()
            .includes(text) ||

          verification.document_number
            ?.toLowerCase()
            .includes(text);


        const matchesStatus =
          statusFilter === "all" ||
          verification.verification_status
            ?.toLowerCase() ===
            statusFilter;


        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );

  }, [
    verifications,
    search,
    statusFilter,
  ]);


  // =====================================================
  // STATISTICS
  // =====================================================

  const totalCount =
    verifications.length;

  const verifiedCount =
    verifications.filter(
      (item) =>
        item.verification_status
          ?.toLowerCase() ===
        "verified"
    ).length;

  const pendingCount =
    verifications.filter(
      (item) =>
        item.verification_status
          ?.toLowerCase() ===
        "pending"
    ).length;

  const rejectedCount =
    verifications.filter(
      (item) =>
        item.verification_status
          ?.toLowerCase() ===
        "rejected"
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
              HEADER
          ================================================= */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-2xl shadow-sm">
                🪪
              </div>

              <div>

                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  User Verifications
                </h1>

                <p className="text-gray-500 mt-1">
                  Manage and verify user identity documents
                </p>

              </div>

            </div>


            <button
              onClick={handleAdd}
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition shadow-sm"
            >

              <span className="text-xl">
                +
              </span>

              Add Verification

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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">


            {/* TOTAL */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Verifications
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {totalCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  🪪
                </div>

              </div>

            </div>


            {/* VERIFIED */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Verified
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {verifiedCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                  ✓
                </div>

              </div>

            </div>


            {/* PENDING */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Pending
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {pendingCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                  ⏳
                </div>

              </div>

            </div>


            {/* REJECTED */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Rejected
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {rejectedCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl">
                  ×
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              TABLE CARD
          ================================================= */}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">


            {/* =================================================
                TOOLBAR
            ================================================= */}

            <div className="p-5 border-b border-gray-100">

              <div className="flex flex-col lg:flex-row gap-3">

                {/* SEARCH */}

                <div className="relative flex-1">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search by user ID, document type or number..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition"
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
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-300"
                >

                  <option value="all">
                    All Status
                  </option>

                  <option value="verified">
                    Verified
                  </option>

                  <option value="pending">
                    Pending
                  </option>

                  <option value="rejected">
                    Rejected
                  </option>

                </select>

              </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            {loading ? (

              <div className="py-20 text-center">

                <div className="animate-spin w-9 h-9 border-4 border-gray-200 border-t-blue-600 rounded-full mx-auto mb-4">
                </div>

                <p className="text-gray-500 text-sm">
                  Loading verifications...
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">


                  {/* HEADER */}

                  <thead>

                    <tr className="bg-gray-50/80 border-b border-gray-100">

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Verification
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        User
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Document
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Document Number
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Reviewed By
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Created
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  {/* BODY */}

                  <tbody>

                    {filteredVerifications.length === 0 ? (

                      <tr>

                        <td
                          colSpan="8"
                          className="py-16 text-center"
                        >

                          <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center text-2xl mb-4">
                            🪪
                          </div>

                          <h3 className="font-semibold text-gray-800">
                            No verifications found
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Try changing your search or status filter.
                          </p>

                        </td>

                      </tr>

                    ) : (

                      filteredVerifications.map(
                        (verification) => {

                          const status =
                            getStatusConfig(
                              verification.verification_status
                            );


                          return (

                            <tr
                              key={verification.id}
                              className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70 transition"
                            >


                              {/* VERIFICATION */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-3">

                                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-lg">
                                    🪪
                                  </div>

                                  <div>

                                    <p className="font-semibold text-gray-900">
                                      Verification #{verification.id}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-0.5">
                                      Identity document
                                    </p>

                                  </div>

                                </div>

                              </td>


                              {/* USER */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-2">

                                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                                    👤
                                  </div>

                                  <span className="font-semibold text-gray-700">
                                    #{verification.user_id}
                                  </span>

                                </div>

                              </td>


                              {/* DOCUMENT */}

                              <td className="px-6 py-5">

                                <span
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${getDocumentStyle(
                                    verification.document_type
                                  )}`}
                                >

                                  <span>
                                    {getDocumentIcon(
                                      verification.document_type
                                    )}
                                  </span>

                                  {verification.document_type}

                                </span>

                              </td>


                              {/* DOCUMENT NUMBER */}

                              <td className="px-6 py-5">

                                <span className="font-mono text-sm text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                                  {verification.document_number ||
                                    "-"}
                                </span>

                              </td>


                              {/* STATUS */}

                              <td className="px-6 py-5">

                                <span
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${status.badge}`}
                                >

                                  <span
                                    className={`w-2 h-2 rounded-full ${status.dot}`}
                                  />

                                  {status.icon}

                                  {status.label}

                                </span>

                              </td>


                              {/* REVIEWED BY */}

                              <td className="px-6 py-5">

                                {verification.reviewed_by ? (

                                  <div className="flex items-center gap-2">

                                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm">
                                      🛡️
                                    </div>

                                    <span className="text-sm font-medium text-gray-700">
                                      #{verification.reviewed_by}
                                    </span>

                                  </div>

                                ) : (

                                  <span className="text-sm text-gray-400">
                                    Not reviewed
                                  </span>

                                )}

                              </td>


                              {/* CREATED */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-2 text-sm text-gray-500">

                                  <span>
                                    📅
                                  </span>

                                  {verification.created_at
                                    ? new Date(
                                        verification.created_at
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


                                  {/* DOCUMENT */}

                                  {verification.document_url && (

                                    <a
                                      href={
                                        verification.document_url
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title="View Document"
                                      className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition flex items-center justify-center"
                                    >
                                      📄
                                    </a>

                                  )}


                                  {/* EDIT */}

                                  <button
                                    onClick={() =>
                                      handleEdit(
                                        verification
                                      )
                                    }
                                    title="Edit Verification"
                                    className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition flex items-center justify-center"
                                  >
                                    ✏️
                                  </button>


                                  {/* DELETE */}

                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        verification.id
                                      )
                                    }
                                    title="Delete Verification"
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


            {/* FOOTER */}

            {!loading &&
              filteredVerifications.length > 0 && (

                <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                  <p className="text-sm text-gray-500">

                    Showing{" "}

                    <span className="font-semibold text-gray-700">
                      {filteredVerifications.length}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-gray-700">
                      {verifications.length}
                    </span>

                    {" "}verifications

                  </p>

                  <p className="text-xs text-gray-400">
                    Identity Verification Management
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

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">


            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/70">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                    {editingVerification
                      ? "✏️"
                      : "🪪"}
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">

                      {editingVerification
                        ? "Update Verification"
                        : "Create Verification"}

                    </h2>

                    <p className="text-sm text-gray-500 mt-0.5">
                      Manage identity document verification details
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
              className="p-6"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                {/* USER ID */}

                {!editingVerification && (

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
                        placeholder="Enter user ID"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        required
                      />

                    </div>

                  </div>

                )}


                {/* DOCUMENT TYPE */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Document Type
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                      {getDocumentIcon(
                        formData.document_type
                      )}
                    </span>

                    <select
                      name="document_type"
                      value={formData.document_type}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      required
                    >

                      <option value="Aadhaar">
                        Aadhaar
                      </option>

                      <option value="Passport">
                        Passport
                      </option>

                      <option value="Driving License">
                        Driving License
                      </option>

                      <option value="Voter ID">
                        Voter ID
                      </option>

                    </select>

                  </div>

                </div>


                {/* DOCUMENT NUMBER */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Document Number
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      🔢
                    </span>

                    <input
                      name="document_number"
                      value={formData.document_number}
                      onChange={handleChange}
                      placeholder="Enter document number"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      required
                    />

                  </div>

                </div>


                {/* STATUS */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Verification Status
                  </label>

                  <select
                    name="verification_status"
                    value={
                      formData.verification_status
                    }
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="pending">
                      ⏳ Pending
                    </option>

                    <option value="verified">
                      ✓ Verified
                    </option>

                    <option value="rejected">
                      × Rejected
                    </option>

                  </select>

                </div>


                {/* DOCUMENT URL */}

                <div className="md:col-span-2">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Document URL
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      🔗
                    </span>

                    <input
                      type="url"
                      name="document_url"
                      value={formData.document_url}
                      onChange={handleChange}
                      placeholder="https://example.com/document.pdf"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                </div>


                {/* REVIEWED BY */}

                {editingVerification && (

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reviewed By
                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        🛡️
                      </span>

                      <input
                        type="number"
                        name="reviewed_by"
                        value={
                          formData.reviewed_by
                        }
                        onChange={handleChange}
                        placeholder="Admin User ID"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />

                    </div>

                  </div>

                )}


                {/* REVIEWED AT */}

                {editingVerification && (

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reviewed At
                    </label>

                    <input
                      type="datetime-local"
                      name="reviewed_at"
                      value={
                        formData.reviewed_at
                          ? formData.reviewed_at.slice(
                              0,
                              16
                            )
                          : ""
                      }
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                )}

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition"
                >

                  {editingVerification
                    ? "Save Changes"
                    : "Create Verification"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}


export default UserVerifications;