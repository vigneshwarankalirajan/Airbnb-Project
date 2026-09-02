import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";


const API_URL = "http://127.0.0.1:8000/property-images/";

function PropertyImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  const [formData, setFormData] = useState({
    property_id: "",
    image_url: "",
    media_type: "",
    display_order: 0,
  });

  // GET - Property Images
  const fetchImages = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch property images");
      }

      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch property images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open Add Modal
  const handleAdd = () => {
    setEditingImage(null);

    setFormData({
      property_id: "",
      image_url: "",
      media_type: "",
      display_order: 0,
    });

    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleEdit = (image) => {
    setEditingImage(image);

    setFormData({
      property_id: image.property_id,
      image_url: image.image_url,
      media_type: image.media_type,
      display_order: image.display_order,
    });

    setIsModalOpen(true);
  };

  // POST / PUT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      property_id: Number(formData.property_id),
      image_url: formData.image_url,
      media_type: formData.media_type,
      display_order: Number(formData.display_order),
    };

    try {
      const url = editingImage
        ? `${API_URL}${editingImage.id}`
        : API_URL;

      const method = editingImage ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save property image");
      }

      await response.json();

      setIsModalOpen(false);
      fetchImages();

      alert(
        editingImage
          ? "Property image updated successfully"
          : "Property image created successfully"
      );
    } catch (error) {
      console.error(error);
      alert("Failed to save property image");
    }
  };

  // DELETE
  const handleDelete = async (image) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete image ID ${image.id}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}${image.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete property image");
      }

      fetchImages();

      alert("Property image deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete property image");
    }
  };

  // View
  const handleView = async (image) => {
    try {
      const response = await fetch(`${API_URL}${image.id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const data = await response.json();

      alert(
        `Image ID: ${data.id}\n` +
          `Property ID: ${data.property_id}\n` +
          `Media Type: ${data.media_type}\n` +
          `Display Order: ${data.display_order}\n` +
          `Image URL: ${data.image_url}`
      );
    } catch (error) {
      console.error(error);
      alert("Failed to fetch property image");
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "property_id",
      label: "Property ID",
    },
    {
      key: "image_url",
      label: "Image",
    },
    {
      key: "media_type",
      label: "Media Type",
    },
    {
      key: "display_order",
      label: "Display Order",
    },
    {
      key: "created_at",
      label: "Created At",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Property Images
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage property images
              </p>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600"
            >
              + Add Property Image
            </button>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="rounded-lg border bg-white p-10 text-center text-gray-500">
              Loading property images...
            </div>
          ) : (
           <DataTable
           columns={columns}
          data={images}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          />
          )}

        </main>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingImage
            ? "Edit Property Image"
            : "Add Property Image"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Property ID */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Property ID
            </label>

            <input
              type="number"
              name="property_id"
              value={formData.property_id}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
              placeholder="Enter property ID"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Image URL
            </label>

            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Media Type */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Media Type
            </label>

            <select
              name="media_type"
              value={formData.media_type}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
            >
              <option value="">Select media type</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {/* Display Order */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Display Order
            </label>

            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              {editingImage ? "Update" : "Create"}
            </button>

          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PropertyImages;