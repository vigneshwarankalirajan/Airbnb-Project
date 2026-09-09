import { useEffect, useMemo, useState } from "react";
import {
  Banknote,
  Building2,
  Check,
  CreditCard,
  LockKeyhole,
  Plus,
  Smartphone,
  WalletCards,
} from "lucide-react";

import {
  getPaymentMethods,
  createPaymentMethod
} from "../../api/paymentMethodApi";

const PAYMENT_TYPES = {
  CARD: "credit_card",
  UPI: "upi",
  NET_BANKING: "net_banking",
  WALLET: "wallet",
};

const PAYMENT_OPTIONS = [
  {
    value: PAYMENT_TYPES.CARD,
    label: "Credit or Debit Card",
    description: "Visa, Mastercard, RuPay and more",
    icon: CreditCard,
  },
  {
    value: PAYMENT_TYPES.UPI,
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm and more",
    icon: Smartphone,
  },
  {
    value: PAYMENT_TYPES.NET_BANKING,
    label: "Net Banking",
    description: "All major banks",
    icon: Building2,
  },
  {
    value: PAYMENT_TYPES.WALLET,
    label: "Wallet",
    description: "Paytm, Amazon Pay and more",
    icon: WalletCards,
  },
];

function normalizeMethods(response) {
  if (Array.isArray(response)) return response;

  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.payment_methods)) return response.payment_methods;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.results)) return response.results;

  if (response && typeof response === "object" && response.id) {
    return [response];
  }

  return [];
}

function normalizeType(method) {
  const type = String(
    method?.method_type || method?.type || ""
  ).toLowerCase();

  if (["credit_card", "debit_card", "card"].includes(type)) {
    return PAYMENT_TYPES.CARD;
  }

  if (["upi"].includes(type)) return PAYMENT_TYPES.UPI;

  if (["net_banking", "netbanking", "bank"].includes(type)) {
    return PAYMENT_TYPES.NET_BANKING;
  }

  if (["wallet"].includes(type)) return PAYMENT_TYPES.WALLET;

  return type;
}

function formatExpiry(method) {
  if (!method?.expiry_month || !method?.expiry_year) return "";

  return `${String(method.expiry_month).padStart(2, "0")}/${String(
    method.expiry_year
  ).slice(-2)}`;
}

function getProviderLabel(method) {
  return (
    method?.provider ||
    (normalizeType(method) === PAYMENT_TYPES.CARD ? "Card" : "Payment")
  );
}

