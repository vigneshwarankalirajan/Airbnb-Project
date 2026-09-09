import React from "react";
import {
  ArrowRight,
  Loader2,
  LockKeyhole,
} from "lucide-react";

function ReserveButton({
  bookingLoading,
  loadingPrice,
  loadingAvailability,
  isDateAvailable,
  total,
  onClick,
}) {
  const disabled =
    bookingLoading ||
    loadingPrice ||
    loadingAvailability ||
    !isDateAvailable ||
    !total;

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-bold text-white transition-all ${
          disabled
            ? "cursor-not-allowed bg-slate-300"
            : "bg-[#087f68] shadow-sm hover:bg-[#066d5a] hover:shadow-md active:scale-[0.99]"
        }`}
      >
        {bookingLoading ? (
          <>
            <Loader2
              size={19}
              className="animate-spin"
            />

            Processing...
          </>
        ) : (
          <>
            <LockKeyhole size={18} />

            <span>Pay & Reserve</span>

            <span className="mx-1 opacity-70">₹</span>

            <span>
              {Number(total || 0).toLocaleString("en-IN")}
            </span>

            <ArrowRight size={20} className="ml-1" />
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs leading-5 text-slate-500">
        By proceeding, you agree to our{" "}
        <button
          type="button"
          className="font-medium underline underline-offset-2"
        >
          Terms & Conditions
        </button>{" "}
        and{" "}
        <button
          type="button"
          className="font-medium underline underline-offset-2"
        >
          Cancellation Policy
        </button>
        .
      </p>
    </>
  );
}

export default ReserveButton;