function Dashboard() {
  const cards = [
    {
      title: "Total Users",
      value: "1,250",
      change: "+12.5%",
      description: "from last month",
      icon: "👥",
    },
    {
      title: "Admin Users",
      value: "25",
      change: "+4.2%",
      description: "from last month",
      icon: "🛡️",
    },
    {
      title: "Properties",
      value: "350",
      change: "+8.7%",
      description: "from last month",
      icon: "🏠",
    },
    {
      title: "Bookings",
      value: "2,450",
      change: "+15.3%",
      description: "from last month",
      icon: "📅",
    },
  ];

  const months = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 65 },
    { month: "Mar", value: 52 },
    { month: "Apr", value: 78 },
    { month: "May", value: 60 },
    { month: "Jun", value: 88 },
    { month: "Jul", value: 70 },
    { month: "Aug", value: 82 },
    { month: "Sep", value: 68 },
    { month: "Oct", value: 92 },
    { month: "Nov", value: 76 },
    { month: "Dec", value: 86 },
  ];

  const activities = [
    {
      title: "New user registered",
      description: "Arun Guest created an account",
      time: "10 min ago",
      icon: "👤",
    },
    {
      title: "Property added",
      description: "Luxury Apartment was added",
      time: "35 min ago",
      icon: "🏠",
    },
    {
      title: "Booking completed",
      description: "Booking #BK-10245 completed",
      time: "1 hour ago",
      icon: "✓",
    },
    {
      title: "User verification",
      description: "Passport verification pending",
      time: "2 hours ago",
      icon: "📄",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* TOP NAVBAR */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-5 lg:px-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Airbnb Admin
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-900 text-xl">
            🔔
          </button>

          <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
            A
          </div>
        </div>
      </header>

      <div className="flex">

        {/* SIDEBAR */}
        <aside className="hidden lg:block w-64 min-h-[calc(100vh-64px)] bg-white border-r border-gray-200">
          <div className="p-5">

            <p className="text-xs font-semibold text-gray-400 uppercase mb-4">
              Main Menu
            </p>

            <nav className="space-y-2">

              <a
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 text-white"
              >
                📊
                <span className="text-sm font-medium">
                  Dashboard
                </span>
              </a>

              <a
                href="/users"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
              >
                👥
                <span className="text-sm font-medium">
                  Users
                </span>
              </a>

              <a
                href="/admin-users"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
              >
                🛡️
                <span className="text-sm font-medium">
                  Admin Users
                </span>
              </a>

              <a
                href="/roles"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
              >
                🔐
                <span className="text-sm font-medium">
                  Roles
                </span>
              </a>

              <a
                href="/permissions"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
              >
                🔑
                <span className="text-sm font-medium">
                  Permissions
                </span>
              </a>

              <a
                href="/properties"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
              >
                🏠
                <span className="text-sm font-medium">
                  Properties
                </span>
              </a>

              <a
                href="/property-images"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
              >
                🖼️
                <span className="text-sm font-medium">
                  Property Images
                </span>
              </a>

            </nav>

            <p className="text-xs font-semibold text-gray-400 uppercase mt-8 mb-4">
              User Management
            </p>

            <nav className="space-y-2">

              <a
                href="/user-verifications"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
              >
                📄
                <span className="text-sm font-medium">
                  User Verifications
                </span>
              </a>

              <a
                href="/user-preferences"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
              >
                ⚙️
                <span className="text-sm font-medium">
                  User Preferences
                </span>
              </a>

            </nav>

          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 p-5 lg:p-8">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl shadow-sm">
                📊
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                  Welcome back! Here's what's happening with your Airbnb platform.
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                📅 This Month
              </button>

              <button className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800">
                + Add Property
              </button>

            </div>

          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

            {cards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {card.title}
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-2">
                      {card.value}
                    </h2>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
                    {card.icon}
                  </div>

                </div>

                <div className="flex items-center gap-2 mt-4">

                  <span className="text-sm font-semibold text-green-600">
                    ↑ {card.change}
                  </span>

                  <span className="text-xs text-gray-400">
                    {card.description}
                  </span>

                </div>

              </div>
            ))}

          </div>

          {/* CHART SECTION */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

            {/* BAR CHART */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Booking Overview
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Monthly booking performance
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-900"></span>
                    Bookings
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                    Previous
                  </div>

                </div>

              </div>

              <div className="h-64 flex items-end gap-2 sm:gap-4 border-b border-gray-100">

                {months.map((item) => (
                  <div
                    key={item.month}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                  >

                    <div className="w-full flex items-end justify-center gap-1 h-52">

                      {/* Previous */}
                      <div
                        className="w-1/3 bg-gray-200 rounded-t-md"
                        style={{
                          height: `${item.value * 0.65}%`,
                        }}
                      />

                      {/* Current */}
                      <div
                        className="w-1/3 bg-gray-900 rounded-t-md hover:bg-gray-700 transition"
                        style={{
                          height: `${item.value}%`,
                        }}
                      />

                    </div>

                    <span className="text-[10px] sm:text-xs text-gray-400">
                      {item.month}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* PROPERTY STATUS */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Property Status
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Current listings
                  </p>
                </div>

                <button className="text-gray-400">
                  ⋮
                </button>

              </div>

              <div className="flex justify-center py-7">

                <div className="relative w-40 h-40">

                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background:
                        "conic-gradient(#111827 0deg 252deg, #e5e7eb 252deg 360deg)",
                    }}
                  />

                  <div className="absolute inset-5 bg-white rounded-full flex flex-col items-center justify-center">

                    <span className="text-3xl font-bold text-gray-900">
                      70%
                    </span>

                    <span className="text-xs text-gray-400">
                      Active
                    </span>

                  </div>

                </div>

              </div>

              <div className="space-y-3">

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-2">

                    <span className="w-2.5 h-2.5 rounded-full bg-gray-900"></span>

                    <span className="text-sm text-gray-600">
                      Active
                    </span>

                  </div>

                  <span className="text-sm font-semibold">
                    245
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-2">

                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>

                    <span className="text-sm text-gray-600">
                      Inactive
                    </span>

                  </div>

                  <span className="text-sm font-semibold">
                    105
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* BOTTOM SECTION */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-2xl border border-gray-200">

              <div className="p-6 border-b border-gray-100 flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Recent Activity
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Latest platform activities
                  </p>
                </div>

                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  View All
                </button>

              </div>

              <div className="divide-y divide-gray-100">

                {activities.map((activity) => (
                  <div
                    key={activity.title}
                    className="p-5 flex items-center gap-4"
                  >

                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      {activity.icon}
                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="font-medium text-gray-800">
                        {activity.title}
                      </p>

                      <p className="text-sm text-gray-500 truncate">
                        {activity.description}
                      </p>

                    </div>

                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {activity.time}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* USERS & ACCESS */}
            <div className="bg-white rounded-2xl border border-gray-200">

              <div className="p-6 border-b border-gray-100">

                <h2 className="text-lg font-bold text-gray-900">
                  Users & Access
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Manage platform access and permissions
                </p>

              </div>

              <div className="p-6 grid grid-cols-2 gap-4">

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">

                  <p className="text-xs text-gray-500">
                    Users
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    1,250
                  </p>

                  <p className="text-xs text-green-600 mt-1">
                    Active accounts
                  </p>

                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">

                  <p className="text-xs text-gray-500">
                    Roles
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    8
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Configured roles
                  </p>

                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">

                  <p className="text-xs text-gray-500">
                    Permissions
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    32
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Available permissions
                  </p>

                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">

                  <p className="text-xs text-gray-500">
                    Pending Verification
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    18
                  </p>

                  <p className="text-xs text-orange-500 mt-1">
                    Requires review
                  </p>

                </div>

              </div>

              <div className="px-6 pb-6">

                <button className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition">
                  Manage User & Access →
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;