import React from "react";
import {
  Building2,
  Check,
} from "lucide-react";

const banks = [
  "SBI",
  "HDFC",
  "ICICI",
  "Axis",
  "Kotak",
  "Other",
];

function NetBankingPayment({
  netBankingDetails,
  setNetBankingDetails,
}) {
  const selectedBank =
    netBankingDetails.bank_name;

  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
          <Building2 size={11} />
          Select your bank
        </label>

        <div className="grid grid-cols-3 gap-2">
          {banks.map((bank) => {
            const selected =
              selectedBank === bank;

            return (
              <button
                key={bank}
                type="button"
                onClick={() =>
                  setNetBankingDetails(
                    (prev) => ({
                      ...prev,
                      bank_name: bank,
                    })
                  )
                }
                className={`relative flex min-h-[42px] items-center justify-center rounded-lg border px-2 text-xs font-bold transition ${
                  selected
                    ? "border-[#e61e4d] bg-white text-[#e61e4d]"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {bank}

                {selected && (
                  <span className="absolute right-1.5 top-1.5">
                    <Check
                      size={10}
                      className="text-[#e61e4d]"
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* OTHER BANK */}
      <div>
        <label className="mb-1 flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
          Bank
        </label>

        <select
          value={selectedBank}
          onChange={(e) =>
            setNetBankingDetails(
              (prev) => ({
                ...prev,
                bank_name:
                  e.target.value,
              })
            )
          }
          className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-900 outline-none focus:border-[#e61e4d] focus:ring-2 focus:ring-[#e61e4d]/10"
        >
          <option value="">
            Select your bank
          </option>
          <option value="SBI">
            State Bank of India
          </option>
          <option value="HDFC">
            HDFC Bank
          </option>
          <option value="ICICI">
            ICICI Bank
          </option>
          <option value="Axis">
            Axis Bank
          </option>
          <option value="Kotak">
            Kotak Mahindra Bank
          </option>
          <option value="Other">
            Other Bank
          </option>
        </select>
      </div>

      <div className="rounded-lg border border-dashed border-gray-200 bg-white px-3 py-2">
        <p className="text-[10px] leading-4 text-gray-500">
          You will be redirected to your
          bank's secure login page to
          complete the payment.
        </p>
      </div>
    </div>
  );
}

export default NetBankingPayment;