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
import CustomerWhyChooseUs from "../components/customer/CustomerWhyChooseUs";
import CustomerSpecialOffers from "../components/customer/CustomerSpecialOffers";
import CustomerHowItWorks from "../components/customer/CustomerHowItWorks";
import CustomerBecomeHost from "../components/customer/CustomerBecomeHost";
import CustomerTestimonials from "../components/customer/CustomerTestimonials";
import CustomerNewsletter from "../components/customer/CustomerNewsletter";
import CustomerFAQ from "../components/customer/CustomerFAQ";
import CustomerTravelInspiration from "../components/customer/CustomerTravelInspiration";


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

      

      <CustomerNavbar />



      <CustomerHero />



      <CustomerCategories />


      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


       

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


        

        <CustomerExploreLocations />

        
        <CustomerSpecialOffers />



        <CustomerWhyChooseUs />

        <CustomerTravelInspiration/>



        <CustomerHowItWorks />

        <CustomerBecomeHost />

        <CustomerTestimonials />

        <CustomerNewsletter />

        < CustomerFAQ />

        

       

       


      </main>


      

      <CustomerFooter />

    </div>
  );
}

export default CustomerHome;