import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { login } from "../../api/authApi";

function EmailLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email: email.trim(),
        password: password,
      });

      console.log("LOGIN RESPONSE:", response);

      const data = response?.data;

      console.log("LOGIN DATA:", data);

      const token =
        data?.access_token ||
        data?.token;

      if (token) {
        localStorage.setItem(
          "token",
          token
        );

        if (data?.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }

        navigate("/", {
          replace: true,
        });

        return;
      }

      setError(
        "Login successful, but access token was not returned."
      );

    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      console.error(
        "LOGIN ERROR RESPONSE:",
        err?.response?.data
      );

      const detail =
        err?.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(
          detail
            .map(
              (item) =>
                item?.msg ||
                "Invalid input"
            )
            .join(", ")
        );
      } else if (
        typeof detail === "string"
      ) {
        setError(detail);
      } else if (
        err?.response?.status === 401
      ) {
        setError(
          "Invalid email or password."
        );
      } else {
        setError(
          "Unable to login. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage:
          "url('/Login-bg-images/Login image.webp')",
      }}
    >

      {/* Overlay */}

      <div className="
        absolute
        inset-0
        bg-black/50
      " />

      {/* Close */}

      <button
        type="button"
        onClick={() =>
          navigate("/login")
        }
        className="
          absolute
          right-6
          top-6
          z-30
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-black/20
          text-white
          backdrop-blur-sm
          transition
          hover:bg-white/20
          hover:scale-105
        "
      >
        <X size={27} />
      </button>

      {/* Main */}

      <div className="
        relative
        z-10
        flex
        min-h-screen
        items-center
        justify-center
        px-5
        py-10
      ">

        <div className="
          w-full
          max-w-[430px]
        ">

          {/* Logo */}

          <div className="
            mb-8
            text-center
            text-white
          ">

            <h1 className="
              text-5xl
              font-semibold
              tracking-tight
            ">
              AIRBNB
            </h1>

            <p className="
              mt-3
              text-sm
              text-white/80
            ">
              Welcome back
            </p>

          </div>

          {/* Card */}

          <div className="
            rounded-3xl
            border
            border-white/20
            bg-white/10
            p-7
            shadow-2xl
            backdrop-blur-xl
            sm:p-8
          ">

            <h2 className="
              text-2xl
              font-bold
              text-white
            ">
              Log in with Email
            </h2>

            <p className="
              mt-2
              text-sm
              text-white/70
            ">
              Enter your email and password
              to continue.
            </p>

            <form
              onSubmit={handleLogin}
              className="mt-7"
            >

              {/* Email */}

              <div className="mb-5">

                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={20}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-white/60
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(
                        e.target.value
                      );
                      setError("");
                    }}
                    placeholder="Enter your email"
                    autoComplete="email"
                    disabled={loading}
                    className="
                      h-14
                      w-full
                      rounded-xl
                      border
                      border-white/30
                      bg-white/10
                      pl-12
                      pr-4
                      text-white
                      outline-none
                      placeholder:text-white/50
                      focus:border-white
                      focus:bg-white/15
                    "
                  />

                </div>

              </div>

              {/* Password */}

              <div className="mb-5">

                <label
                  htmlFor="password"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={20}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-white/60
                    "
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) => {
                      setPassword(
                        e.target.value
                      );
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="
                      h-14
                      w-full
                      rounded-xl
                      border
                      border-white/30
                      bg-white/10
                      pl-12
                      pr-12
                      text-white
                      outline-none
                      placeholder:text-white/50
                      focus:border-white
                      focus:bg-white/15
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-white/60
                      hover:text-white
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* Error */}

              {error && (
                <div className="
                  mb-5
                  rounded-xl
                  border
                  border-red-300/30
                  bg-red-500/20
                  px-4
                  py-3
                ">
                  <p className="
                    text-sm
                    text-red-100
                  ">
                    {error}
                  </p>
                </div>
              )}

              {/* Login */}

              <button
                type="submit"
                disabled={loading}
                className="
                  h-14
                  w-full
                  rounded-xl
                  bg-[#FF385C]
                  text-base
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  hover:bg-[#E31C5F]
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading
                  ? "Logging in..."
                  : "Log in"}
              </button>

            </form>

            {/* Register */}

            <div className="
              mt-7
              text-center
            ">

              <span className="
                text-sm
                text-white/70
              ">
                Don't have an account?
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate("/register")
                }
                className="
                  ml-1
                  text-sm
                  font-bold
                  text-white
                  hover:underline
                "
              >
                Sign up
              </button>

            </div>

          </div>

          {/* Back */}

          <button
            type="button"
            onClick={() =>
              navigate("/login")
            }
            className="
              mx-auto
              mt-6
              block
              text-sm
              font-medium
              text-white/80
              hover:text-white
              hover:underline
            "
          >
            ← Back to login options
          </button>

        </div>

      </div>

    </div>
  );
}

export default EmailLogin;