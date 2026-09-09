import React from "react";
import {
  BadgeCheck,
  CalendarDays,
  Headphones,
  ShieldCheck,
} from "lucide-react";

function SecureBooking() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_3px_14px_rgba(15,23,42,0.035)]">
      <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {/* LEFT */}
        <div className="space-y-5 pb-5 sm:pr-5 sm:pb-0">
          <Benefit
            icon={<ShieldCheck size={21} />}
            title="Secure payment"
            description="Your payment information is encrypted"
          />

          <Benefit
            icon={<Headphones size={21} />}
            title="24/7 support"
            description="We're here to help anytime"
          />
        </div>

        {/* RIGHT */}
        <div className="space-y-5 pt-5 sm:pl-5 sm:pt-0">
          <Benefit
            icon={<CalendarDays size={21} />}
            title="Free cancellation"
            description="Cancel up to 24 hours before check-in"
          />

          <Benefit
            icon={<BadgeCheck size={21} />}
            title="Best price guarantee"
            description="You won't find a lower price elsewhere"
          />
        </div>
      </div>
    </section>
  );
}

function Benefit({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-[#10213f]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default SecureBooking;