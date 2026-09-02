import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
  getRoles,
  getPermissions,
  getRolePermissions,
  createRolePermission,
  deleteRolePermission,
} from "../../Services/api";


function RolePermissions() {

  const [roles, setRoles] = useState([]);

  const [permissions, setPermissions] = useState([]);

  const [rolePermissions, setRolePermissions] = useState([]);

  const [selectedRole, setSelectedRole] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");


  // =====================================================
  // LOAD DATA
  // =====================================================

  const loadData = async () => {

    try {

      setLoading(true);
      setError("");

      const [
        rolesData,
        permissionsData,
        rolePermissionsData,
      ] = await Promise.all([
        getRoles(),
        getPermissions(),
        getRolePermissions(),
      ]);

      setRoles(rolesData);
      setPermissions(permissionsData);
      setRolePermissions(rolePermissionsData);

      if (rolesData.length > 0) {
        setSelectedRole(rolesData[0]);
      }

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadData();

  }, []);


  // =====================================================
  // PERMISSIONS FOR SELECTED ROLE
  // =====================================================

  const assignedPermissionIds = useMemo(() => {

    if (!selectedRole) {
      return [];
    }

    return rolePermissions
      .filter(
        (item) =>
          item.role_id === selectedRole.id
      )
      .map(
        (item) =>
          item.permission_id
      );

  }, [
    rolePermissions,
    selectedRole,
  ]);


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredPermissions = useMemo(() => {

    const text = search.toLowerCase();

    return permissions.filter(
      (permission) =>

        permission.name
          ?.toLowerCase()
          .includes(text) ||

        permission.description
          ?.toLowerCase()
          .includes(text) ||

        permission.module
          ?.toLowerCase()
          .includes(text)

    );

  }, [
    permissions,
    search,
  ]);


  // =====================================================
  // CHECK PERMISSION
  // =====================================================

  const isAssigned = (permissionId) => {

    return assignedPermissionIds.includes(
      permissionId
    );

  };


  // =====================================================
  // FIND ROLE PERMISSION RECORD
  // =====================================================

  const findRolePermission = (
    permissionId
  ) => {

    return rolePermissions.find(
      (item) =>
        item.role_id === selectedRole?.id &&
        item.permission_id === permissionId
    );

  };


  // =====================================================
  // TOGGLE PERMISSION
  // =====================================================

  const handleToggle = async (
    permission
  ) => {

    if (!selectedRole) {
      return;
    }

    try {

      setSaving(true);
      setError("");

      const existing =
        findRolePermission(
          permission.id
        );


      // REMOVE
      if (existing) {

        await deleteRolePermission(
          existing.id
        );

      }

      // ADD
      else {

        await createRolePermission({
          role_id:
            selectedRole.id,

          permission_id:
            permission.id,
        });

      }


      const updated =
        await getRolePermissions();

      setRolePermissions(updated);

    } catch (err) {

      setError(err.message);

    } finally {

      setSaving(false);

    }

  };


  // =====================================================
  // ROLE STATS
  // =====================================================

  const rolePermissionCount =
    selectedRole
      ? assignedPermissionIds.length
      : 0;


  const totalPermissionCount =
    permissions.length;


  const percentage =
    totalPermissionCount > 0
      ? Math.round(
          (rolePermissionCount /
            totalPermissionCount) *
          100
        )
      : 0;


  // =====================================================
  // PERMISSION ICON
  // =====================================================

  const getPermissionIcon = (permissionName) => {

    const icons = {

      // PROPERTY
      view_property: "👁️",
      create_property: "➕",
      update_property: "✏️",
      delete_property: "🗑️",
      manage_properties: "🏠",
      view_properties: "🏠",

      // BOOKING
      view_booking: "👁️",
      create_booking: "📅",
      update_booking: "✏️",
      delete_booking: "🗑️",
      cancel_booking: "❌",
      manage_bookings: "📅",

      // USERS
      view_users: "👁️",
      create_user: "➕",
      update_user: "✏️",
      delete_user: "🗑️",
      manage_users: "👥",

      // PAYMENTS
      view_payments: "👁️",
      create_payment: "💰",
      update_payment: "✏️",
      delete_payment: "🗑️",
      refund_payment: "↩️",
      manage_payments: "💳",

      // ROLES
      view_roles: "👁️",
      create_role: "➕",
      update_role: "✏️",
      delete_role: "🗑️",
      manage_roles: "🛡️",

      // PERMISSIONS
      view_permissions: "👁️",
      create_permission: "➕",
      update_permission: "✏️",
      delete_permission: "🗑️",
      manage_permissions: "🔐",

      // REVIEWS
      view_reviews: "👁️",
      create_review: "⭐",
      update_review: "✏️",
      delete_review: "🗑️",
      manage_reviews: "⭐",

      // REPORTS
      view_reports: "👁️",
      create_report: "📊",
      manage_reports: "📊",

      // CATEGORIES
      view_categories: "👁️",
      create_category: "➕",
      update_category: "✏️",
      delete_category: "🗑️",
      manage_categories: "🗂️",

      // AMENITIES
      view_amenities: "👁️",
      create_amenity: "➕",
      update_amenity: "✏️",
      delete_amenity: "🗑️",
      manage_amenities: "🛋️",

      // NOTIFICATIONS
      view_notifications: "👁️",
      create_notification: "➕",
      update_notification: "✏️",
      delete_notification: "🗑️",
      manage_notifications: "🔔",

      // MESSAGES
      view_messages: "👁️",
      create_message: "➕",
      update_message: "✏️",
      delete_message: "🗑️",
      manage_messages: "💬",

      // SETTINGS
      view_settings: "👁️",
      create_setting: "➕",
      update_settings: "⚙️",
      delete_setting: "🗑️",
      manage_settings: "⚙️",

      // DISPUTES
      view_disputes: "👁️",
      create_dispute: "⚠️",
      update_dispute: "✏️",
      delete_dispute: "🗑️",
      manage_disputes: "⚖️",

      // WALLET
      view_wallet: "👁️",
      manage_wallet: "👛",

      // AUDIT
      view_audit_logs: "📋",
      manage_audit_logs: "🛡️",

    };

    return icons[permissionName] || "🔑";

  };


  // =====================================================
  // MODULE ICON
  // =====================================================

  const getModuleIcon = (module) => {

    const moduleName =
      module?.toLowerCase();

    if (
      moduleName?.includes("property")
    ) {
      return "🏠";
    }

    if (
      moduleName?.includes("booking")
    ) {
      return "📅";
    }

    if (
      moduleName?.includes("user")
    ) {
      return "👥";
    }

    if (
      moduleName?.includes("payment")
    ) {
      return "💳";
    }

    if (
      moduleName?.includes("role")
    ) {
      return "🛡️";
    }

    if (
      moduleName?.includes("permission")
    ) {
      return "🔐";
    }

    if (
      moduleName?.includes("review")
    ) {
      return "⭐";
    }

    if (
      moduleName?.includes("report")
    ) {
      return "📊";
    }

    if (
      moduleName?.includes("notification")
    ) {
      return "🔔";
    }

    if (
      moduleName?.includes("message")
    ) {
      return "💬";
    }

    if (
      moduleName?.includes("setting")
    ) {
      return "⚙️";
    }

    if (
      moduleName?.includes("category")
    ) {
      return "🗂️";
    }

    if (
      moduleName?.includes("amenit")
    ) {
      return "🛋️";
    }

    if (
      moduleName?.includes("dispute")
    ) {
      return "⚖️";
    }

    return "📦";

  };


  // =====================================================
  // MODULE STYLE
  // =====================================================

  const getModuleStyle = (module) => {

    const moduleName =
      module?.toLowerCase();

    if (
      moduleName?.includes("property")
    ) {
      return {
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
        headerBg: "bg-blue-50",
        headerBorder: "border-blue-100",
        titleText: "text-blue-800",
      };
    }

    if (
      moduleName?.includes("booking")
    ) {
      return {
        iconBg: "bg-purple-100",
        iconText: "text-purple-600",
        headerBg: "bg-purple-50",
        headerBorder: "border-purple-100",
        titleText: "text-purple-800",
      };
    }

    if (
      moduleName?.includes("user")
    ) {
      return {
        iconBg: "bg-emerald-100",
        iconText: "text-emerald-600",
        headerBg: "bg-emerald-50",
        headerBorder: "border-emerald-100",
        titleText: "text-emerald-800",
      };
    }

    if (
      moduleName?.includes("payment")
    ) {
      return {
        iconBg: "bg-orange-100",
        iconText: "text-orange-600",
        headerBg: "bg-orange-50",
        headerBorder: "border-orange-100",
        titleText: "text-orange-800",
      };
    }

    if (
      moduleName?.includes("review")
    ) {
      return {
        iconBg: "bg-yellow-100",
        iconText: "text-yellow-600",
        headerBg: "bg-yellow-50",
        headerBorder: "border-yellow-100",
        titleText: "text-yellow-800",
      };
    }

    if (
      moduleName?.includes("notification")
    ) {
      return {
        iconBg: "bg-pink-100",
        iconText: "text-pink-600",
        headerBg: "bg-pink-50",
        headerBorder: "border-pink-100",
        titleText: "text-pink-800",
      };
    }

    if (
      moduleName?.includes("setting")
    ) {
      return {
        iconBg: "bg-gray-200",
        iconText: "text-gray-600",
        headerBg: "bg-gray-100",
        headerBorder: "border-gray-200",
        titleText: "text-gray-800",
      };
    }

    return {
      iconBg: "bg-indigo-100",
      iconText: "text-indigo-600",
      headerBg: "bg-indigo-50",
      headerBorder: "border-indigo-100",
      titleText: "text-indigo-800",
    };

  };


  // =====================================================
  // MODULE GROUP
  // =====================================================

  const groupedPermissions = useMemo(() => {

    const groups = {};

    filteredPermissions.forEach(
      (permission) => {

        const module =
          permission.module ||
          "Other";

        if (!groups[module]) {
          groups[module] = [];
        }

        groups[module].push(
          permission
        );

      }
    );

    return groups;

  }, [filteredPermissions]);


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="min-h-screen bg-[#f7f7f7]">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">


          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="mb-8">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-2xl shadow-sm">
                🛡️
              </div>

              <div>

                <h1 className="text-3xl font-bold text-gray-900">
                  Role Permissions
                </h1>

                <p className="text-gray-500 mt-1">
                  Manage permissions assigned to each role
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
              {error}
            </div>

          )}


          {loading ? (

            <div className="bg-white rounded-2xl border border-gray-200 py-24 text-center">

              <div className="animate-spin w-9 h-9 border-4 border-gray-200 border-t-purple-500 rounded-full mx-auto mb-4" />

              <p className="text-gray-500">
                Loading access control...
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">


              {/* =================================================
                  LEFT - ROLES
              ================================================= */}

              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                <div className="p-5 border-b">

                  <h2 className="font-bold text-gray-900">
                    Roles
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Select a role to manage
                  </p>

                </div>


                <div className="p-3">

                  {roles.map((role) => {

                    const count =
                      rolePermissions.filter(
                        (item) =>
                          item.role_id ===
                          role.id
                      ).length;


                    const active =
                      selectedRole?.id ===
                      role.id;


                    return (

                      <button
                        key={role.id}
                        onClick={() =>
                          setSelectedRole(
                            role
                          )
                        }
                        className={`w-full text-left p-4 rounded-xl mb-2 transition ${
                          active
                            ? "bg-gray-900 text-white"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >

                        <div className="flex items-center justify-between">

                          <div>

                            <p className="font-semibold capitalize">
                              {role.name}
                            </p>

                            <p
                              className={`text-xs mt-1 ${
                                active
                                  ? "text-gray-300"
                                  : "text-gray-400"
                              }`}
                            >
                              {role.description ||
                                "No description"}
                            </p>

                          </div>


                          <span
                            className={`text-xs px-2.5 py-1 rounded-full ${
                              active
                                ? "bg-white/15 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {count}
                          </span>

                        </div>

                      </button>

                    );

                  })}

                </div>

              </div>


              {/* =================================================
                  RIGHT
              ================================================= */}

              <div className="space-y-6">


                {/* =================================================
                    ROLE HEADER CARD
                ================================================= */}

                {selectedRole && (

                  <div className="bg-white border border-gray-200 rounded-2xl p-6">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 text-purple-600 flex items-center justify-center text-2xl">
                          👤
                        </div>

                        <div>

                          <div className="flex items-center gap-3">

                            <h2 className="text-xl font-bold capitalize">
                              {selectedRole.name}
                            </h2>

                            <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                              {selectedRole.status}
                            </span>

                          </div>

                          <p className="text-sm text-gray-500 mt-1">
                            {selectedRole.description ||
                              "No description available"}
                          </p>

                        </div>

                      </div>


                      {/* STATS */}

                      <div className="flex items-center gap-6">

                        <div>

                          <p className="text-xs text-gray-400">
                            Assigned
                          </p>

                          <p className="text-2xl font-bold">
                            {rolePermissionCount}
                          </p>

                        </div>


                        <div>

                          <p className="text-xs text-gray-400">
                            Total
                          </p>

                          <p className="text-2xl font-bold">
                            {totalPermissionCount}
                          </p>

                        </div>


                        <div className="w-14 h-14 rounded-full border-4 border-purple-500 flex items-center justify-center text-xs font-bold">
                          {percentage}%
                        </div>

                      </div>

                    </div>

                  </div>

                )}


                {/* =================================================
                    PERMISSIONS
                ================================================= */}

                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">


                  {/* TOOLBAR */}

                  <div className="p-5 border-b">

                    <div className="flex flex-col md:flex-row gap-3">

                      <div className="relative flex-1">

                        <input
                          type="text"
                          value={search}
                          onChange={(e) =>
                            setSearch(
                              e.target.value
                            )
                          }
                          placeholder="Search permissions..."
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                        />

                      </div>


                      <div className="px-4 py-3 bg-purple-50 text-purple-700 rounded-xl text-sm font-semibold">
                        {rolePermissionCount} permissions assigned
                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      PERMISSION GROUPS
                  ================================================= */}

                  <div className="p-5 space-y-6">

                    {Object.keys(
                      groupedPermissions
                    ).length === 0 ? (

                      <div className="py-12 text-center text-gray-500">
                        No permissions found.
                      </div>

                    ) : (

                      Object.entries(
                        groupedPermissions
                      ).map(
                        ([
                          module,
                          modulePermissions,
                        ]) => {

                          const moduleStyle =
                            getModuleStyle(
                              module
                            );

                          const moduleIcon =
                            getModuleIcon(
                              module
                            );


                          return (

                            <div
                              key={module}
                              className="border border-gray-200 rounded-2xl overflow-hidden"
                            >


                              {/* =================================================
                                  HIGHLIGHTED MODULE HEADING
                              ================================================= */}

                              <div
                                className={`px-5 py-4 ${moduleStyle.headerBg} border-b ${moduleStyle.headerBorder}`}
                              >

                                <div className="flex items-center justify-between">

                                  <div className="flex items-center gap-3">

                                    <div
                                      className={`w-11 h-11 rounded-xl ${moduleStyle.iconBg} ${moduleStyle.iconText} flex items-center justify-center text-xl border border-white shadow-sm`}
                                    >
                                      {moduleIcon}
                                    </div>


                                    <div>

                                      <h3
                                        className={`text-base font-bold ${moduleStyle.titleText}`}
                                      >
                                        {module}
                                      </h3>

                                      <p className="text-xs text-gray-500 mt-0.5">
                                        {
                                          modulePermissions.length
                                        }{" "}
                                        permissions
                                      </p>

                                    </div>

                                  </div>


                                  {/* MODULE COUNT */}

                                  <div
                                    className={`px-3 py-1.5 rounded-full bg-white ${moduleStyle.titleText} text-xs font-bold border ${moduleStyle.headerBorder}`}
                                  >
                                    {modulePermissions.length}
                                  </div>

                                </div>

                              </div>


                              {/* =================================================
                                  PERMISSIONS
                              ================================================= */}

                              <div className="divide-y">

                                {modulePermissions.map(
                                  (
                                    permission
                                  ) => {

                                    const assigned =
                                      isAssigned(
                                        permission.id
                                      );


                                    return (

                                      <label
                                        key={
                                          permission.id
                                        }
                                        className={`flex items-center justify-between px-5 py-4 cursor-pointer transition ${
                                          assigned
                                            ? "bg-purple-50/50"
                                            : "hover:bg-gray-50"
                                        }`}
                                      >


                                        {/* PERMISSION INFO */}

                                        <div className="flex items-center gap-4">


                                          {/* DYNAMIC PERMISSION ICON */}

                                          <div
                                            className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg transition ${
                                              assigned
                                                ? "bg-purple-100 text-purple-600"
                                                : "bg-gray-100 text-gray-500"
                                            }`}
                                          >

                                            {getPermissionIcon(
                                              permission.name
                                            )}

                                          </div>


                                          <div>

                                            <p
                                              className={`font-semibold ${
                                                assigned
                                                  ? "text-purple-800"
                                                  : "text-gray-800"
                                              }`}
                                            >
                                              {
                                                permission.name
                                              }
                                            </p>

                                            <p className="text-sm text-gray-500 mt-0.5">
                                              {
                                                permission.description ||
                                                "No description"
                                              }
                                            </p>

                                          </div>

                                        </div>


                                        {/* TOGGLE */}

                                        <div className="relative">

                                          <input
                                            type="checkbox"
                                            checked={
                                              assigned
                                            }
                                            disabled={
                                              saving
                                            }
                                            onChange={() =>
                                              handleToggle(
                                                permission
                                              )
                                            }
                                            className="sr-only peer"
                                          />


                                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 transition">
                                          </div>


                                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition peer-checked:translate-x-5">
                                          </div>

                                        </div>

                                      </label>

                                    );

                                  }
                                )}

                              </div>

                            </div>

                          );

                        }
                      )

                    )}

                  </div>

                </div>

              </div>

            </div>

          )}

        </main>

      </div>

    </div>

  );

}


export default RolePermissions;