function PaymentMethod({
  userId,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  onPaymentMethodChange,
  disabled = false,
}) {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedType, setSelectedType] = useState(PAYMENT_TYPES.CARD);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    account_holder_name: "",
    card_number: "",
    expiry: "",
  });

  const effectiveUserId =
    Number(userId) ||
    Number(localStorage.getItem("user_id")) ||
    Number(localStorage.getItem("guest_id")) ||
    1;

  const selectedId = selectedPaymentMethod?.id ?? null;

  const updateSelection = (method) => {
    if (typeof setSelectedPaymentMethod === "function") {
      setSelectedPaymentMethod(method);
    }

    if (typeof onPaymentMethodChange === "function") {
      onPaymentMethodChange(method);
    }
  };

  const loadPaymentMethods = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPaymentMethods({
        user_id: effectiveUserId,
      });

      const methods = normalizeMethods(response)
        .filter((method) => {
          const status = String(method?.status || "active").toLowerCase();
          return status !== "inactive" && status !== "deleted";
        })
        .sort(
          (a, b) =>
            Number(Boolean(b?.is_default)) -
            Number(Boolean(a?.is_default))
        );

      setPaymentMethods(methods);

      const defaultMethod =
        methods.find((method) => method?.is_default) || methods[0];

      if (defaultMethod) {
        updateSelection(defaultMethod);
        setSelectedType(normalizeType(defaultMethod));
      }
    } catch (err) {
      console.error("PAYMENT METHODS ERROR:", err);
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to load payment methods."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaymentMethods();
  }, [effectiveUserId]);

  const savedCard = useMemo(
    () =>
      paymentMethods.find(
        (method) => normalizeType(method) === PAYMENT_TYPES.CARD
      ),
    [paymentMethods]
  );

  const handleTypeChange = (type) => {
    if (disabled || saving) return;

    setSelectedType(type);

    const savedMethod = paymentMethods.find(
      (method) => normalizeType(method) === type
    );

    if (savedMethod) {
      updateSelection(savedMethod);
      setShowAddCard(false);
    } else {
      updateSelection(null);
      setShowAddCard(type === PAYMENT_TYPES.CARD);
    }
  };

  const handleSavedMethodChange = (method) => {
    if (disabled || saving) return;

    setSelectedType(normalizeType(method));
    setShowAddCard(false);
    updateSelection(method);
  };

  const handleSaveCard = async (event) => {
    event.preventDefault();

    if (saving || disabled) return;

    const holderName = cardDetails.account_holder_name.trim();
    const cardNumber = cardDetails.card_number.replace(/\D/g, "");
    const expiry = cardDetails.expiry.replace(/\D/g, "");

    if (!holderName) {
      setError("Please enter card holder name.");
      return;
    }

    if (cardNumber.length < 12) {
      setError("Please enter a valid card number.");
      return;
    }

    if (expiry.length !== 4) {
      setError("Please enter expiry in MM/YY format.");
      return;
    }

    const month = Number(expiry.slice(0, 2));
    const year = Number(`20${expiry.slice(2)}`);

    if (month < 1 || month > 12) {
      setError("Please enter a valid expiry month.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        user_id: effectiveUserId,
        method_type: PAYMENT_TYPES.CARD,
        provider: "Visa",
        account_holder_name: holderName,
        last_four_digits: cardNumber.slice(-4),
        expiry_month: month,
        expiry_year: year,
        is_default: paymentMethods.length === 0,
        status: "active",
      };

      const created = await createPaymentMethod(payload);

      const newMethod =
        created?.data ||
        created?.payment_method ||
        created;

      setPaymentMethods((current) => [
        newMethod,
        ...current,
      ]);

      setSelectedType(PAYMENT_TYPES.CARD);
      setShowAddCard(false);
      updateSelection(newMethod);

      setCardDetails({
        account_holder_name: "",
        card_number: "",
        expiry: "",
      });
    } catch (err) {
      console.error("CREATE PAYMENT METHOD ERROR:", err);
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to save payment method."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mt-6 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
          <LockKeyhole size={19} strokeWidth={2.2} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Payment method
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose a secure way to pay
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-5 space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[72px] animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {PAYMENT_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedType === option.value;

            return (
              <button
                key={option.value}
                type="button"
                disabled={disabled || saving}
                onClick={() => handleTypeChange(option.value)}
                className={[
                  "w-full rounded-2xl border p-4 text-left transition-all",
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/40 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300",
                  disabled || saving
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                      isSelected
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-600",
                    ].join(" ")}
                  >
                    <Icon size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900">
                      {option.label}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500">
                      {option.description}
                    </div>
                  </div>

                  <div
                    className={[
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                      isSelected
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-gray-300 bg-white",
                    ].join(" ")}
                  >
                    {isSelected && <Check size={13} strokeWidth={3} />}
                  </div>
                </div>

                {option.value === PAYMENT_TYPES.CARD &&
                  isSelected && (
                    <div className="mt-4 flex items-center gap-2 border-t border-emerald-100 pt-3">
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-extrabold text-blue-700 shadow-sm">
                        VISA
                      </span>
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-extrabold text-red-500 shadow-sm">
                        MC
                      </span>
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-extrabold text-blue-600 shadow-sm">
                        RuPay
                      </span>
                    </div>
                  )}

                {option.value === PAYMENT_TYPES.UPI &&
                  isSelected && (
                    <div className="mt-4 flex items-center gap-2 border-t border-emerald-100 pt-3">
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-purple-600 shadow-sm">
                        UPI
                      </span>
                      <span className="text-xs text-gray-500">
                        Fast & secure UPI payment
                      </span>
                    </div>
                  )}
              </button>
            );
          })}
        </div>
      )}

      {!loading && savedCard && (
        <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-gray-700" />
              <span className="text-sm font-semibold text-gray-900">
                Saved card
              </span>
            </div>

            {savedCard.is_default && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                Default
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={disabled || saving}
            onClick={() => handleSavedMethodChange(savedCard)}
            className={[
              "flex w-full items-center gap-3 rounded-xl border bg-white p-3 text-left",
              selectedId === savedCard.id
                ? "border-emerald-500"
                : "border-gray-200",
            ].join(" ")}
          >
            <div className="flex h-9 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white text-[10px] font-extrabold text-blue-700">
              {getProviderLabel(savedCard).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">
                •••• {savedCard.last_four_digits || "----"}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {savedCard.account_holder_name || "Card holder"}
                {formatExpiry(savedCard)
                  ? ` • Exp ${formatExpiry(savedCard)}`
                  : ""}
              </p>
            </div>

            {selectedId === savedCard.id && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check size={13} strokeWidth={3} />
              </div>
            )}
          </button>
        </div>
      )}

      {selectedType === PAYMENT_TYPES.CARD && showAddCard && (
        <form
          onSubmit={handleSaveCard}
          className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Add a new card
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Your card details are securely handled.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={cardDetails.account_holder_name}
              onChange={(e) =>
                setCardDetails((current) => ({
                  ...current,
                  account_holder_name: e.target.value,
                }))
              }
              placeholder="Card holder name"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
            />

            <input
              type="text"
              inputMode="numeric"
              maxLength={19}
              value={cardDetails.card_number}
              onChange={(e) =>
                setCardDetails((current) => ({
                  ...current,
                  card_number: e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 19),
                }))
              }
              placeholder="Card number"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
            />

            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={cardDetails.expiry}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 4);

                const formatted =
                  value.length > 2
                    ? `${value.slice(0, 2)}/${value.slice(2)}`
                    : value;

                setCardDetails((current) => ({
                  ...current,
                  expiry: formatted,
                }));
              }}
              placeholder="MM/YY"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={saving || disabled}
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#123d78] text-sm font-bold text-white transition hover:bg-[#0f3264] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={17} />
            {saving ? "Saving..." : "Save card"}
          </button>
        </form>
      )}

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-3 text-xs text-gray-500">
        <Banknote size={15} className="shrink-0 text-emerald-600" />
        <span>
          Payments are encrypted and securely processed.
        </span>
      </div>
    </section>
  );
}

export default PaymentMethod;
