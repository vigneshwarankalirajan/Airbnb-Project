import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Menu,
  UserCircle,
  Heart,
  MessageCircle,
  Home,
  Search,
  MapPin,
  BriefcaseBusiness,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";

import apiClient from "../../api/apiClient";

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const [loadingUser, setLoadingUser] =
    useState(false);

  /* =========================================================
     GET CURRENT USER
  ========================================================= */

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token =
        localStorage.getItem("token");

      /* -------------------------------------------------------
         NO TOKEN
      ------------------------------------------------------- */

      if (!token) {
        const savedUser =
          localStorage.getItem("user");

        if (savedUser) {
          try {
            const parsedUser =
              JSON.parse(savedUser);

            setUser(parsedUser);

            if (parsedUser?.id) {
              localStorage.setItem(
                "user_id",
                String(parsedUser.id)
              );
            }
          } catch (error) {
            console.error(
              "Unable to read saved user:",
              error
            );

            setUser(null);
          }
        }

        return;
      }

      /* -------------------------------------------------------
         GET USER FROM API
      ------------------------------------------------------- */

      try {
        setLoadingUser(true);

        const response =
          await apiClient.get(
            "/api/users/me"
          );

        const userData =
          response?.data;

        setUser(userData);

        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );

        if (userData?.id) {
          localStorage.setItem(
            "user_id",
            String(userData.id)
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch current user:",
          error
        );

        /* -----------------------------------------------------
           FALLBACK TO LOCAL STORAGE
        ----------------------------------------------------- */

        const savedUser =
          localStorage.getItem("user");

        if (savedUser) {
          try {
            const parsedUser =
              JSON.parse(savedUser);

            setUser(parsedUser);

            if (parsedUser?.id) {
              localStorage.setItem(
                "user_id",
                String(parsedUser.id)
              );
            }
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

  /* =========================================================
     USER DETAILS
  ========================================================= */

  const userName =
    user?.name ||
    user?.full_name ||
    user?.username ||
    "Guest";

  const userEmail =
    user?.email ||
    "Welcome to Airbnb";

  const profileImage =
    user?.profile_image ||
    user?.profile_photo ||
    user?.avatar ||
    user?.image ||
    null;

  const isHost =
    String(user?.role || "").toLowerCase() === "host";

  /* =========================================================
     NAVIGATION

     IMPORTANT:
     Become a Host is NOT included here.

     Trips -> /trips
  ========================================================= */

  const navigationItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
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
    {
      label: "Wishlist",
      path: "/wishlist",
      icon: Heart,
    },
    {
      label: "Trips",
      path: "/trips",
      icon: BriefcaseBusiness,
    },
    {
      label: "Messages",
      path: "/messages",
      icon: MessageCircle,
    },
    ...(isHost
      ? [
          {
            label: "Host Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
          },
        ]
      : []),
  ];

  /* =========================================================
     ACTIVE ROUTE
  ========================================================= */

  const isActive = (path) => {
    if (path === "/") {
      return currentLocation.pathname === "/";
    }

    return currentLocation.pathname.startsWith(
      path
    );
  };

  /* =========================================================
     NORMAL NAVIGATION
  ========================================================= */

  const handleNavigate = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  /* =========================================================
     TRIPS

     IMPORTANT:
     Trips page only.
     NOT Booking CRUD page.
  ========================================================= */

  const handleTrips = () => {
    setMobileMenuOpen(false);
    navigate("/trips");
  };

  /* =========================================================
     PROFILE

     Click profile icon -> detailed Profile page
  ========================================================= */

  const handleProfile = () => {
    setMobileMenuOpen(false);
    navigate("/profile");
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = () => {
    setMobileMenuOpen(false);
    navigate("/login");
  };

  /* =========================================================
     SIGN UP
  ========================================================= */

  const handleSignup = () => {
    setMobileMenuOpen(false);
    navigate("/register");
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");

    setUser(null);
    setMobileMenuOpen(false);

    navigate("/login");
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-gray-200/80
          bg-white/95
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-[74px]
            max-w-[1500px]
            items-center
            px-5
            sm:px-7
            lg:px-10
          "
        >

          {/* =================================================
              AIRBNB LOGO

              DO NOT CHANGE
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              handleNavigate("/")
            }
            className="
              group
              flex
              shrink-0
              items-center
              gap-2.5
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#FF385C]
                shadow-[0_5px_15px_rgba(255,56,92,0.25)]
                transition
                duration-300
                group-hover:scale-105
              "
            >
              <Home
                size={20}
                strokeWidth={2.5}
                className="text-white"
              />
            </div>

            <span
              className="
                hidden
                text-[21px]
                font-bold
                tracking-[-0.5px]
                text-gray-900
                sm:block
              "
            >
              AIRBNB
            </span>
          </button>

          {/* =================================================
              DESKTOP NAVIGATION

              Home
              Search
              Map
              Wishlist
              Trips
              Messages

              NO BECOME A HOST
          ================================================= */}

          <nav
            className="
              ml-6
              hidden
              items-center
              gap-1
              xl:flex
            "
          >
            {navigationItems.map(
              (item) => {
                const Icon = item.icon;

                const active =
                  isActive(item.path);

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (
                        item.label ===
                        "Trips"
                      ) {
                        handleTrips();
                      } else {
                        handleNavigate(
                          item.path
                        );
                      }
                    }}
                    className={`
                      group
                      relative
                      flex
                      items-center
                      gap-2
                      rounded-full
                      px-3.5
                      py-2.5
                      text-[14px]
                      font-semibold
                      transition-all
                      duration-200

                      ${
                        active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
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
                      <span
                        className="
                          absolute
                          bottom-1
                          left-1/2
                          h-[2px]
                          w-5
                          -translate-x-1/2
                          rounded-full
                          bg-[#FF385C]
                        "
                      />
                    )}
                  </button>
                );
              }
            )}
          </nav>

          {/* =================================================
              RIGHT SIDE

              Login
              Sign up
              Profile

              LOGIN / SIGNUP ARE LEFT OF PROFILE
          ================================================= */}

          <div
            className="
              ml-auto
              flex
              items-center
              gap-2
            "
          >

            {/* =================================================
                LOGIN

                LEFT OF PROFILE
            ================================================= */}

            {!user && (
              <button
                type="button"
                onClick={handleLogin}
                className="
                  hidden
                  rounded-full
                  px-4
                  py-2.5
                  text-[14px]
                  font-semibold
                  text-gray-700
                  transition
                  hover:bg-gray-100
                  sm:block
                "
              >
                Login
              </button>
            )}

            {/* =================================================
                SIGN UP

                LEFT OF PROFILE
            ================================================= */}

            {!user && (
              <button
                type="button"
                onClick={handleSignup}
                className="
                  hidden
                  rounded-full
                  bg-gray-900
                  px-4
                  py-2.5
                  text-[14px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-gray-700
                  sm:block
                "
              >
                Sign up
              </button>
            )}

            {/* =================================================
                LOGOUT

                Only when logged in
            ================================================= */}

            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="
                  hidden
                  items-center
                  gap-2
                  rounded-full
                  px-4
                  py-2.5
                  text-[14px]
                  font-semibold
                  text-gray-700
                  transition
                  hover:bg-red-50
                  hover:text-red-600
                  sm:flex
                "
              >
                <LogOut size={16} />

                Logout
              </button>
            )}

            {/* =================================================
                PROFILE BUTTON

                CLICK -> /profile

                NO DROPDOWN
                NO BECOME A HOST
            ================================================= */}

            <button
              type="button"
              onClick={handleProfile}
              aria-label="Open Profile"
              className="
                group
                flex
                h-[48px]
                items-center
                gap-2
                rounded-full
                border
                border-gray-300
                bg-white
                px-2
                pl-3
                transition-all
                duration-200
                hover:border-gray-400
                hover:shadow-sm
              "
            >
              <Menu
                size={19}
                className="text-gray-700"
              />

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-gray-100
                "
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <UserCircle
                    size={30}
                    className="text-gray-400"
                  />
                )}
              </div>
            </button>

            {/* =================================================
                MOBILE BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  (previous) =>
                    !previous
                )
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                text-gray-700
                transition
                hover:bg-gray-100
                xl:hidden
              "
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
            MOBILE MENU
        ===================================================== */}

        {mobileMenuOpen && (
          <div
            className="
              border-t
              border-gray-100
              bg-white
              xl:hidden
            "
          >
            <div
              className="
                mx-auto
                max-w-[1500px]
                px-5
                py-4
              "
            >

              {/* =================================================
                  MAIN NAVIGATION
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-2
                  sm:grid-cols-3
                "
              >
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
                        key={item.label}
                        type="button"
                        onClick={() => {
                          if (
                            item.label ===
                            "Trips"
                          ) {
                            handleTrips();
                          } else {
                            handleNavigate(
                              item.path
                            );
                          }
                        }}
                        className={`
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          px-4
                          py-3
                          text-left
                          text-sm
                          font-semibold

                          ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50"
                          }
                        `}
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

              {/* =================================================
                  DIVIDER
              ================================================= */}

              <div
                className="
                  my-4
                  border-t
                  border-gray-100
                "
              />

              {/* =================================================
                  PROFILE
              ================================================= */}

              <button
                type="button"
                onClick={handleProfile}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-semibold
                  text-gray-700
                  transition
                  hover:bg-gray-50
                "
              >
                <UserCircle
                  size={19}
                  className="text-gray-500"
                />

                Profile
              </button>

              {/* =================================================
                  LOGIN / SIGN UP
              ================================================= */}

              {!user ? (
                <>
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-semibold
                      text-gray-700
                      hover:bg-gray-50
                    "
                  >
                    <UserCircle
                      size={19}
                    />

                    Login
                  </button>

                  <button
                    type="button"
                    onClick={handleSignup}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-semibold
                      text-gray-700
                      hover:bg-gray-50
                    "
                  >
                    <UserCircle
                      size={19}
                    />

                    Sign up
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-red-600
                    hover:bg-red-50
                  "
                >
                  <LogOut size={19} />

                  Logout
                </button>
              )}

            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default CustomerNavbar;