import React from "react";
import {
  CreditCard,
  User,
  CalendarDays,
  LockKeyhole,
} from "lucide-react";

function CardPayment({
  cardDetails,
  setCardDetails,
}) {
  const updateField = (field, value) => {
    setCardDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCardNumber = (value) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 16);

    const formatted =
      numbers.match(/.{1,4}/g)?.join(" ") ||
      "";

    updateField(
      "card_number",
      formatted
    );
  };

  const handleExpiry = (value) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 4);

    if (numbers.length <= 2) {
      updateField(
        "expiry_month",
        numbers
      );
      updateField("expiry_year", "");
      return;
    }

    updateField(
      "expiry_month",
      numbers.slice(0, 2)
    );

    updateField(
      "expiry_year",
      numbers.slice(2, 4)
    );
  };

  return (
    <div className="space-y-2.5">
      {/* CARD HOLDER */}
      <div>
        <label className="mb-1 flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
          <User size={11} />
          Cardholder name
        </label>

        <input
          type="text"
          value={
            cardDetails.account_holder_name
          }
          onChange={(e) =>
            updateField(
              "account_holder_name",
              e.target.value
            )
          }
          placeholder="Name on card"
          className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#e61e4d] focus:ring-2 focus:ring-[#e61e4d]/10"
        />
      </div>

      {/* CARD NUMBER */}
      <div>
        <label className="mb-1 flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
          <CreditCard size={11} />
          Card number
        </label>

        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={
              cardDetails.card_number
            }
            onChange={(e) =>
              handleCardNumber(
                e.target.value
              )
            }
            placeholder="1234 5678 9012 3456"
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 pr-10 text-xs font-medium tracking-wide text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#e61e4d] focus:ring-2 focus:ring-[#e61e4d]/10"
          />

          <CreditCard
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* EXPIRY + CVV */}
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="mb-1 flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
            <CalendarDays size={11} />
            Expiry
          </label>

          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            value={
              cardDetails.expiry_month &&
              cardDetails.expiry_year
                ? `${cardDetails.expiry_month}/${cardDetails.expiry_year}`
                : cardDetails.expiry_month ||
                  ""
            }
            onChange={(e) =>
              handleExpiry(
                e.target.value
              )
            }
            placeholder="MM / YY"
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#e61e4d] focus:ring-2 focus:ring-[#e61e4d]/10"
          />
        </div>

        <div>
          <label className="mb-1 flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
            <LockKeyhole size={11} />
            CVV
          </label>

          <input
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
            value={cardDetails.cvv}
            onChange={(e) =>
              updateField(
                "cvv",
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 4)
              )
            }
            placeholder="•••"
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium tracking-widest text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#e61e4d] focus:ring-2 focus:ring-[#e61e4d]/10"
          />
        </div>
      </div>
    </div>
  );
}

export default CardPayment;