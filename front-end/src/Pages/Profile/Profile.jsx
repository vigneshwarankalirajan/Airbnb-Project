import { useNavigate } from "react-router-dom";
import { Bell, CreditCard, Globe2, Heart, House, LogOut, MapPin, MessageCircle, ShieldCheck, UserCircle } from "lucide-react";
import CustomerNavbar from "../../components/customer/CustomerNavbar";

function Profile() {
  const navigate = useNavigate();
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const sections = [
    { title: "Account", items: [[UserCircle, "Personal Information", "/profile"], [ShieldCheck, "Login & Security", "/login"], [CreditCard, "Payments & Payouts", "/profile"], [Bell, "Notifications", "/profile"], [Globe2, "Language & Region", "/profile"], [CreditCard, "Currency", "/profile"], [MapPin, "Saved Addresses", "/profile"]] },
    { title: "Booking", items: [["🧳", "Trips", "/trips"], [Heart, "Wishlists", "/wishlist"], ["📅", "Booking History", "/trips"], ["❌", "Cancellation & Refunds", "/trips"]] },
    { title: "Hosting", items: [[House, "Become a Host", "/become-host"], [House, "Your Listings", "/properties"], ["📋", "Reservations", "/trips"], [CreditCard, "Earnings", "/profile"], ["📊", "Host Dashboard", "/dashboard"]] },
    { title: "Support", items: [[MessageCircle, "Help Center", "/messages"], ["🆘", "Contact Support", "/messages"], ["⚖️", "Terms & Conditions", "/profile"], ["🔒", "Privacy Policy", "/profile"]] },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <CustomerNavbar />

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <UserCircle size={56} className="text-gray-400" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your account details</p>
            </div>
          </div>

          <button type="button" onClick={() => navigate("/profile")} className="mt-6 rounded-lg bg-[#123d78] px-4 py-2 text-sm font-semibold text-white">Edit Profile</button>
          <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Name</p>
              <p className="mt-1 text-gray-800">{user?.name || "Guest"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Email</p>
              <p className="mt-1 text-gray-800">{user?.email || "Not signed in"}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-gray-100 pt-8 sm:grid-cols-2">
            {sections.map((section) => <div key={section.title}><h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">{section.title}</h2><div className="divide-y divide-gray-100 rounded-xl border border-gray-100">{section.items.map(([Icon, label, path]) => <button key={label} type="button" onClick={() => navigate(path)} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50">{typeof Icon === "string" ? <span className="w-5 text-center">{Icon}</span> : <Icon size={18} className="text-gray-500" />}{label}</button>)}</div></div>)}
          </div>
          <button type="button" onClick={() => { localStorage.clear(); navigate("/login"); }} className="mt-8 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut size={17} />Log Out</button>
        </section>
      </main>
    </div>
  );
}

export default Profile;
