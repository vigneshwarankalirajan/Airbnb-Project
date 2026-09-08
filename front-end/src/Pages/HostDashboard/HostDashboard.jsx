import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  CalendarDays,
  IndianRupee,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { getHostDashboard } from "../../api/hostApi";

function HostDashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login/email", { replace: true });
      return;
    }

    loadDashboard();
  }, [navigate]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getHostDashboard();

      console.log("Host Dashboard:", data);

      setDashboard(data);
    } catch (err) {
      console.error("Host Dashboard Error:", err);

      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login/email", { replace: true });
        return;
      }

      setError(
        err?.response?.data?.detail ||
          "Unable to load host dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2
            size={40}
            className="mx-auto animate-spin text-[#e61e4d]"
          />

          <p className="mt-3 text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="text-center">

          <AlertCircle
            size={45}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-4 text-xl font-bold">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={loadDashboard}
            className="mt-5 rounded-xl bg-[#e61e4d] px-6 py-3 text-sm font-semibold text-white"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  /*
   * Backend response field names unknown.
   * So safely read possible values.
   */

  const properties =
    dashboard?.properties ||
    dashboard?.total_properties ||
    0;

  const bookings =
    dashboard?.bookings ||
    dashboard?.total_bookings ||
    0;

  const earnings =
    dashboard?.earnings ||
    dashboard?.total_earnings ||
    0;

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* HEADER */}

      <header className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-5 py-6">

          <h1 className="text-3xl font-bold text-gray-900">
            Host Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your properties and bookings
          </p>

        </div>

      </header>

      {/* CONTENT */}

      <main className="mx-auto max-w-7xl px-5 py-8">

        {/* STATS */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* PROPERTIES */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Properties
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {properties}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Home
                  size={24}
                  className="text-[#123d78]"
                />
              </div>

            </div>

          </div>

          {/* BOOKINGS */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Bookings
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {bookings}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                <CalendarDays
                  size={24}
                  className="text-green-600"
                />
              </div>

            </div>

          </div>

          {/* EARNINGS */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Earnings
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  ₹
                  {Number(
                    earnings
                  ).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50">
                <IndianRupee
                  size={24}
                  className="text-[#e61e4d]"
                />
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default HostDashboard;