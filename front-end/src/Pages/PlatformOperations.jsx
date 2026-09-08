import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";

import CustomerNavbar from "../components/customer/CustomerNavbar";
import {
  getBookingGuests,
  createBookingGuest,
  updateBookingGuest,
  deleteBookingGuest,
} from "../api/bookingGuestsApi";
import {
  getBookingReceipts,
  createBookingReceipt,
  updateBookingReceipt,
  deleteBookingReceipt,
} from "../api/bookingReceiptsApi";
import {
  getBookingRules,
  createBookingRule,
  updateBookingRule,
  deleteBookingRule,
} from "../api/bookingRulesApi";
import {
  getBookingStatusHistory,
  createBookingStatusHistory,
  updateBookingStatusHistory,
  deleteBookingStatusHistory,
} from "../api/bookingStatusHistoryApi";
import {
  getCancellationPolicies,
  createCancellationPolicy,
  updateCancellationPolicy,
  deleteCancellationPolicy,
} from "../api/cancellationPoliciesApi";
import {
  getDiscountOffers,
  createDiscountOffer,
  updateDiscountOffer,
  deleteDiscountOffer,
} from "../api/discountOffersApi";
import {
  getDynamicPricingRules,
  createDynamicPricingRule,
  updateDynamicPricingRule,
  deleteDynamicPricingRule,
} from "../api/dynamicPricingRulesApi";
import {
  getListingFees,
  createListingFee,
  updateListingFee,
  deleteListingFee,
} from "../api/listingFeesApi";
import {
  getListingStatusHistory,
  createListingStatusHistory,
  updateListingStatusHistory,
  deleteListingStatusHistory,
} from "../api/listingStatusHistoryApi";
import {
  getPropertyCalendarSyncs,
  createPropertyCalendarSync,
  updatePropertyCalendarSync,
  deletePropertyCalendarSync,
} from "../api/propertyCalendarSyncApi";
import {
  getUserVerifications,
  createUserVerification,
  updateUserVerification,
  deleteUserVerification,
} from "../api/userVerificationsApi";
import {
  getRolePermissions,
  createRolePermission,
  updateRolePermission,
  deleteRolePermission,
} from "../api/rolePermissionsApi";
import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../api/subscriptionsApi";

const resourceDefinitions = {
  bookingGuests: {
    label: "Booking guests",
    list: getBookingGuests,
    create: createBookingGuest,
    update: updateBookingGuest,
    remove: deleteBookingGuest,
  },
  bookingReceipts: {
    label: "Booking receipts",
    list: getBookingReceipts,
    create: createBookingReceipt,
    update: updateBookingReceipt,
    remove: deleteBookingReceipt,
  },
  bookingRules: {
    label: "Booking rules",
    list: getBookingRules,
    create: createBookingRule,
    update: updateBookingRule,
    remove: deleteBookingRule,
  },
  bookingStatusHistory: {
    label: "Booking status history",
    list: getBookingStatusHistory,
    create: createBookingStatusHistory,
    update: updateBookingStatusHistory,
    remove: deleteBookingStatusHistory,
  },
  cancellationPolicies: {
    label: "Cancellation policies",
    list: getCancellationPolicies,
    create: createCancellationPolicy,
    update: updateCancellationPolicy,
    remove: deleteCancellationPolicy,
  },
  discountOffers: {
    label: "Discount offers",
    list: getDiscountOffers,
    create: createDiscountOffer,
    update: updateDiscountOffer,
    remove: deleteDiscountOffer,
  },
  dynamicPricingRules: {
    label: "Dynamic pricing rules",
    list: getDynamicPricingRules,
    create: createDynamicPricingRule,
    update: updateDynamicPricingRule,
    remove: deleteDynamicPricingRule,
  },
  listingFees: {
    label: "Listing fees",
    list: getListingFees,
    create: createListingFee,
    update: updateListingFee,
    remove: deleteListingFee,
  },
  listingStatusHistory: {
    label: "Listing status history",
    list: getListingStatusHistory,
    create: createListingStatusHistory,
    update: updateListingStatusHistory,
    remove: deleteListingStatusHistory,
  },
  propertyCalendarSync: {
    label: "Property calendar sync",
    list: getPropertyCalendarSyncs,
    create: createPropertyCalendarSync,
    update: updatePropertyCalendarSync,
    remove: deletePropertyCalendarSync,
  },
  userVerifications: {
    label: "User verifications",
    list: getUserVerifications,
    create: createUserVerification,
    update: updateUserVerification,
    remove: deleteUserVerification,
  },
  rolePermissions: {
    label: "Role permissions",
    list: getRolePermissions,
    create: createRolePermission,
    update: updateRolePermission,
    remove: deleteRolePermission,
  },
  subscriptions: {
    label: "Subscriptions",
    list: getSubscriptions,
    create: createSubscription,
    update: updateSubscription,
    remove: deleteSubscription,
  },
};

