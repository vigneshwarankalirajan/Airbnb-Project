function CustomerFooter() {
  const footerColumns = [
    {
      title: "Support",
      links: [
        "Help Centre",
        "AirCover",
        "Supporting people with disabilities",
        "Cancellation options",
        "Our COVID-19 Response",
        "Report a neighbourhood concern",
      ],
    },
    {
      title: "Community",
      links: [
        "Airbnb.org: disaster relief housing",
        "Combating discrimination",
      ],
    },
    {
      title: "Hosting",
      links: [
        "Airbnb your home",
        "AirCover for Hosts",
        "Explore hosting resources",
        "Visit our community forum",
        "How to host responsibly",
      ],
    },
    {
      title: "Airbnb",
      links: [
        "Newsroom",
        "Learn about new features",
        "Letter from our founders",
        "Careers",
        "Investors",
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#142144]">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12">

        {/* FOOTER CONTENT */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {footerColumns.map((column) => (
            <div key={column.title}>

              {/* TITLE */}
              <h3 className="text-[14px] font-semibold text-white">
                {column.title}
              </h3>

              {/* LINKS */}
              <div className="mt-5 space-y-4">
                {column.links.map((link) => (
                  <button
                    key={link}
                    type="button"
                    className="
                      block
                      text-left
                      text-[14px]
                      leading-5
                      text-gray-300
                      transition-colors
                      duration-200
                      hover:text-white
                    "
                  >
                    {link}
                  </button>
                ))}
              </div>

            </div>
          ))}

        </div>

        {/* BOTTOM FOOTER */}
        <div className="mt-10 border-t border-white/20 pt-6">

          <div
            className="
              flex
              flex-col
              gap-4
              text-sm
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            {/* COPYRIGHT */}
            <p className="text-gray-300">
              © 2026 Airbnb Luxury. All rights reserved.
            </p>

            {/* FOOTER OPTIONS */}
            <div className="flex flex-wrap gap-5">

              <button
                type="button"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Privacy
              </button>

              <button
                type="button"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Terms
              </button>

              <button
                type="button"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Sitemap
              </button>

              <button
                type="button"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Help
              </button>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default CustomerFooter;