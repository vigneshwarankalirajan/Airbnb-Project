import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
  getPreferences,
  createPreference,
  updatePreference,
  deletePreference,
} from "../../Services/api";


function UserPreferences() {

  const [preferences, setPreferences] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingPreference, setEditingPreference] =
    useState(null);

  const [search, setSearch] = useState("");

  const [themeFilter, setThemeFilter] =
    useState("all");

  const [formData, setFormData] = useState({
    user_id: "",
    language: "English",
    currency: "INR",
    theme: "light",
    email_notifications: true,
    sms_notifications: true,
    push_notifications: true,
  });


  // =====================================================
  // GET ALL PREFERENCES
  // =====================================================

  const fetchPreferences = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getPreferences();

      setPreferences(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchPreferences();

  }, []);


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };


  // =====================================================
  // ADD
  // =====================================================

  const handleAdd = () => {

    setEditingPreference(null);

    setFormData({
      user_id: "",
      language: "English",
      currency: "INR",
      theme: "light",
      email_notifications: true,
      sms_notifications: true,
      push_notifications: true,
    });

    setShowModal(true);

  };


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (preference) => {

    setEditingPreference(preference);

    setFormData({
      user_id: preference.user_id,

      language:
        preference.language || "English",

      currency:
        preference.currency || "INR",

      theme:
        preference.theme || "light",

      email_notifications:
        preference.email_notifications ?? true,

      sms_notifications:
        preference.sms_notifications ?? true,

      push_notifications:
        preference.push_notifications ?? true,
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

      if (editingPreference) {

        const updateData = {

          language:
            formData.language,

          currency:
            formData.currency,

          theme:
            formData.theme,

          email_notifications:
            formData.email_notifications,

          sms_notifications:
            formData.sms_notifications,

          push_notifications:
            formData.push_notifications,

        };

        await updatePreference(
          editingPreference.id,
          updateData
        );

      } else {

        const createData = {

          user_id:
            Number(formData.user_id),

          language:
            formData.language,

          currency:
            formData.currency,

          theme:
            formData.theme,

          email_notifications:
            formData.email_notifications,

          sms_notifications:
            formData.sms_notifications,

          push_notifications:
            formData.push_notifications,

        };

        await createPreference(createData);

      }

      setShowModal(false);

      setEditingPreference(null);

      await fetchPreferences();

    } catch (err) {

      setError(err.message);

    }

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (preferenceId) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this user preference?"
      );

    if (!confirmed) {
      return;
    }

    try {

      setError("");

      await deletePreference(
        preferenceId
      );

      await fetchPreferences();

    } catch (err) {

      setError(err.message);

    }

  };


  // =====================================================
  // LANGUAGE ICON
  // =====================================================

  const getLanguageIcon = (language) => {

    switch (language?.toLowerCase()) {

      case "english":
        return "🇬🇧";

      case "tamil":
        return "🇮🇳";

      case "hindi":
        return "🇮🇳";

      case "malayalam":
        return "🇮🇳";

      case "telugu":
        return "🇮🇳";

      default:
        return "🌐";

    }

  };


  // =====================================================
  // CURRENCY ICON
  // =====================================================

  const getCurrencyIcon = (currency) => {

    switch (currency) {

      case "INR":
        return "₹";

      case "USD":
        return "$";

      case "EUR":
        return "€";

      case "GBP":
        return "£";

      default:
        return "¤";

    }

  };


  // =====================================================
  // THEME CONFIG
  // =====================================================

  const getThemeConfig = (theme) => {

    switch (theme?.toLowerCase()) {

      case "dark":

        return {
          icon: "🌙",
          label: "Dark",
          className:
            "bg-slate-100 text-slate-700 border-slate-200",
        };

      case "system":

        return {
          icon: "💻",
          label: "System",
          className:
            "bg-purple-50 text-purple-700 border-purple-200",
        };

      default:

        return {
          icon: "☀️",
          label: "Light",
          className:
            "bg-amber-50 text-amber-700 border-amber-200",
        };

    }

  };


  // =====================================================
  // NOTIFICATION BADGE
  // =====================================================

  const NotificationBadge = ({
    enabled,
    icon,
    label,
  }) => {

    return (

      <span
        title={label}
        className={
          enabled
            ? "inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100"
            : "inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 text-gray-400 border border-gray-200"
        }
      >

        {icon}

      </span>

    );

  };


  // =====================================================
  // FILTER
  // =====================================================

  const filteredPreferences = useMemo(() => {

    const searchText =
      search.toLowerCase().trim();

    return preferences.filter(
      (preference) => {

        const matchesSearch =

          String(
            preference.id
          )
            .toLowerCase()
            .includes(searchText) ||

          String(
            preference.user_id
          )
            .toLowerCase()
            .includes(searchText) ||

          preference.language
            ?.toLowerCase()
            .includes(searchText) ||

          preference.currency
            ?.toLowerCase()
            .includes(searchText);


        const matchesTheme =
          themeFilter === "all" ||
          preference.theme?.toLowerCase() ===
            themeFilter;


        return (
          matchesSearch &&
          matchesTheme
        );

      }
    );

  }, [
    preferences,
    search,
    themeFilter,
  ]);


  // =====================================================
  // STATISTICS
  // =====================================================

  const totalPreferences =
    preferences.length;

  const lightThemeCount =
    preferences.filter(
      (item) =>
        item.theme?.toLowerCase() ===
        "light"
    ).length;

  const darkThemeCount =
    preferences.filter(
      (item) =>
        item.theme?.toLowerCase() ===
        "dark"
    ).length;

  const notificationEnabledCount =
    preferences.filter(
      (item) =>
        item.email_notifications ||
        item.sms_notifications ||
        item.push_notifications
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

              <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-2xl shadow-sm">
                ⚙️
              </div>

              <div>

                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  User Preferences
                </h1>

                <p className="text-gray-500 mt-1">
                  Manage language, currency, theme and notification settings
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

              Add Preference

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
                    Total Preferences
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {totalPreferences}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                  ⚙️
                </div>

              </div>

            </div>


            {/* LIGHT */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Light Theme
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {lightThemeCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                  ☀️
                </div>

              </div>

            </div>


            {/* DARK */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Dark Theme
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {darkThemeCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl">
                  🌙
                </div>

              </div>

            </div>


            {/* NOTIFICATIONS */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Notifications Enabled
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {notificationEnabledCount}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                  🔔
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
                    placeholder="Search by user ID, language or currency..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition"
                  />

                </div>


                {/* THEME FILTER */}

                <select
                  value={themeFilter}
                  onChange={(e) =>
                    setThemeFilter(
                      e.target.value
                    )
                  }
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-purple-300"
                >

                  <option value="all">
                    All Themes
                  </option>

                  <option value="light">
                    ☀️ Light
                  </option>

                  <option value="dark">
                    🌙 Dark
                  </option>

                  <option value="system">
                    💻 System
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
                  Loading user preferences...
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">


                  {/* HEADER */}

                  <thead>

                    <tr className="bg-gray-50/80 border-b border-gray-100">

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Preference
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        User
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Language
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Currency
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Theme
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        Notifications
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  {/* BODY */}

                  <tbody>

                    {filteredPreferences.length === 0 ? (

                      <tr>

                        <td
                          colSpan="7"
                          className="py-16 text-center"
                        >

                          <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center text-2xl mb-4">
                            ⚙️
                          </div>

                          <h3 className="font-semibold text-gray-800">
                            No user preferences found
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Try changing your search or theme filter.
                          </p>

                        </td>

                      </tr>

                    ) : (

                      filteredPreferences.map(
                        (preference) => {

                          const theme =
                            getThemeConfig(
                              preference.theme
                            );


                          return (

                            <tr
                              key={preference.id}
                              className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70 transition"
                            >


                              {/* PREFERENCE */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-3">

                                  <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-lg">
                                    ⚙️
                                  </div>

                                  <div>

                                    <p className="font-semibold text-gray-900">
                                      Preference #{preference.id}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-0.5">
                                      User settings
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
                                    #{preference.user_id}
                                  </span>

                                </div>

                              </td>


                              {/* LANGUAGE */}

                              <td className="px-6 py-5">

                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold">

                                  <span>
                                    {getLanguageIcon(
                                      preference.language
                                    )}
                                  </span>

                                  {preference.language}

                                </span>

                              </td>


                              {/* CURRENCY */}

                              <td className="px-6 py-5">

                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold">

                                  <span className="font-bold">
                                    {getCurrencyIcon(
                                      preference.currency
                                    )}
                                  </span>

                                  {preference.currency}

                                </span>

                              </td>


                              {/* THEME */}

                              <td className="px-6 py-5">

                                <span
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${theme.className}`}
                                >

                                  {theme.icon}

                                  {theme.label}

                                </span>

                              </td>


                              {/* NOTIFICATIONS */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-2">

                                  <NotificationBadge
                                    enabled={
                                      preference.email_notifications
                                    }
                                    icon="✉️"
                                    label="Email Notifications"
                                  />

                                  <NotificationBadge
                                    enabled={
                                      preference.sms_notifications
                                    }
                                    icon="💬"
                                    label="SMS Notifications"
                                  />

                                  <NotificationBadge
                                    enabled={
                                      preference.push_notifications
                                    }
                                    icon="🔔"
                                    label="Push Notifications"
                                  />

                                </div>

                              </td>


                              {/* ACTIONS */}

                              <td className="px-6 py-5">

                                <div className="flex justify-end gap-2">


                                  {/* EDIT */}

                                  <button
                                    onClick={() =>
                                      handleEdit(
                                        preference
                                      )
                                    }
                                    title="Edit Preference"
                                    className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition flex items-center justify-center"
                                  >
                                    ✏️
                                  </button>


                                  {/* DELETE */}

                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        preference.id
                                      )
                                    }
                                    title="Delete Preference"
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
              filteredPreferences.length > 0 && (

                <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                  <p className="text-sm text-gray-500">

                    Showing{" "}

                    <span className="font-semibold text-gray-700">
                      {filteredPreferences.length}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-gray-700">
                      {preferences.length}
                    </span>

                    {" "}preferences

                  </p>

                  <p className="text-xs text-gray-400">
                    User Preference Management
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


            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/70">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                    {editingPreference
                      ? "✏️"
                      : "⚙️"}
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">

                      {editingPreference
                        ? "Update User Preference"
                        : "Create User Preference"}

                    </h2>

                    <p className="text-sm text-gray-500 mt-0.5">
                      Configure language, currency, theme and notifications
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


            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                {/* USER ID */}

                {!editingPreference && (

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
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                        required
                      />

                    </div>

                  </div>

                )}


                {/* LANGUAGE */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Language
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                      {getLanguageIcon(
                        formData.language
                      )}
                    </span>

                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                    >

                      <option value="English">
                        🇬🇧 English
                      </option>

                      <option value="Tamil">
                        🇮🇳 Tamil
                      </option>

                      <option value="Hindi">
                        🇮🇳 Hindi
                      </option>

                      <option value="Malayalam">
                        🇮🇳 Malayalam
                      </option>

                      <option value="Telugu">
                        🇮🇳 Telugu
                      </option>

                    </select>

                  </div>

                </div>


                {/* CURRENCY */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Currency
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold">
                      {getCurrencyIcon(
                        formData.currency
                      )}
                    </span>

                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                    >

                      <option value="INR">
                        ₹ INR - Indian Rupee
                      </option>

                      <option value="USD">
                        $ USD - US Dollar
                      </option>

                      <option value="EUR">
                        € EUR - Euro
                      </option>

                      <option value="GBP">
                        £ GBP - British Pound
                      </option>

                    </select>

                  </div>

                </div>


                {/* THEME */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Theme
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                      {getThemeConfig(
                        formData.theme
                      ).icon}
                    </span>

                    <select
                      name="theme"
                      value={formData.theme}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                    >

                      <option value="light">
                        ☀️ Light
                      </option>

                      <option value="dark">
                        🌙 Dark
                      </option>

                      <option value="system">
                        💻 System
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* =================================================
                  NOTIFICATIONS
              ================================================= */}

              <div className="mt-6">

                <div className="flex items-center gap-3 mb-4">

                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    🔔
                  </div>

                  <div>

                    <h3 className="font-bold text-gray-900">
                      Notification Preferences
                    </h3>

                    <p className="text-xs text-gray-500">
                      Choose how the user receives notifications
                    </p>

                  </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">


                  {/* EMAIL */}

                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                      formData.email_notifications
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                        ✉️
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-gray-800">
                          Email
                        </p>

                        <p className="text-xs text-gray-500">
                          Email alerts
                        </p>

                      </div>

                    </div>


                    <input
                      type="checkbox"
                      name="email_notifications"
                      checked={
                        formData.email_notifications
                      }
                      onChange={handleChange}
                      className="w-5 h-5 accent-emerald-600"
                    />

                  </label>


                  {/* SMS */}

                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                      formData.sms_notifications
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                        💬
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-gray-800">
                          SMS
                        </p>

                        <p className="text-xs text-gray-500">
                          Text alerts
                        </p>

                      </div>

                    </div>


                    <input
                      type="checkbox"
                      name="sms_notifications"
                      checked={
                        formData.sms_notifications
                      }
                      onChange={handleChange}
                      className="w-5 h-5 accent-emerald-600"
                    />

                  </label>


                  {/* PUSH */}

                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                      formData.push_notifications
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                        🔔
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-gray-800">
                          Push
                        </p>

                        <p className="text-xs text-gray-500">
                          App alerts
                        </p>

                      </div>

                    </div>


                    <input
                      type="checkbox"
                      name="push_notifications"
                      checked={
                        formData.push_notifications
                      }
                      onChange={handleChange}
                      className="w-5 h-5 accent-emerald-600"
                    />

                  </label>

                </div>

              </div>


              {/* =================================================
                  BUTTONS
              ================================================= */}

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

                  {editingPreference
                    ? "Save Changes"
                    : "Create Preference"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}


export default UserPreferences;