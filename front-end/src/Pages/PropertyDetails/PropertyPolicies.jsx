import React from "react";
import {
  CreditCard,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const PropertyPolicies = ({
  property,
}) => {
  return (
    <section className="border-b border-gray-200 py-8">

      <h2 className="text-2xl font-bold">
        Property policies
      </h2>

      <div className="mt-6 space-y-6">

        <div className="flex gap-4">

          <ShieldCheck
            size={22}
            className="shrink-0 text-[#123d78]"
          />

          <div>
            <h3 className="font-semibold">
              Cancellation policy
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Cancellation terms may vary depending on the booking.
              Please review the policy before confirming your reservation.
            </p>
          </div>

        </div>

        <div className="flex gap-4">

          <CreditCard
            size={22}
            className="shrink-0 text-[#123d78]"
          />

          <div>
            <h3 className="font-semibold">
              Payment policy
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Online payment is required to confirm the reservation.
            </p>
          </div>

        </div>

        <div className="flex gap-4">

          <XCircle
            size={22}
            className="shrink-0 text-[#123d78]"
          />

          <div>
            <h3 className="font-semibold">
              Damage policy
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Guests may be responsible for accidental damage caused
              during the stay.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default PropertyPolicies;