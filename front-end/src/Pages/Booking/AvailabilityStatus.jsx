import React from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

function AvailabilityStatus({
  checkIn,
  checkOut,
  isDateAvailable,
  loadingAvailability,
}) {
  if (loadingAvailability) {
    return (
      <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5 text-xs font-medium text-blue-700">
        Checking availability...
      </div>
    );
  }

  if (!checkIn || !checkOut) {
    return (
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
        <CalendarDays size={15} />
        Select dates to check availability
      </div>
    );
  }

  if (isDateAvailable) {
    return (
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700">
        <CheckCircle2 size={15} />
        Available for selected dates
      </div>
    );
  }

  return (
    <div className="mt-3 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
      <AlertCircle size={15} />
      Selected dates unavailable
    </div>
  );
}

export default AvailabilityStatus;