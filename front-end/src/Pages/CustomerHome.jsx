"use client";

import CustomerNavbar from "../components/customer/CustomerNavbar";
import CustomerHero from "../components/customer/CustomerHero";
import CustomerCategories from "../components/customer/CustomerCategories";
import CustomerPopularProperties from "../components/customer/CustomerPopularProperties";
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

function CustomerHome() {
  return (
    <div className="min-h-screen bg-white">
      <CustomerNavbar />

      <CustomerHero />

      <CustomerCategories />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <CustomerPopularProperties />

        <CustomerExploreLocations />

        <CustomerSpecialOffers />

        <CustomerWhyChooseUs />

        <CustomerTravelInspiration />

        <CustomerHowItWorks />

        <CustomerBecomeHost />

        <CustomerTestimonials />

        <CustomerNewsletter />

        <CustomerFAQ />
      </main>

      <CustomerFooter />
    </div>
  );
}

export default CustomerHome;