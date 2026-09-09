import React, { useEffect, useState } from "react";
import {
  CreditCard,
  Smartphone,
  Building2,
  Check,
  ShieldCheck,
  Plus,
  WalletCards,
} from "lucide-react";

import CardPayment from "./CardPayment";
import UPIPayment from "./UPIPayment";
import NetBankingPayment from "./NetBankingPayment";

const PAYMENT_TYPES = {
  CARD: "card",
  UPI: "upi",
  NET_BANKING: "net_banking",
  WALLET: "wallet",
};

function PaymentMethod({
  savedPaymentMethods = [],
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  loadingPaymentMethods = false,
  disabled = false,
}) {
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPES.CARD);

  const [cardDetails, setCardDetails] = useState({
    account_holder_name: "",
    card_number: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
  });

  const [upiDetails, setUpiDetails] = useState({
    provider: "Google Pay",
    upi_id: "",
  });

  const [netBankingDetails, setNetBankingDetails] = useState({
    bank_name: "",
  });

  const [savePaymentMethod, setSavePaymentMethod] =
    useState(false);

  /*
   * Existing saved payment method
   */
  const handleSavedMethod = (method) => {
    if (disabled) return;

    setSelectedPaymentMethod({
      ...method,
      is_new: false,
    });

    const methodType =
      method?.method_type?.toLowerCase();

    if (
      methodType === "upi" ||
      methodType === "net_banking" ||
      methodType === "credit_card" ||
      methodType === "card"
    ) {
      if (methodType === "upi") {
        setPaymentType(PAYMENT_TYPES.UPI);
      } else if (
        methodType === "net_banking"
      ) {
        setPaymentType(
          PAYMENT_TYPES.NET_BANKING
        );
      } else {
        setPaymentType(PAYMENT_TYPES.CARD);
      }
    }
  };

  /*
   * New payment type
   */
  const handlePaymentType = (type) => {
    if (disabled) return;

    setPaymentType(type);

    // Important:
    // Selecting a new payment type means
    // existing saved method is no longer selected.
    setSelectedPaymentMethod({
      id: null,
      is_new: true,
      method_type:
        type === PAYMENT_TYPES.CARD
          ? "credit_card"
          : type,
    });
  };

  /*
   * Card
   */
  useEffect(() => {
    if (paymentType !== PAYMENT_TYPES.CARD) {
      return;
    }

    if (
      selectedPaymentMethod?.id &&
      !selectedPaymentMethod?.is_new
    ) {
      return;
    }

    setSelectedPaymentMethod({
      id: null,
      is_new: true,
      method_type: "credit_card",
      provider: "Visa",
      account_holder_name:
        cardDetails.account_holder_name,
      card_number: cardDetails.card_number,
      expiry_month: cardDetails.expiry_month,
      expiry_year: cardDetails.expiry_year,
      cvv: cardDetails.cvv,
      save_payment_method:
        savePaymentMethod,
    });
  }, [
    paymentType,
    cardDetails,
    savePaymentMethod,
  ]);

  /*
   * UPI
   */
  useEffect(() => {
    if (paymentType !== PAYMENT_TYPES.UPI) {
      return;
    }

    if (
      selectedPaymentMethod?.id &&
      !selectedPaymentMethod?.is_new
    ) {
      return;
    }

    setSelectedPaymentMethod({
      id: null,
      is_new: true,
      method_type: "upi",
      provider: upiDetails.provider,
      upi_id: upiDetails.upi_id,
      save_payment_method:
        savePaymentMethod,
    });
  }, [
    paymentType,
    upiDetails,
    savePaymentMethod,
  ]);

  /*
   * Net Banking
   */
  useEffect(() => {
    if (
      paymentType !== PAYMENT_TYPES.NET_BANKING
    ) {
      return;
    }

    if (
      selectedPaymentMethod?.id &&
      !selectedPaymentMethod?.is_new
    ) {
      return;
    }

    setSelectedPaymentMethod({
      id: null,
      is_new: true,
      method_type: "net_banking",
      provider:
        netBankingDetails.bank_name,
      bank_name:
        netBankingDetails.bank_name,
      save_payment_method:
        savePaymentMethod,
    });
  }, [
    paymentType,
    netBankingDetails,
    savePaymentMethod,
  ]);

  const getMethodType = (method) => {
    const type =
      method?.method_type?.toLowerCase();

    if (
      type === "upi"
    ) {
      return PAYMENT_TYPES.UPI;
    }

    if (
      type === "net_banking"
    ) {
      return PAYMENT_TYPES.NET_BANKING;
    }

    return PAYMENT_TYPES.CARD;
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-4 py-3.5 sm:px-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff1f3] text-[#e61e4d]">
              <WalletCards size={16} />
            </div>

            <h2 className="text-[15px] font-bold text-gray-900">
              Payment method
            </h2>
          </div>

          <p className="mt-1 pl-10 text-xs text-gray-500">
            Choose a secure way to pay
          </p>
        </div>

      </div>

      <div className="p-3 sm:p-3.5">
        {/* PAYMENT TYPE - COMPACT VERTICAL DESIGN */}
        <div className="space-y-2">
          {/* CARD */}
          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              handlePaymentType(PAYMENT_TYPES.CARD)
            }
            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
              paymentType === PAYMENT_TYPES.CARD
                ? "border-[#20a982] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                paymentType === PAYMENT_TYPES.CARD
                  ? "border-[#168f70]"
                  : "border-gray-400"
              }`}
            >
              {paymentType === PAYMENT_TYPES.CARD && (
                <span className="h-2 w-2 rounded-full bg-[#168f70]" />
              )}
            </span>

            <CreditCard
              size={20}
              strokeWidth={1.8}
              className="shrink-0 text-gray-800"
            />

            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-gray-900">
                Credit or Debit Card
              </span>
              <span className="mt-0.5 block text-[15px] text-gray-500">
                Visa, Mastercard, RuPay, etc.
              </span>
            </span>

            <span className="flex shrink-0 items-center gap-2 text-[11px] font-extrabold">
              <span className="italic tracking-tight text-[#1a4fc4]">
                VISA
              </span>
              <span className="relative flex h-4 w-6 items-center justify-center">
                <span className="absolute left-0 h-4 w-4 rounded-full bg-[#eb001b]" />
                <span className="absolute right-0 h-4 w-4 rounded-full bg-[#f79e1b] opacity-95" />
              </span>
              <span className="text-[#0068b7]">RuPay</span>
            </span>
          </button>

          {/* UPI */}
          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              handlePaymentType(PAYMENT_TYPES.UPI)
            }
            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
              paymentType === PAYMENT_TYPES.UPI
                ? "border-[#20a982] bg-white"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                paymentType === PAYMENT_TYPES.UPI
                  ? "border-[#168f70]"
                  : "border-gray-400"
              }`}
            >
              {paymentType === PAYMENT_TYPES.UPI && (
                <span className="h-2 w-2 rounded-full bg-[#168f70]" />
              )}
            </span>

            <span className="flex w-5 shrink-0 items-center justify-center text-[13px] font-black italic text-gray-700">
              UPI
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-gray-900">
                UPI
              </span>
              <span className="mt-0.5 block text-[10px] text-gray-500">
                Google Pay, PhonePe, Paytm, etc.
              </span>
            </span>

            <span className="flex shrink-0 items-center gap-3">
              <span className="font-bold text-[13px]">
                <span className="text-[#4285f4]">G</span>
                <span className="text-[#ea4335]"> Pay</span>
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5f259f] text-xs font-bold text-white">
                φ
              </span>
              <span className="text-[11px] font-extrabold text-[#123d78]">
                paytm
              </span>
            </span>
          </button>

          {/* NET BANKING */}
          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              handlePaymentType(PAYMENT_TYPES.NET_BANKING)
            }
            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
              paymentType === PAYMENT_TYPES.NET_BANKING
                ? "border-[#20a982] bg-white"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                paymentType === PAYMENT_TYPES.NET_BANKING
                  ? "border-[#168f70]"
                  : "border-gray-400"
              }`}
            >
              {paymentType === PAYMENT_TYPES.NET_BANKING && (
                <span className="h-2 w-2 rounded-full bg-[#168f70]" />
              )}
            </span>

            <Building2
              size={21}
              strokeWidth={1.8}
              className="shrink-0 text-gray-800"
            />

            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-gray-900">
                Net Banking
              </span>
              <span className="mt-0.5 block text-[10px] text-gray-500">
                All major banks supported
              </span>
            </span>
          </button>

          {/* WALLET - UI OPTION */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              setPaymentType(PAYMENT_TYPES.WALLET);
              setSelectedPaymentMethod({
                id: null,
                is_new: true,
                method_type: PAYMENT_TYPES.WALLET,
              });
            }}
            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
              paymentType === PAYMENT_TYPES.WALLET
                ? "border-[#20a982] bg-white"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                paymentType === PAYMENT_TYPES.WALLET
                  ? "border-[#168f70]"
                  : "border-gray-400"
              }`}
            >
              {paymentType === PAYMENT_TYPES.WALLET && (
                <span className="h-2 w-2 rounded-full bg-[#168f70]" />
              )}
            </span>

            <WalletCards
              size={21}
              strokeWidth={1.8}
              className="shrink-0 text-gray-800"
            />

            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-gray-900">
                Wallet
              </span>
              <span className="mt-0.5 block text-[10px] text-gray-500">
                Pay using your wallet balance
              </span>
            </span>
          </button>
        </div>

        {/* SAVED METHODS */}
        {loadingPaymentMethods ? (
          <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-3 w-48 animate-pulse rounded bg-gray-200" />
          </div>
        ) : savedPaymentMethods.length > 0 ? (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold text-gray-800">
                Saved payment
              </p>

              <span className="text-[10px] font-medium text-gray-400">
                {savedPaymentMethods.length}{" "}
                saved
              </span>
            </div>

            <div className="space-y-2">
              {savedPaymentMethods.map(
                (method) => {
                  const isSelected =
                    selectedPaymentMethod?.id ===
                    method.id;

                  const type =
                    getMethodType(method);

                  return (
                    <button
                      key={method.id}
                      type="button"
                      disabled={disabled}
                      onClick={() =>
                        handleSavedMethod(
                          method
                        )
                      }
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                        isSelected
                          ? "border-[#e61e4d] bg-[#fff7f8]"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-[#e61e4d] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {type ===
                        PAYMENT_TYPES.UPI ? (
                          <Smartphone
                            size={17}
                          />
                        ) : type ===
                          PAYMENT_TYPES.NET_BANKING ? (
                          <Building2
                            size={17}
                          />
                        ) : (
                          <CreditCard
                            size={17}
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-xs font-bold text-gray-900">
                            {method.provider ||
                              "Card"}
                          </p>

                          {method.is_default && (
                            <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                              Default
                            </span>
                          )}
                        </div>

                        {method.last_four_digits ? (
                          <p className="mt-0.5 text-[11px] text-gray-500">
                            ••••{" "}
                            {
                              method.last_four_digits
                            }
                            {method.expiry_month &&
                              method.expiry_year &&
                              `  ·  Exp ${String(
                                method.expiry_month
                              ).padStart(
                                2,
                                "0"
                              )}/${String(
                                method.expiry_year
                              ).slice(-2)}`}
                          </p>
                        ) : (
                          <p className="mt-0.5 text-[11px] text-gray-500">
                            {method.account_holder_name ||
                              method.bank_name ||
                              "Saved payment method"}
                          </p>
                        )}
                      </div>

                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-[#e61e4d] bg-[#e61e4d] text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <Check size={12} />
                        )}
                      </div>
                    </button>
                  );
                }
              )}
            </div>

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-[10px] font-medium text-gray-400">
                OR PAY WITH NEW METHOD
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
          </div>
        ) : null}

       {/* NEW PAYMENT FORM */}
{paymentType !== PAYMENT_TYPES.WALLET && (
  <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 sm:p-4">
    <div className="mb-3 flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-gray-900">
          {paymentType === PAYMENT_TYPES.CARD
            ? "Card details"
            : paymentType === PAYMENT_TYPES.UPI
            ? "UPI details"
            : "Bank details"}
        </p>

        <p className="mt-0.5 text-[10px] text-gray-400">
          Enter your payment details
        </p>
      </div>

      <Plus
        size={15}
        className="text-gray-400"
      />
    </div>

    {paymentType === PAYMENT_TYPES.CARD && (
      <CardPayment
        cardDetails={cardDetails}
        setCardDetails={setCardDetails}
      />
    )}

    {paymentType === PAYMENT_TYPES.UPI && (
      <UPIPayment
        upiDetails={upiDetails}
        setUpiDetails={setUpiDetails}
      />
    )}

    {paymentType === PAYMENT_TYPES.NET_BANKING && (
      <NetBankingPayment
        netBankingDetails={netBankingDetails}
        setNetBankingDetails={setNetBankingDetails}
      />
    )}

    <label className="mt-3 flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={savePaymentMethod}
        onChange={(e) =>
          setSavePaymentMethod(e.target.checked)
        }
        disabled={disabled}
        className="h-3.5 w-3.5 rounded border-gray-300 accent-[#e61e4d]"
      />

      <span className="text-[11px] font-medium text-gray-600">
        Save this payment method for future bookings
      </span>
    </label>
  </div>
)}
        {/* SECURITY */}
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <ShieldCheck
            size={14}
            className="shrink-0 text-emerald-600"
          />

          <p className="text-[10px] font-medium leading-4 text-emerald-700">
            Your payment information is
            protected with secure payment
            processing.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PaymentMethod;