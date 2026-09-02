import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";

const API_URL = "http://127.0.0.1:8000";

const emptyForm = {
  host_id: "",
  category_id: "",
  title: "",
  description: "",
  property_type: "",
  address: "",
  city: "",
  state: "",
  country: "",
  max_guests: "",
  bedrooms: "",
  bathrooms: "",
  status: "draft",
};

function Properties() {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add/Edit modal
  const [formModalOpen, setFormModalOpen] = useState(false);

  // View modal
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [editingProperty, setEditingProperty] = useState(null);
  const [viewingProperty, setViewingProperty] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  // --------------------------------
  // GET ALL PROPERTIES
  // --------------------------------
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/properties/`);

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();

      setProperties(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // LOAD DATA
  // --------------------------------
  useEffect(() => {
    fetchProperties();
  }, []);

  // --------------------------------
  // INPUT CHANGE
  // --------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------
  // OPEN ADD MODAL
  // --------------------------------
  const handleAdd = () => {
    setEditingProperty(null);
    setFormData(emptyForm);
    setFormModalOpen(true);
  };

  // --------------------------------
  // OPEN EDIT MODAL
  // --------------------------------
  const handleEdit = (property) => {
    setEditingProperty(property);

    setFormData({
      host_id: property.host_id ?? "",
      category_id: property.category_id ?? "",
      title: property.title ?? "",
      description: property.description ?? "",
      property_type: property.property_type ?? "",
      address: property.address ?? "",
      city: property.city ?? "",
      state: property.state ?? "",
      country: property.country ?? "",
      max_guests: property.max_guests ?? "",
      bedrooms: property.bedrooms ?? "",
      bathrooms: property.bathrooms ?? "",
      status: property.status ?? "draft",
    });

    setFormModalOpen(true);
  };

  // --------------------------------
  // VIEW PROPERTY
  // --------------------------------
  const handleView = async (property) => {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/properties/${property.id}`
      );

      if (!response.ok) {
        throw new Error("Property not found");
      }

      const data = await response.json();

      setViewingProperty(data);
      setViewModalOpen(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch property");
    }
  };

  // --------------------------------
  // CREATE / UPDATE
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        host_id: Number(formData.host_id),
        category_id: Number(formData.category_id),
        title: formData.title,
        description: formData.description,
        property_type: formData.property_type,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        max_guests: Number(formData.max_guests),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        status: formData.status,
      };

      let response;

      // UPDATE
      if (editingProperty) {
        response = await fetch(
          `${API_URL}/properties/${editingProperty.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      } 
      // CREATE
      else {
        response = await fetch(`${API_URL}/properties/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Failed to save property"
        );
      }

      setFormModalOpen(false);
      setEditingProperty(null);
      setFormData(emptyForm);

      await fetchProperties();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // DELETE
  // --------------------------------
  const handleDelete = async (property) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${property.title}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/properties/${property.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Failed to delete property"
        );
      }

      await fetchProperties();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete property");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // TABLE COLUMNS
  // --------------------------------
  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "property_type",
      label: "Property Type",
    },
    {
      key: "city",
      label: "City",
    },
    {
      key: "max_guests",
      label: "Guests",
    },
    {
      key: "bedrooms",
      label: "Bedrooms",
    },
    {
      key: "bathrooms",
      label: "Bathrooms",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6">

          {/* PAGE HEADER */}
          <div className="mb-6 flex items-center justify-between">

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Properties
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage all property listings
              </p>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600"
            >
              + Add Property
            </button>

          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <span>{error}</span>

              <button
                type="button"
                onClick={() => setError("")}
                className="font-bold"
              >
                ×
              </button>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="mb-4 text-sm text-gray-500">
              Loading...
            </div>
          )}

          {/* TABLE */}
          <DataTable
            columns={columns}
            data={properties}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* VIEW BUTTON AREA */}
          {properties.length > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              Click Edit or Delete from the Actions column.
            </div>
          )}

        </main>

      </div>

      {/* =====================================
          ADD / EDIT MODAL
      ===================================== */}
      <Modal
        isOpen={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingProperty(null);
        }}
        title={editingProperty ? "Edit Property" : "Add Property"}
      >

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Host ID */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Host ID
              </label>

              <input
                type="number"
                name="host_id"
                value={formData.host_id}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* Category ID */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category ID
              </label>

              <input
                type="number"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* Title */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Modern Chennai Apartment"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Beautiful apartment near Porur"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Property Type
              </label>

              <input
                type="text"
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                placeholder="Apartment"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Porur"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Chennai"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* State */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Tamil Nadu"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* Country */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="India"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Max Guests
              </label>

              <input
                type="number"
                name="max_guests"
                value={formData.max_guests}
                onChange={handleChange}
                min="1"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Bedrooms
              </label>

              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Bathrooms
              </label>

              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex justify-end gap-3">

            <button
              type="button"
              onClick={() => {
                setFormModalOpen(false);
                setEditingProperty(null);
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingProperty
                ? "Update Property"
                : "Create Property"}
            </button>

          </div>

        </form>

      </Modal>

      {/* =====================================
          VIEW PROPERTY MODAL
      ===================================== */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setViewingProperty(null);
        }}
        title="Property Details"
      >

        {viewingProperty && (
          <div className="space-y-4">

            <div className="grid grid-cols-2 gap-4">

              <Detail label="ID" value={viewingProperty.id} />

              <Detail
                label="Host ID"
                value={viewingProperty.host_id}
              />

              <Detail
                label="Category ID"
                value={viewingProperty.category_id}
              />

              <Detail
                label="Property Type"
                value={viewingProperty.property_type}
              />

              <Detail
                label="Title"
                value={viewingProperty.title}
              />

              <Detail
                label="City"
                value={viewingProperty.city}
              />

              <Detail
                label="State"
                value={viewingProperty.state}
              />

              <Detail
                label="Country"
                value={viewingProperty.country}
              />

              <Detail
                label="Address"
                value={viewingProperty.address}
              />

              <Detail
                label="Max Guests"
                value={viewingProperty.max_guests}
              />

              <Detail
                label="Bedrooms"
                value={viewingProperty.bedrooms}
              />

              <Detail
                label="Bathrooms"
                value={viewingProperty.bathrooms}
              />

              <Detail
                label="Status"
                value={viewingProperty.status}
              />

            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-gray-500">
                Description
              </p>

              <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                {viewingProperty.description || "-"}
              </p>
            </div>

          </div>
        )}

      </Modal>

    </div>
  );
}

// --------------------------------
// DETAIL COMPONENT
// --------------------------------
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-800">
        {value ?? "-"}
      </p>
    </div>
  );
}

export default Properties;