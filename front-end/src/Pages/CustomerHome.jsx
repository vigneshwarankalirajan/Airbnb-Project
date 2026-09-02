"use client";

import {
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Star,
  Wallet,
  Users,
  Search,
} from "lucide-react";

import { motion } from "framer-motion";

import CustomerNavbar from "../components/customer/CustomerNavbar";
import CustomerHero from "../components/customer/CustomerHero";
import CustomerCategories from "../components/customer/CustomerCategories";
import CustomerPropertyCard from "../components/customer/CustomerPropertyCard";
import CustomerExploreLocations from "../components/customer/CustomerExploreLocations";
import CustomerFooter from "../components/customer/CustomerFooter";

const properties = [
  {
    id: 1,
    title: "Luxury Villa",
    location: "Chennai",
    rating: "4.8",
    price: "₹5,000",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "Goa",
    rating: "4.7",
    price: "₹7,500",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Beach Resort",
    location: "Kerala",
    rating: "4.9",
    price: "₹9,000",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Premium House",
    location: "Bangalore",
    rating: "4.8",
    price: "₹6,500",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Sea View Villa",
    location: "Goa",
    rating: "4.9",
    price: "₹10,000",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Modern Stay",
    location: "Mumbai",
    rating: "4.7",
    price: "₹8,000",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
];

const offers = [
  {
    title: "Weekend Escape",
    subtitle: "Save up to 20% on selected stays",
    button: "Explore Deals",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Luxury Getaway",
    subtitle: "Premium stays at special prices",
    button: "View Offers",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
];

const testimonials = [
  {
    name: "Priya",
    location: "Chennai",
    rating: 5,
    message:
      "The booking process was very simple and the property was exactly as shown in the photos.",
  },
  {
    name: "Rahul",
    location: "Bangalore",
    rating: 5,
    message:
      "Great experience. The property was clean, comfortable and the host was very helpful.",
  },
  {
    name: "Ananya",
    location: "Mumbai",
    rating: 5,
    message:
      "Found a beautiful stay at a great price. The entire experience was smooth.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function CustomerHome() {
  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          1. NAVBAR
      ===================================================== */}

      <CustomerNavbar />


      {/* =====================================================
          2. HERO + SEARCH
      ===================================================== */}

      <CustomerHero />


      {/* =====================================================
          3. CATEGORIES
      ===================================================== */}

      <CustomerCategories />


      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        {/* =====================================================
            4. POPULAR PROPERTIES
        ===================================================== */}

        <motion.section
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
        >

          <div className="mb-8 flex items-end justify-between">

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#123d78]">
                Discover
              </p>

              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Popular Properties
              </h2>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Discover stays guests love
              </p>
            </div>

            <button
              className="
                hidden
                items-center
                gap-1
                text-sm
                font-semibold
                text-gray-800
                transition
                hover:text-[#123d78]
                sm:flex
              "
            >
              View all
              <ArrowRight size={16} />
            </button>

          </div>


          <motion.div
            className="
              grid
              grid-cols-1
              gap-7
              sm:grid-cols-2
              lg:grid-cols-3
          "
            variants={staggerContainer}
          >

            {properties.map((property) => (
              <motion.div
                key={property.id}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <CustomerPropertyCard
                  property={property}
                />
              </motion.div>
            ))}

          </motion.div>

        </motion.section>


        {/* =====================================================
            5. POPULAR DESTINATIONS
        ===================================================== */}

        <CustomerExploreLocations />

        {/* =====================================================
            6. SPECIAL OFFERS
        ===================================================== */}

        <motion.section
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >

          <div className="mb-8">

            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#123d78]">
              Offers
            </p>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Best Deals & Special Offers
            </h2>

          </div>


          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {offers.map((offer, index) => (

              <motion.div
                key={offer.title}
                className="
                  group
                  relative
                  h-72
                  overflow-hidden
                  rounded-2xl
                "
                initial={{
                  opacity: 0,
                  x: index === 0 ? -30 : 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
              >

                <img
                  src={offer.image}
                  alt={offer.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/45
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    justify-center
                    p-8
                    text-white
                  "
                >

                  <h3 className="text-2xl font-bold">
                    {offer.title}
                  </h3>

                  <p className="mt-2 max-w-sm text-sm text-white/85">
                    {offer.subtitle}
                  </p>

                  <button
                    className="
                      mt-5
                      flex
                      w-fit
                      items-center
                      gap-2
                      rounded-lg
                      bg-white
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-gray-900
                      transition
                      hover:bg-gray-100
                    "
                  >
                    {offer.button}
                    <ArrowRight size={16} />
                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        </motion.section>


        {/* =====================================================
            7. WHY CHOOSE US
        ===================================================== */}

        <motion.section
          className="rounded-3xl bg-[#f5f9fc] px-6 py-16 sm:px-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >

          <div className="text-center">

            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#123d78]">
              Why Stayora
            </p>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Why Choose Us?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 sm:text-base">
              Everything you need for a comfortable, secure and memorable stay.
            </p>

          </div>


          <motion.div
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
            variants={staggerContainer}
          >

            {/* VERIFIED */}

            <motion.div
              variants={fadeUp}
              className="
                rounded-2xl
                bg-white
                p-8
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#123d78]">
                <ShieldCheck size={25} />
              </div>

              <h3 className="text-lg font-semibold">
                Verified Properties
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Discover carefully reviewed and verified properties for a
                reliable stay.
              </p>

            </motion.div>


            {/* SECURE */}

            <motion.div
              variants={fadeUp}
              className="
                rounded-2xl
                bg-white
                p-8
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#123d78]">
                <ShieldCheck size={25} />
              </div>

              <h3 className="text-lg font-semibold">
                Secure Booking
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your booking information and payment details are handled
                securely.
              </p>

            </motion.div>


            {/* BEST PRICE */}

            <motion.div
              variants={fadeUp}
              className="
                rounded-2xl
                bg-white
                p-8
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#123d78]">
                <Wallet size={25} />
              </div>

              <h3 className="text-lg font-semibold">
                Best Prices
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Find comfortable stays at competitive prices for every type
                of traveler.
              </p>

            </motion.div>

          </motion.div>

        </motion.section>


        {/* =====================================================
            8. HOW IT WORKS
        ===================================================== */}

        <motion.section
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >

          <div className="text-center">

            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#123d78]">
              Simple Process
            </p>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              How It Works
            </h2>

            <p className="mt-2 text-gray-500">
              Book your perfect stay in three simple steps.
            </p>

          </div>


          <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">

            {/* STEP 1 */}

            <div className="relative text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#123d78]
                  text-xl
                  font-bold
                  text-white
                "
              >
                1
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Search
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500">
                Choose your destination, dates and number of guests.
              </p>

            </div>


            {/* STEP 2 */}

            <div className="relative text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#123d78]
                  text-xl
                  font-bold
                  text-white
                "
              >
                2
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Choose
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500">
                Compare properties and choose the perfect place for your trip.
              </p>

            </div>


            {/* STEP 3 */}

            <div className="relative text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#123d78]
                  text-xl
                  font-bold
                  text-white
                "
              >
                3
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Book
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500">
                Complete your booking securely and enjoy your stay.
              </p>

            </div>

          </div>

        </motion.section>


        {/* =====================================================
            9. BECOME A HOST
        ===================================================== */}

        <motion.section
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-[#123d78]
            py-16
            text-white
            sm:py-20
          "
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <div className="relative z-10 px-6 sm:px-12">

            <div className="max-w-xl">

              <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
                Become a Host
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Share your space with travelers
              </h2>

              <p className="mt-4 text-sm leading-7 text-blue-100 sm:text-base">
                Turn your property into an opportunity. Host guests, earn
                income and become part of our growing community.
              </p>

              <button
                className="
                  mt-7
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-[#123d78]
                  transition
                  hover:bg-gray-100
                "
              >
                List Your Property
                <ArrowRight size={16} />
              </button>

            </div>

          </div>

        </motion.section>


        {/* =====================================================
            10. TESTIMONIALS
        ===================================================== */}

        <motion.section
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >

          <div className="mb-10 text-center">

            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#123d78]">
              Guest Experiences
            </p>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              What Our Guests Say
            </h2>

          </div>


          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {testimonials.map((testimonial, index) => (

              <motion.div
                key={testimonial.name}
                className="
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-7
                  shadow-sm
                "
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
              >

                <div className="flex gap-1">

                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="currentColor"
                      className="text-yellow-400"
                    />
                  ))}

                </div>

                <p className="mt-5 text-sm leading-7 text-gray-600">
                  "{testimonial.message}"
                </p>

                <div className="mt-6">

                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {testimonial.location}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </motion.section>


        {/* =====================================================
            11. NEWSLETTER
        ===================================================== */}

        <motion.section
          className="
            mb-20
            rounded-3xl
            bg-[#f5f9fc]
            px-6
            py-14
            text-center
            sm:px-10
          "
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Stay updated with the latest stays
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
            Get travel inspiration, special offers and new property updates
            directly in your inbox.
          </p>


          <div className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email address"
              className="
                flex-1
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                outline-none
                focus:border-[#123d78]
              "
            />

            <button
              className="
                rounded-lg
                bg-[#123d78]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#0d315f]
              "
            >
              Subscribe
            </button>

          </div>

        </motion.section>

      </main>


      {/* =====================================================
          12. FOOTER
      ===================================================== */}

      <CustomerFooter />

    </div>
  );
}

export default CustomerHome;