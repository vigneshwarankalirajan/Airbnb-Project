import {
  Users,
  Building2,
  CalendarCheck,
  IndianRupee,
  UserCheck,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";

function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,250",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Total Properties",
      value: "350",
      change: "+8.2%",
      icon: Building2,
    },
    {
      title: "Total Bookings",
      value: "890",
      change: "+15.4%",
      icon: CalendarCheck,
    },
    {
      title: "Total Revenue",
      value: "₹12.5L",
      change: "+10.8%",
      icon: IndianRupee,
    },
  ];

  const recentBookings = [
    {
      id: "#BK001",
      guest: "Arun Kumar",
      property: "Luxury Villa",
      amount: "₹15,000",
      status: "Confirmed",
    },
    {
      id: "#BK002",
      guest: "Priya",
      property: "Modern Apartment",
      amount: "₹8,500",
      status: "Pending",
    },
    {
      id: "#BK003",
      guest: "Rahul",
      property: "Beach Resort",
      amount: "₹12,000",
      status: "Confirmed",
    },
    {
      id: "#BK004",
      guest: "Meena",
      property: "Premium House",
      amount: "₹10,500",
      status: "Cancelled",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-8 py-5">
          <div>
            <p className="text-sm text-gray-500">
              Welcome back
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {stat.title}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-gray-900">
                        {stat.value}
                      </h2>
                    </div>

                    <div className="rounded-xl bg-gray-100 p-3 text-[#123d78]">
                      <Icon size={21} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-sm">
                    <ArrowUpRight size={15} />
                    <span className="font-medium">
                      {stat.change}
                    </span>
                    <span className="text-gray-400">
                      from last month
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Middle Section */}
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Booking Overview */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 xl:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Booking Overview
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Recent booking activity
                  </p>
                </div>

                <CalendarCheck
                  size={21}
                  className="text-[#123d78]"
                />
              </div>

              <div className="mt-6 h-64 rounded-xl bg-gray-50">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <BarChartIcon />
                    <p className="mt-2 text-sm text-gray-500">
                      Booking analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Quick Actions
              </h2>

              <div className="mt-5 space-y-3">
                <QuickAction
                  icon={UserCheck}
                  title="Verify Users"
                  description="Review pending verifications"
                />

                <QuickAction
                  icon={Building2}
                  title="Property Approvals"
                  description="Review host properties"
                />

                <QuickAction
                  icon={Clock3}
                  title="Pending Bookings"
                  description="Check booking requests"
                />
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-bold text-gray-900">
                Recent Bookings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest booking activity
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                    <th className="px-6 py-4 font-medium">
                      Booking ID
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Guest
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Property
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Amount
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {booking.id}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {booking.guest}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {booking.property}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {booking.amount}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border border-gray-100 p-3 text-left transition hover:border-gray-200 hover:bg-gray-50"
    >
      <div className="rounded-lg bg-gray-100 p-2.5 text-[#123d78]">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-900">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-gray-500">
          {description}
        </p>
      </div>
    </button>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Confirmed: "bg-green-50 text-green-600",
    Pending: "bg-yellow-50 text-yellow-600",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function BarChartIcon() {
  return (
    <div className="flex items-end justify-center gap-2">
      <div className="h-10 w-4 rounded-t bg-gray-300" />
      <div className="h-16 w-4 rounded-t bg-gray-400" />
      <div className="h-24 w-4 rounded-t bg-[#123d78]" />
      <div className="h-14 w-4 rounded-t bg-gray-400" />
      <div className="h-20 w-4 rounded-t bg-gray-300" />
    </div>
  );
}

export default AdminDashboard;