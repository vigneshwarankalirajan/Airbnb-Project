"use client";

import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

import CustomerReveal from "./CustomerReveal";
import apiClient from "../../api/apiClient";

function CustomerNewsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      /*
       * Newsletter backend API endpoint is not provided yet.
       *
       * When your backend endpoint is available,
       * connect it here.
       *
       * Example:
       *
       * await apiClient.post("/newsletter/subscribe", {
       *   email: trimmedEmail,
       * });
       */

      await new Promise((resolve) => setTimeout(resolve, 800));

      setSuccess("You have successfully subscribed!");
      setEmail("");
    } catch (err) {
      console.error(
        "Newsletter API Error:",
        err?.response?.data || err?.message || err
      );

      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Unable to subscribe. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <CustomerReveal>
          <div className="rounded-3xl bg-[#eaf8fc] px-6 py-10 text-center sm:px-10">

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Get travel inspiration in your inbox
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
              Discover new destinations, special offers and
              beautiful stays.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                placeholder="Enter your email"
                disabled={loading}
                className="
                  h-12
                  flex-1
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  text-sm
                  outline-none
                  focus:border-[#123d78]
                  disabled:cursor-not-allowed
                  disabled:bg-gray-100
                "
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#123d78]
                  px-6
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-[#0d315f]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {success && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-green-600">
                <CheckCircle size={16} />
                {success}
              </div>
            )}

            {error && (
              <p className="mt-4 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

          </div>
        </CustomerReveal>

      </div>
    </section>
  );
}

export default CustomerNewsletter;