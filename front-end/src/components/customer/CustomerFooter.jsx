function CustomerFooter() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50">
      
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* FOOTER CONTENT */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Airbnb Luxury
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Discover beautiful stays and unforgettable experiences
              wherever you travel.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Company
            </h3>

            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-900">
                About Us
              </p>

              <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-900">
                Careers
              </p>

              <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-900">
                Blog
              </p>

              <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-900">
                Press
              </p>
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Support
            </h3>

            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-900">
                Help Center
              </p>

              <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-900">
                Cancellation
              </p>

              <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-900">
                Safety
              </p>

              <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-900">
                Contact Support
              </p>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Contact
            </h3>

            <div className="mt-4 space-y-3">

              <p className="text-sm text-gray-500">
                Chennai, Tamil Nadu
              </p>

              <p className="text-sm text-gray-500">
                +91 98765 43210
              </p>

              <p className="break-all text-sm text-gray-500">
                support@airbnbluxury.com
              </p>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-10
            border-t
            border-gray-200
            pt-6
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="text-center text-sm text-gray-500 sm:text-left">
            © 2026 Airbnb Luxury. All rights reserved.
          </p>

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-4
              text-sm
              text-gray-500
              sm:justify-end
            "
          >
            <span className="cursor-pointer hover:text-gray-900">
              Privacy
            </span>

            <span className="cursor-pointer hover:text-gray-900">
              Terms
            </span>

            <span className="cursor-pointer hover:text-gray-900">
              Sitemap
            </span>

            <span className="cursor-pointer hover:text-gray-900">
              Help
            </span>
          </div>
        </div>

      </div>

    </footer>
  );
}

export default CustomerFooter;