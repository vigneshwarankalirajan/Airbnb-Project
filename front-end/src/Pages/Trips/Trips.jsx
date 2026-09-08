import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "../../components/customer/CustomerNavbar";
import { getBookings } from "../../api/bookingApi";
import { getProperties } from "../../api/propertiesApi";
import { getPropertyImages } from "../../api/propertyImagesApi";

const fallbackImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80";

function formatDate(value) {
  if (!value) return "Date not available";
  return new Date(value).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TripCard({ booking, property, propertyImage, past, onView }) {
  const title = property?.title || `Property #${booking.property_id}`;
  const location = [property?.city, property?.state].filter(Boolean).join(", ") || "Location unavailable";
  const status = booking.booking_status || booking.status || (past ? "completed" : "confirmed");

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <img src={propertyImage || property?.image || property?.image_url || fallbackImage} alt={title} className="h-52 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500"><MapPin size={15} />{location}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold capitalize text-green-700"><CheckCircle2 size={14} />{status}</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
          <p className="flex items-center gap-2"><CalendarDays size={16} />{formatDate(booking.check_in)}</p>
          <p>{formatDate(booking.check_out)}</p>
          <p>{booking.guest_count || booking.guests || 1} Guests</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-semibold text-gray-900">{booking.total_amount ? `${booking.currency || "INR"} ${booking.total_amount}` : "Amount unavailable"}</p>
          <button type="button" onClick={() => onView(property?.id || booking.property_id)} className="rounded-lg bg-[#123d78] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e315f]">{past ? "Review" : "View Trip"}</button>
        </div>
      </div>
    </article>
  );
}

function Trips() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [imagesByProperty, setImagesByProperty] = useState({});
  const [tab, setTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getBookings(), getProperties(), getPropertyImages()])
      .then(([bookingResponse, propertyResponse, imageResponse]) => {
        setBookings(Array.isArray(bookingResponse.data) ? bookingResponse.data : []);
        const propertyList = Array.isArray(propertyResponse) ? propertyResponse : [];
        setProperties(propertyList);

        const imageList = Array.isArray(imageResponse)
          ? imageResponse
          : imageResponse?.data || imageResponse?.items || [];
        const imageMap = {};

        imageList
          .sort((a, b) => Number(a?.display_order || 0) - Number(b?.display_order || 0))
          .forEach((image) => {
            const propertyId = image?.property_id;
            if (propertyId && image?.image_url && !imageMap[propertyId]) {
              imageMap[propertyId] = image.image_url;
            }
          });

        setImagesByProperty(imageMap);
      })
      .catch(() => setError("Unable to load your trips right now."))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date();
  const upcoming = bookings.filter((booking) => new Date(booking.check_out) >= today);
  const past = bookings.filter((booking) => new Date(booking.check_out) < today);
  const visibleTrips = tab === "upcoming" ? upcoming : past;
  const findProperty = (propertyId) => properties.find((property) => property.id === propertyId);

  return (
    <div className="min-h-screen bg-[#fcfcfc]"><CustomerNavbar />
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF385C]">Your stays</p><h1 className="mt-2 text-3xl font-bold text-gray-900">Trips</h1><p className="mt-2 text-gray-500">Keep track of your upcoming and completed stays.</p></div>
        <div className="mt-8 flex gap-2 border-b border-gray-200"><button type="button" onClick={() => setTab("upcoming")} className={`px-4 py-3 text-sm font-semibold ${tab === "upcoming" ? "border-b-2 border-[#FF385C] text-gray-900" : "text-gray-500"}`}>Upcoming ({upcoming.length})</button><button type="button" onClick={() => setTab("past")} className={`px-4 py-3 text-sm font-semibold ${tab === "past" ? "border-b-2 border-[#FF385C] text-gray-900" : "text-gray-500"}`}>Past ({past.length})</button></div>
        {loading && <p className="py-16 text-center text-gray-500">Loading your trips...</p>}
        {!loading && error && <p className="py-16 text-center text-red-600">{error}</p>}
        {!loading && !error && visibleTrips.length === 0 && <div className="py-20 text-center"><Star className="mx-auto text-gray-300" size={40} /><p className="mt-4 font-semibold text-gray-800">No {tab} trips yet</p><button type="button" onClick={() => navigate("/properties")} className="mt-4 rounded-lg bg-[#123d78] px-4 py-2 text-sm font-semibold text-white">Explore Listings</button></div>}
        {!loading && !error && visibleTrips.length > 0 && <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visibleTrips.map((booking) => <TripCard key={booking.id} booking={booking} property={findProperty(booking.property_id)} propertyImage={imagesByProperty[booking.property_id]} past={tab === "past"} onView={(id) => navigate(`/property-details/${id}`)} />)}</div>}
      </main>
    </div>
  );
}

export default Trips;
