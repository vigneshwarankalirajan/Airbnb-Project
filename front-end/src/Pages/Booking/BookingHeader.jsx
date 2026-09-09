import React from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookingHeader() {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#52627a] transition hover:text-[#10213f]"
      >
        <ArrowLeft size={17} />
        Back to property
      </button>

      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        {/* Heading */}
        <div>
          <h1 className="text-[32px] font-extrabold leading-tight tracking-[-0.8px] text-[#0f172a] sm:text-[38px]">
            Complete Your Booking
          </h1>

          <p className="mt-2 text-[15px] text-[#52627a] sm:text-base">
            Almost there! Review your details and make a secure payment to
            reserve your stay.
          </p>
        </div>

        {/* Secure */}
        <div className="flex items-center gap-3 lg:pt-1">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <LockKeyhole
              size={23}
              strokeWidth={2}
              className="text-emerald-700"
            />
          </div>

          <div>
            <p className="text-sm font-bold text-emerald-800">
              Your booking is secure
            </p>

            <p className="mt-0.5 text-xs text-[#64748b]">
              We use industry-standard encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingHeader;