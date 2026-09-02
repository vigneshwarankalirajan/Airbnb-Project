import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import {
  Mail,
  X,
  Menu,
  ChevronRight,
  LockKeyhole,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#171717] text-white">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          flex
          h-[58px]
          items-center
          justify-between
          border-b
          border-[#303030]
          bg-[#242424]
          px-4
          shadow-md
        "
      >
        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-md
              text-white
              transition
              hover:bg-white/10
            "
          >
            <Menu
              size={22}
              strokeWidth={1.8}
            />
          </button>

          <h1
            className="
              text-[15px]
              font-semibold
              tracking-tight
            "
          >
            Login
          </h1>

        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            text-gray-400
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <X
            size={21}
            strokeWidth={1.7}
          />
        </button>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          mx-auto
          min-h-[calc(100vh-58px)]
          w-full
          max-w-[560px]
          px-4
          pb-12
        "
      >

        {/* =================================================
            PROFILE / INTRO
        ================================================= */}

        <section className="px-2 pb-7 pt-8">

          <div className="text-center">

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#ff385c]
                shadow-lg
              "
            >
              <span
                className="
                  text-2xl
                  font-bold
                  text-white
                "
              >
                A
              </span>
            </div>

            <h2
              className="
                mt-5
                text-[20px]
                font-semibold
                tracking-tight
              "
            >
              Welcome back
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-5
                text-[#a5a5a5]
              "
            >
              Log in to continue your Airbnb
              experience
            </p>

          </div>

        </section>


        {/* =================================================
            LOGIN OPTIONS
        ================================================= */}

        <section>

          <p
            className="
              px-2
              pb-3
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-[#777]
            "
          >
            LOGIN OPTIONS
          </p>


          {/* ================= GOOGLE ================= */}

          <button
            type="button"
            className="
              flex
              min-h-[70px]
              w-full
              items-center
              border-b
              border-[#303030]
              px-2
              text-left
              transition
              hover:bg-[#202020]
            "
          >

            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
              "
            >
              <FcGoogle size={22} />
            </span>

            <span className="ml-4 flex-1">

              <span
                className="
                  block
                  text-[14px]
                  font-semibold
                  text-white
                "
              >
                Log in with Google
              </span>

              <span
                className="
                  mt-0.5
                  block
                  text-[12px]
                  text-[#8b8b8b]
                "
              >
                Continue with your Google account
              </span>

            </span>

            <ChevronRight
              size={19}
              className="text-[#666]"
            />

          </button>


          {/* ================= FACEBOOK ================= */}

          <button
            type="button"
            className="
              flex
              min-h-[70px]
              w-full
              items-center
              border-b
              border-[#303030]
              px-2
              text-left
              transition
              hover:bg-[#202020]
            "
          >

            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#4267B2]
              "
            >
              <FaFacebookF
                size={20}
                className="text-white"
              />
            </span>

            <span className="ml-4 flex-1">

              <span
                className="
                  block
                  text-[14px]
                  font-semibold
                  text-white
                "
              >
                Log in with Facebook
              </span>

              <span
                className="
                  mt-0.5
                  block
                  text-[12px]
                  text-[#8b8b8b]
                "
              >
                Continue with your Facebook account
              </span>

            </span>

            <ChevronRight
              size={19}
              className="text-[#666]"
            />

          </button>


          {/* ================= EMAIL ================= */}

          <button
            type="button"
            onClick={() => navigate("/login/email")}
            className="
              flex
              min-h-[70px]
              w-full
              items-center
              border-b
              border-[#303030]
              px-2
              text-left
              transition
              hover:bg-[#202020]
            "
          >

            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#292929]
              "
            >
              <Mail
                size={20}
                strokeWidth={1.8}
                className="text-[#ff385c]"
              />
            </span>

            <span className="ml-4 flex-1">

              <span
                className="
                  block
                  text-[14px]
                  font-semibold
                  text-white
                "
              >
                Log in with Email
              </span>

              <span
                className="
                  mt-0.5
                  block
                  text-[12px]
                  text-[#8b8b8b]
                "
              >
                Use your email and password
              </span>

            </span>

            <ChevronRight
              size={19}
              className="text-[#666]"
            />

          </button>

        </section>


        {/* =================================================
            ACCOUNT
        ================================================= */}

        <section className="mt-9">

          <p
            className="
              px-2
              pb-3
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-[#777]
            "
          >
            MY ACCOUNT
          </p>


          {/* SIGN UP */}

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="
              flex
              min-h-[70px]
              w-full
              items-center
              border-b
              border-[#303030]
              px-2
              text-left
              transition
              hover:bg-[#202020]
            "
          >

            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#292929]
              "
            >
              <LockKeyhole
                size={19}
                className="text-[#aaa]"
              />
            </span>

            <span className="ml-4 flex-1">

              <span
                className="
                  block
                  text-[14px]
                  font-semibold
                  text-white
                "
              >
                Create an account
              </span>

              <span
                className="
                  mt-0.5
                  block
                  text-[12px]
                  text-[#8b8b8b]
                "
              >
                New to Airbnb? Sign up here
              </span>

            </span>

            <ChevronRight
              size={19}
              className="text-[#666]"
            />

          </button>

        </section>


        {/* =================================================
            AIRBNB
        ================================================= */}

        <section className="mt-9">

          <p
            className="
              px-2
              pb-3
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-[#777]
            "
          >
            CONNECT WITH AIRBNB
          </p>


          <div
            className="
              flex
              min-h-[70px]
              items-center
              border-b
              border-[#303030]
              px-2
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#292929]
              "
            >

              <span
                className="
                  text-[25px]
                  font-bold
                  text-[#ff385c]
                "
              >
                ♒
              </span>

            </div>

            <div className="ml-4">

              <p
                className="
                  text-[14px]
                  font-semibold
                  text-white
                "
              >
                Airbnb account
              </p>

              <p
                className="
                  mt-0.5
                  text-[12px]
                  text-[#8b8b8b]
                "
              >
                Secure account access
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            TERMS
        ================================================= */}

        <section className="mt-8 px-2">

          <p
            className="
              text-center
              text-[11px]
              leading-5
              text-[#666]
            "
          >
            By continuing, you agree to Airbnb's{" "}
            <span className="text-[#ff385c]">
              Terms of Service
            </span>
            ,{" "}
            <span className="text-[#ff385c]">
              Privacy Policy
            </span>
            , and other applicable policies.
          </p>

        </section>

      </main>

    </div>
  );
}

export default Login;