const getRows = (response) => {
  if (Array.isArray(response)) return response;
  return response?.data || response?.items || response?.results || [];
};

function PlatformOperations() {
  const [resourceKey, setResourceKey] = useState("bookingGuests");
  const [rows, setRows] = useState([]);
  const [payload, setPayload] = useState("{}\n");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const resource = resourceDefinitions[resourceKey];

  const loadRows = async () => {
    try {
      setLoading(true);
      setError("");
      setRows(getRows(await resource.list()));
    } catch (requestError) {
      setError(requestError.message);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEditingId(null);
    setPayload("{}\n");
    loadRows();
  }, [resourceKey]);

  const columns = useMemo(() => {
    const keys = new Set();
    rows.slice(0, 8).forEach((row) => Object.keys(row || {}).forEach((key) => keys.add(key)));
    return Array.from(keys).filter((key) => key !== "created_at").slice(0, 5);
  }, [rows]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = JSON.parse(payload);
      setSaving(true);
      setError("");
      if (editingId === null) {
        await resource.create(data);
      } else {
        await resource.update(editingId, data);
      }
      setEditingId(null);
      setPayload("{}\n");
      await loadRows();
    } catch (requestError) {
      setError(requestError instanceof SyntaxError ? "Payload must be valid JSON." : requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setPayload(`${JSON.stringify(row, null, 2)}\n`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${resource.label.toLowerCase()} record?`)) return;
    try {
      setError("");
      await resource.remove(id);
      await loadRows();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#123d78]">Admin operations</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Platform data management</h1>
            <p className="mt-2 text-sm text-gray-500">Manage supporting booking, listing, pricing and account records through their APIs.</p>
          </div>
          <button type="button" onClick={loadRows} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Resources</p>
            <div className="space-y-1">
              {Object.entries(resourceDefinitions).map(([key, definition]) => (
                <button key={key} type="button" onClick={() => setResourceKey(key)} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${key === resourceKey ? "bg-[#123d78] text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                  {definition.label}
                </button>
              ))}
            </div>
          </aside>

          <section className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-col justify-between gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{resource.label}</h2>
                <p className="mt-1 text-xs text-gray-500">{rows.length} records loaded from the API</p>
              </div>
              <button type="button" onClick={() => { setEditingId(null); setPayload("{}\n"); }} className="inline-flex items-center gap-2 rounded-xl bg-[#123d78] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0d315f]"><Plus size={16} /> New record</button>
            </div>

            {error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-gray-800">{editingId === null ? "Create record" : `Edit record #${editingId}`}</p>
                <span className="text-xs text-gray-500">JSON payload</span>
              </div>
              <textarea value={payload} onChange={(event) => setPayload(event.target.value)} className="mt-3 min-h-32 w-full rounded-lg border border-gray-200 bg-white p-3 font-mono text-xs text-gray-800 outline-none focus:border-[#123d78]" />
              <button disabled={saving} type="submit" className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{saving ? "Saving..." : editingId === null ? "Create" : "Update"}</button>
            </form>

            {loading ? <p className="py-10 text-center text-sm text-gray-500">Loading records...</p> : rows.length === 0 ? <p className="py-10 text-center text-sm text-gray-500">No records found.</p> : (
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead><tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400"><th className="px-3 py-3">ID</th>{columns.map((column) => <th key={column} className="px-3 py-3">{column.replaceAll("_", " ")}</th>)}<th className="px-3 py-3">Actions</th></tr></thead>
                  <tbody>{rows.map((row) => <tr key={row.id} className="border-b border-gray-50 text-gray-700"><td className="px-3 py-3 font-semibold">{row.id}</td>{columns.map((column) => <td key={column} className="max-w-48 truncate px-3 py-3">{typeof row[column] === "object" ? JSON.stringify(row[column]) : String(row[column] ?? "-")}</td>)}<td className="px-3 py-3"><div className="flex items-center gap-2"><button type="button" aria-label="Edit record" onClick={() => handleEdit(row)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#123d78]"><Pencil size={16} /></button><button type="button" aria-label="Delete record" onClick={() => handleDelete(row.id)} className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button></div></td></tr>)}</tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default PlatformOperations;
