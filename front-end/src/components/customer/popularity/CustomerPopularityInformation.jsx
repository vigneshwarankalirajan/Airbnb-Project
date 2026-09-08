import { CalendarDays, CheckCircle2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CustomerPopularityInformation({ property, pricing }) {
  const navigate = useNavigate();
  const price = Number(pricing?.base_price ?? property?.price ?? property?.price_per_night ?? 8500);
  const rating = Number(property?.rating ?? property?.average_rating ?? 4.92);
  const reviews = Number(property?.reviews_count ?? property?.review_count ?? 128);
  const guests = Number(property?.guests ?? property?.max_guests ?? 2);
  const nights = 2;
  const cleaningFee = Math.round(price * 0.08);
  const serviceFee = Math.round(price * 0.12);
  const total = price * nights + cleaningFee + serviceFee;

  return (
    <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xl font-black text-gray-900">₹{price.toLocaleString("en-IN")} <span className="text-xs font-medium text-gray-500">/ night</span></p>
          <p className="mt-1 text-sm font-semibold text-gray-700">⭐ {rating.toFixed(2)} · {reviews} reviews</p>
        </div>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">🔥 Popular this week</span>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle2 size={16} className="text-green-600" />Booked 12 times this week</p>
      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
        <p><CalendarDays size={15} className="mb-1 text-gray-400" />Check-in<br /><b className="text-gray-900">Sep 10, 2026</b></p>
        <p><CalendarDays size={15} className="mb-1 text-gray-400" />Check-out<br /><b className="text-gray-900">Sep 12, 2026</b></p>
        <p><Users size={15} className="mb-1 text-gray-400" />Guests<br /><b className="text-gray-900">{guests} guests</b></p>
      </div>
      <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
        <div className="flex justify-between"><span>₹{price.toLocaleString("en-IN")} × {nights} nights</span><span>₹{(price * nights).toLocaleString("en-IN")}</span></div>
        <div className="flex justify-between"><span>Cleaning fee</span><span>₹{cleaningFee.toLocaleString("en-IN")}</span></div>
        <div className="flex justify-between"><span>Service fee</span><span>₹{serviceFee.toLocaleString("en-IN")}</span></div>
        <div className="flex justify-between border-t border-gray-100 pt-3 font-bold text-gray-900"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
      </div>
      <button type="button" onClick={() => navigate(`/booking/${property.id}`)} className="mt-4 w-full rounded-xl bg-[#123d78] py-3 text-sm font-bold text-white transition hover:bg-[#0d315f]">Reserve</button>
    </section>
  );
}

export default CustomerPopularityInformation;
