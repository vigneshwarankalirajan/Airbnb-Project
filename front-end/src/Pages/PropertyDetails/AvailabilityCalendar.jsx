import React from "react";
import { CalendarDays } from "lucide-react";

function AvailabilityCalendar({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}) {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  return (
    <div className="rounded-2xl bg-gray-50 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
          <CalendarDays
            size={19}
            className="text-[#123d78]"
          />
        </div>

        <div>

          <h3 className="text-sm font-bold text-gray-900">
            Availability
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Select your check-in and check-out dates
          </p>

        </div>

      </div>

      {/* DATES */}

      <div className="mt-4 grid grid-cols-1 gap-3">

        {/* CHECK IN */}

        <div>

          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-gray-500">
            Check-in
          </label>

          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(event) =>
              setCheckIn(
                event.target.value
              )
            }
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 outline-none transition focus:border-[#123d78] focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* CHECK OUT */}

        <div>

          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-gray-500">
            Check-out
          </label>

          <input
            type="date"
            value={checkOut}
            min={
              checkIn || today
            }
            onChange={(event) =>
              setCheckOut(
                event.target.value
              )
            }
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 outline-none transition focus:border-[#123d78] focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </div>

    </div>
  );
}

export default AvailabilityCalendar;