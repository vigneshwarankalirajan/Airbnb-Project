import React from "react";
import { Gift, Info, Loader2, Tag } from "lucide-react";

function PriceDetails({
  pricing,
  priceDetails,
  nights,
  loadingPrice,
  formatCurrency,
}) {
  const currency = pricing?.currency || "INR";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_3px_14px_rgba(15,23,42,0.035)] sm:p-6">
      {/* HEADER */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50">
          <Tag size={21} className="text-rose-600" />
        </div>

        <h2 className="text-lg font-extrabold text-[#10213f]">
          Price details
        </h2>
      </div>

      {loadingPrice ? (
        <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
          <Loader2 size={18} className="animate-spin" />
          Loading price...
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {/* NIGHT PRICE */}
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-[#52627a]">
                {currency === "INR" ? "₹" : currency}{" "}
                {formatCurrency(priceDetails.basePrice)} × {nights}{" "}
                {nights === 1 ? "night" : "nights"}
              </span>

              <span className="font-semibold text-[#52627a]">
                ₹
                {formatCurrency(
                  priceDetails.basePrice * nights
                )}
              </span>
            </div>

            {/* CLEANING */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#52627a]">
                Cleaning fee
              </span>

              <span className="font-semibold text-[#52627a]">
                ₹{formatCurrency(priceDetails.cleaningFee)}
              </span>
            </div>

            {/* SERVICE */}
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-[#52627a]">
                Service fee
              </span>

              <span className="font-semibold text-[#52627a]">
                ₹{formatCurrency(priceDetails.serviceFee)}
              </span>
            </div>

            {/* GUEST FEE */}
            {priceDetails.guestFee > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#52627a]">
                  Extra guest fee
                </span>

                <span className="font-semibold text-[#52627a]">
                  ₹{formatCurrency(priceDetails.guestFee)}
                </span>
              </div>
            )}

            {/* TAX */}
            {priceDetails.tax > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-[#52627a]">
                  Taxes ({pricing?.tax_percentage || 0}%)

                  <Info size={15} />
                </span>

                <span className="font-semibold text-[#52627a]">
                  ₹{formatCurrency(priceDetails.tax)}
                </span>
              </div>
            )}
          </div>

          {/* DIVIDER */}
          <div className="my-5 border-t border-slate-200" />

          {/* TOTAL */}
          <div className="flex items-center justify-between">
            <span className="text-base font-extrabold text-[#10213f]">
              Total (INR)
            </span>

            <span className="text-[23px] font-extrabold text-[#10213f]">
              ₹{formatCurrency(priceDetails.total)}
            </span>
          </div>

          {/* GREAT CHOICE */}
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
              <Gift size={22} className="text-emerald-600" />
            </div>

            <div>
              <p className="text-sm font-bold text-emerald-800">
                Great choice!
              </p>

              <p className="mt-0.5 text-xs text-emerald-700">
                This property is in high demand. Secure your stay now.
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default PriceDetails;