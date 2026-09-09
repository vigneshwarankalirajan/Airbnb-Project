import React from "react";
import {
  Smartphone,
  AtSign,
} from "lucide-react";

const providers = [
  {
    name: "Google Pay",
    short: "GPay",
  },
  {
    name: "PhonePe",
    short: "PhonePe",
  },
  {
    name: "Paytm",
    short: "Paytm",
  },
];

function UPIPayment({
  upiDetails,
  setUpiDetails,
}) {
  return (
    <div className="space-y-3">
      {/* PROVIDERS */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
          <Smartphone size={11} />
          Select UPI app
        </label>

        <div className="grid grid-cols-3 gap-2">
          {providers.map((provider) => {
            const selected =
              upiDetails.provider ===
              provider.name;

            return (
              <button
                key={provider.name}
                type="button"
                onClick={() =>
                  setUpiDetails(
                    (prev) => ({
                      ...prev,
                      provider:
                        provider.name,
                    })
                  )
                }
                className={`rounded-lg border px-2 py-2.5 text-center transition ${
                  selected
                    ? "border-[#e61e4d] bg-white text-[#e61e4d]"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <div className="text-[11px] font-bold">
                  {provider.short}
                </div>

                <div className="mt-0.5 text-[9px] text-gray-400">
                  UPI
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* UPI ID */}
      <div>
        <label className="mb-1 flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
          <AtSign size={11} />
          UPI ID
        </label>

        <input
          type="text"
          value={upiDetails.upi_id}
          onChange={(e) =>
            setUpiDetails((prev) => ({
              ...prev,
              upi_id:
                e.target.value
                  .trim()
                  .toLowerCase(),
            }))
          }
          placeholder="yourname@upi"
          className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#e61e4d] focus:ring-2 focus:ring-[#e61e4d]/10"
        />
      </div>

      <div className="rounded-lg border border-dashed border-gray-200 bg-white px-3 py-2">
        <p className="text-[10px] leading-4 text-gray-500">
          You will be redirected to your
          selected UPI app to complete the
          payment.
        </p>
      </div>
    </div>
  );
}

export default UPIPayment;