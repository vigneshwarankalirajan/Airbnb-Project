import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  UserCircle,
  Heart,
  MessageCircle,
  Home,
  LayoutGrid,
  Search,
  MapPin,
  BriefcaseBusiness,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  X,
} from "lucide-react";

import apiClient from "../../api/apiClient";

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const [loadingUser, setLoadingUser] =
    useState(false);

  // ---------------------------------------------------------
  // Get current logged-in user
  // GET /api/users/me
  // ---------------------------------------------------------

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        setLoadingUser(true);

        const response = await apiClient.get(
          "/api/users/me"
        );

        const userData = response?.data;

        setUser(userData);

        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );
      } catch (error) {
        console.error(
          "Failed to fetch user:",
          error
        );

        const savedUser =
          localStorage.getItem("user");

        if (savedUser) {
          try {
            setUser(
              JSON.parse(savedUser)
            );
          } catch {
            setUser(null);
          }
        }
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // ---------------------------------------------------------
  // User details
  // ---------------------------------------------------------

  const userName =
    user?.name ||
    user?.full_name ||
    user?.username ||
    "Guest";

  const userEmail =
    user?.email || "Welcome to StayEasy";

  const profileImage =
    user?.profile_image ||
    user?.profile_photo ||
    user?.avatar ||
    user?.image ||
    null;

  // ---------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------

  const navigationItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Stays",
      path: "/properties",
      icon: BriefcaseBusiness,
    },
    {
      label: "Categories",
      path: "/category-properties",
      icon: LayoutGrid,
    },
    {
      label: "Search",
      path: "/search",
      icon: Search,
    },
    {
      label: "Map",
      path: "/location",
      icon: MapPin,
    },
  ];

  // ---------------------------------------------------------
  // Check active route
  // ---------------------------------------------------------

  const isActive = (path) => {
    if (path === "/") {
      return currentLocation.pathname === "/";
    }

    return currentLocation.pathname.startsWith(
      path
    );
  };

  // ---------------------------------------------------------
  // Navigate and close menus
  // ---------------------------------------------------------

  const handleNavigate = (path) => {
    setMenuOpen(false);
    setMobileMenuOpen(false);

    navigate(path);
  };

  // ---------------------------------------------------------
  // Profile
  // ---------------------------------------------------------

  const handleProfile = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);

    navigate("/users");
  };

  // ---------------------------------------------------------
  // Wishlist
  // GET /api/wishlist
  // Page will fetch actual wishlist data
  // ---------------------------------------------------------

  const handleWishlist = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);

    navigate("/wishlist");
  };

  // ---------------------------------------------------------
  // Messages
  // GET /api/messages
  // Page will fetch actual messages
  // ---------------------------------------------------------

  const handleMessages = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);

    navigate("/messages");
  };

  // ---------------------------------------------------------
  // Trips / Bookings
  // GET /api/bookings/my-bookings
  // ---------------------------------------------------------

  const handleTrips = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);

    navigate("/bookings");
  };

  // ---------------------------------------------------------
  // Become Host
  // POST /api/properties
  // ---------------------------------------------------------

  const handleBecomeHost = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);

    navigate("/property-listing");
  };

  // ---------------------------------------------------------
  // Host Dashboard
  // GET /api/host/dashboard
  // ---------------------------------------------------------

  const handleHostDashboard = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);

    navigate("/dashboard");
  };

  // ---------------------------------------------------------
  // Logout
  // ---------------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);
    setMobileMenuOpen(false);

    navigate("/login");
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex h-[74px] max-w-[1500px] items-center px-5 sm:px-7 lg:px-10">

          {/* =================================================
              LOGO
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              handleNavigate("/")
            }
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF385C] shadow-[0_5px_15px_rgba(255,56,92,0.25)] transition duration-300 group-hover:scale-105">
              <Home
                size={20}
                strokeWidth={2.5}
                className="text-white"
              />
            </div>

            <span className="hidden text-[21px] font-bold tracking-[-0.5px] text-gray-900 sm:block">
              AIRBNB
            </span>
          </button>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav className="ml-8 hidden items-center gap-1 lg:flex">
            {navigationItems.map(
              (item) => {
                const Icon = item.icon;
                const active = isActive(
                  item.path
                );

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      handleNavigate(
                        item.path
                      )
                    }
                    className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-semibold transition-all duration-200 ${
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      size={16}
                      strokeWidth={
                        active ? 2.4 : 2
                      }
                      className={
                        active
                          ? "text-gray-900"
                          : "text-gray-500 group-hover:text-gray-800"
                      }
                    />

                    {item.label}

                    {active && (
                      <span className="absolute bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#FF385C]" />
                    )}
                  </button>
                );
              }
            )}
          </nav>

          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className="ml-auto flex items-center gap-1.5">

            {/* Become Host */}

            <button
              type="button"
              onClick={
                handleBecomeHost
              }
              className="hidden rounded-full px-4 py-2.5 text-[14px] font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 xl:block"
            >
              Become a Host
            </button>

            {/* Wishlist */}

            <button
              type="button"
              onClick={handleWishlist}
              aria-label="Wishlist"
              className={`hidden h-11 w-11 items-center justify-center rounded-full transition lg:flex ${
                isActive("/wishlist")
                  ? "bg-gray-100 text-[#FF385C]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Heart
                size={20}
                strokeWidth={2}
              />
            </button>

            {/* Messages */}

            <button
              type="button"
              onClick={handleMessages}
              aria-label="Messages"
              className={`hidden h-11 w-11 items-center justify-center rounded-full transition lg:flex ${
                isActive("/messages")
                  ? "bg-gray-100 text-[#FF385C]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <MessageCircle
                size={20}
                strokeWidth={2}
              />
            </button>

            {/* =================================================
                PROFILE MENU
            ================================================= */}

            <div className="relative ml-1">

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(
                    (previous) =>
                      !previous
                  );

                  setMobileMenuOpen(false);
                }}
                className={`flex h-[48px] items-center gap-2 rounded-full border px-2 pl-3 transition-all duration-200 ${
                  menuOpen
                    ? "border-gray-400 bg-gray-50 shadow-sm"
                    : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm"
                }`}
              >
                <Menu
                  size={19}
                  strokeWidth={2}
                  className="text-gray-700"
                />

                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircle
                      size={30}
                      className="text-gray-400"
                    />
                  )}
                </div>

                <ChevronDown
                  size={15}
                  className={`hidden text-gray-500 transition-transform sm:block ${
                    menuOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* =================================================
                  DROPDOWN
              ================================================= */}

              {menuOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="fixed inset-0 z-[-1] h-screen w-screen cursor-default"
                  />

                  <div className="absolute right-0 top-[58px] z-[60] w-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-white py-2 shadow-[0_18px_55px_rgba(0,0,0,0.15)]">

                    {/* User Header */}

                    <button
                      type="button"
                      onClick={
                        handleProfile
                      }
                      className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserCircle
                            size={34}
                            className="text-gray-400"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-bold text-gray-900">
                          {userName}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {userEmail}
                        </p>
                      </div>
                    </button>

                    <div className="my-1 border-t border-gray-100" />

                    {/* Trips */}

                    <button
                      type="button"
                      onClick={handleTrips}
                      className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <BriefcaseBusiness
                        size={18}
                        className="text-gray-500"
                      />

                      <span>
                        Trips & Bookings
                      </span>
                    </button>

                    {/* Wishlist */}

                    <button
                      type="button"
                      onClick={
                        handleWishlist
                      }
                      className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <Heart
                        size={18}
                        className="text-gray-500"
                      />

                      <span>
                        Wishlist
                      </span>
                    </button>

                    {/* Messages */}

                    <button
                      type="button"
                      onClick={
                        handleMessages
                      }
                      className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <MessageCircle
                        size={18}
                        className="text-gray-500"
                      />

                      <span>
                        Messages
                      </span>
                    </button>

                    <div className="my-1 border-t border-gray-100" />

                    {/* Become Host */}

                    <button
                      type="button"
                      onClick={
                        handleBecomeHost
                      }
                      className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <Home
                        size={18}
                        className="text-gray-500"
                      />

                      <span>
                        Become a Host
                      </span>
                    </button>

                    {/* Host Dashboard */}

                    <button
                      type="button"
                      onClick={
                        handleHostDashboard
                      }
                      className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <LayoutDashboard
                        size={18}
                        className="text-gray-500"
                      />

                      <span>
                        Host Dashboard
                      </span>
                    </button>

                    <div className="my-1 border-t border-gray-100" />

                    {/* Logout / Login */}

                    {user ? (
                      <button
                        type="button"
                        onClick={
                          handleLogout
                        }
                        className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut
                          size={18}
                        />

                        <span>
                          Logout
                        </span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleNavigate(
                              "/login"
                            )
                          }
                          className="flex w-full px-5 py-3 text-left text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                        >
                          Login
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleNavigate(
                              "/register"
                            )
                          }
                          className="flex w-full px-5 py-3 text-left text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                        >
                          Sign up
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(
                  (previous) =>
                    !previous
                );

                setMenuOpen(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 lg:hidden"
              aria-label="Open navigation"
            >
              {mobileMenuOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ===================================================== */}

        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white lg:hidden">

            <div className="mx-auto max-w-[1500px] px-5 py-4">

              {/* Main navigation */}

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

                {navigationItems.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    const active =
                      isActive(
                        item.path
                      );

                    return (
                      <button
                        type="button"
                        key={item.label}
                        onClick={() =>
                          handleNavigate(
                            item.path
                          )
                        }
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={
                            active
                              ? "text-[#FF385C]"
                              : "text-gray-500"
                          }
                        />

                        {item.label}
                      </button>
                    );
                  }
                )}

              </div>

              <div className="my-4 border-t border-gray-100" />

              {/* Mobile actions */}

              <div className="space-y-1">

                <button
                  type="button"
                  onClick={
                    handleWishlist
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Heart size={19} />
                  Wishlist
                </button>

                <button
                  type="button"
                  onClick={
                    handleMessages
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <MessageCircle
                    size={19}
                  />
                  Messages
                </button>

                <button
                  type="button"
                  onClick={
                    handleTrips
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <BriefcaseBusiness
                    size={19}
                  />
                  Trips & Bookings
                </button>

                <button
                  type="button"
                  onClick={
                    handleBecomeHost
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Home size={19} />
                  Become a Host
                </button>

                <button
                  type="button"
                  onClick={
                    handleHostDashboard
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <LayoutDashboard
                    size={19}
                  />
                  Host Dashboard
                </button>

                <button
                  type="button"
                  onClick={handleProfile}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <UserCircle
                    size={19}
                  />
                  Profile
                </button>

              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default CustomerNavbar;