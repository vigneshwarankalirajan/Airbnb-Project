import {
  ArrowLeft,
  BadgeDollarSign,
  BadgeCheck,
  Ban,
  Banknote,
  Camera,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Gift,
  Headphones,
  Image as ImageIcon,
  MapPin,
  MapPinned,
  MessageCircle,
  ReceiptText,
  SearchCheck,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Star,
  UserCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const contentBySlug = {
  "secure-booking": {
    icon: ShieldCheck,
    eyebrow: "Trust and safety",
    title: "Book with confidence",
    description: "Explore stays with clear property information, uploaded photos and secure booking details.",
    points: ["Verified property information", "Secure booking flow", "Clear stay and payment details"],
    groups: [
      { icon: BadgeCheck, title: "Verified property", items: ["Property photos verified", "Host details verified"] },
      { icon: Camera, title: "Real photos", items: ["Actual property images", "Uploaded visual details"] },
      { icon: UserCheck, title: "Verified host", items: ["Host profile", "Host rating", "Reviews count"] },
      { icon: ShieldAlert, title: "Property safety", items: ["Safety information", "Property rules"] },
      { icon: MapPinned, title: "Location verified", items: ["Map location", "Nearby places"] },
    ],
  },
  "best-prices": {
    icon: BadgeDollarSign,
    eyebrow: "Transparent pricing",
    title: "Find the best available prices",
    description: "Compare real stays from the property catalog and review the details before you reserve.",
    points: ["Nightly prices from the API", "Transparent property details", "No surprise property information"],
    groups: [
      { icon: CircleDollarSign, title: "Best available price", items: ["Nightly price", "Total stay price"] },
      { icon: ReceiptText, title: "Price breakdown", items: ["Room or stay price", "Cleaning fee", "Service fee", "Taxes", "Total"] },
      { icon: SearchCheck, title: "Compare prices", items: ["Similar properties", "Price comparison"] },
      { icon: Gift, title: "Special offers", items: ["Discounts", "Weekly and monthly offers"] },
      { icon: Ban, title: "No hidden charges", items: ["All fees displayed before booking"] },
      { icon: Banknote, title: "Flexible pricing", items: ["Different dates can have different prices"] },
    ],
  },
  support: {
    icon: Headphones,
    eyebrow: "Guest support",
    title: "Help throughout your stay",
    description: "Browse properties with useful location, capacity and stay information in one place.",
    points: ["Property information in one view", "Location details for every stay", "Booking support through your account"],
    groups: [
      { icon: MessageCircle, title: "24/7 support", items: ["Chat support", "Booking assistance"] },
      { icon: FileText, title: "Booking details", items: ["Guest details", "Check-in and check-out", "Payment summary"] },
      { icon: MapPinned, title: "Stay information", items: ["Property location", "Nearby places", "Property rules"] },
    ],
  },
  "quality-stays": {
    icon: Sparkles,
    eyebrow: "Curated stays",
    title: "Choose a stay you can see",
    description: "Review uploaded property photos and actual listing details before choosing your next stay.",
    points: ["Uploaded property images", "Property type and location", "Guest capacity and room details"],
    groups: [
      { icon: Camera, title: "Real photos", items: ["Actual property images", "Uploaded stay gallery"] },
      { icon: Star, title: "Guest reviews", items: ["Overall rating", "Recent guest reviews"] },
      { icon: ShieldCheck, title: "Property safety", items: ["Safety information", "Property rules"] },
      { icon: MapPinned, title: "Location verified", items: ["Map location", "Nearby places"] },
    ],
  },
};

function WhyChooseUsDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const content = contentBySlug[slug] || contentBySlug["quality-stays"];
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-[#f7fafc] text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-[#123d78]"
          >
            <ArrowLeft size={17} />
            Back
          </button>
          <span className="text-sm font-bold tracking-wide text-[#123d78]">STAYORA</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-3xl bg-[#123d78] px-6 py-12 text-white sm:px-12">
          <div className="flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Icon size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">{content.eyebrow}</p>
              <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{content.title}</h1>
              <p className="mt-4 max-w-2xl leading-7 text-blue-100">{content.description}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {content.points.map((point) => (
            <div key={point} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={20} />
              <span className="text-sm font-semibold text-gray-800">{point}</span>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#123d78]">What you get</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Everything shown clearly</h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.groups.map((group) => {
              const GroupIcon = group.icon;

              return (
                <article key={group.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#123d78]">
                      <GroupIcon size={22} />
                    </div>
                    <h3 className="font-bold text-gray-900">{group.title}</h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}

export default WhyChooseUsDetails;
