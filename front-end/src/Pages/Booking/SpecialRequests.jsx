import React from "react";
import { MessageSquareText } from "lucide-react";

function SpecialRequests({
  value,
  onChange,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_3px_14px_rgba(15,23,42,0.035)] sm:p-6">

      {/* HEADER */}
      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <MessageSquareText
            size={21}
            className="text-blue-600"
          />
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-[#10213f]">
            Special requests
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Let the host know if you have any special requirements.
          </p>
        </div>

      </div>

      {/* TEXTAREA */}
      <div className="mt-5">

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Optional"
          rows={4}
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-sm
            text-[#10213f]
            placeholder:text-slate-400
            outline-none
            transition-all
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-50
          "
        />

      </div>

      <p className="mt-2 text-[11px] text-slate-400">
        You can leave this blank if you don't have any special requests.
      </p>

    </section>
  );
}

export default SpecialRequests;