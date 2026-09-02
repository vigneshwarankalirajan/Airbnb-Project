import { useEffect, useState } from "react";
import {
  getBookings,
  createBooking,
  deleteBooking,
} from "../api/bookingApi";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    guest_id: "",
    host_id: "",
    property_id: "",
    check_in: "",
    check_out: "",
    guest_count: "",
    booking_status: "pending",
    total_amount: "",
    currency: "INR",
    booking_method: "online",
    special_request: "",
  });

  // GET
  const loadBookings = async () => {
    try {
      setLoading(true);

      const response = await getBookings();

      setBookings(response.data);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        guest_id: Number(form.guest_id),
        host_id: Number(form.host_id),
        property_id: Number(form.property_id),
        check_in: form.check_in,
        check_out: form.check_out,
        guest_count: Number(form.guest_count),
        booking_status: form.booking_status,
        total_amount: Number(form.total_amount),
        currency: form.currency,
        booking_method: form.booking_method,
        special_request: form.special_request || null,
      };

      await createBooking(data);

      alert("Booking created successfully");

      setForm({
        guest_id: "",
        host_id: "",
        property_id: "",
        check_in: "",
        check_out: "",
        guest_count: "",
        booking_status: "pending",
        total_amount: "",
        currency: "INR",
        booking_method: "online",
        special_request: "",
      });

      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to create booking");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);

      alert("Booking deleted successfully");

      loadBookings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Bookings
      </h1>

      {/* CREATE FORM */}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 max-w-3xl"
      >

        <input
          name="guest_id"
          type="number"
          placeholder="Guest ID"
          value={form.guest_id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="host_id"
          type="number"
          placeholder="Host ID"
          value={form.host_id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="property_id"
          type="number"
          placeholder="Property ID"
          value={form.property_id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="check_in"
          type="date"
          value={form.check_in}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="check_out"
          type="date"
          value={form.check_out}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="guest_count"
          type="number"
          placeholder="Guest Count"
          value={form.guest_count}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="total_amount"
          type="number"
          placeholder="Total Amount"
          value={form.total_amount}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="currency"
          placeholder="Currency"
          value={form.currency}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="booking_status"
          value={form.booking_status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          name="booking_method"
          value={form.booking_method}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="online">Online</option>
          <option value="phone">Phone</option>
          <option value="admin">Admin</option>
        </select>

        <textarea
          name="special_request"
          placeholder="Special Request"
          value={form.special_request}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded col-span-2"
        >
          Create Booking
        </button>

      </form>

      {/* BOOKING LIST */}

      <div className="mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Booking List
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">

            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border p-4 rounded"
              >
                <p>
                  <strong>ID:</strong> {booking.id}
                </p>

                <p>
                  <strong>Property:</strong>{" "}
                  {booking.property_id}
                </p>

                <p>
                  <strong>Check In:</strong>{" "}
                  {booking.check_in}
                </p>

                <p>
                  <strong>Check Out:</strong>{" "}
                  {booking.check_out}
                </p>

                <p>
                  <strong>Guests:</strong>{" "}
                  {booking.guest_count}
                </p>

                <p>
                  <strong>Total:</strong>{" "}
                  {booking.total_amount}{" "}
                  {booking.currency}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {booking.booking_status}
                </p>

                <button
                  onClick={() =>
                    handleDelete(booking.id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded mt-3"
                >
                  Delete
                </button>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Bookings;