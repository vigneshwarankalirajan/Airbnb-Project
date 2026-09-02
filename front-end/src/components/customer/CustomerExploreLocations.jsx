import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerReveal from "./CustomerReveal";

const locations = [
  {
    name: "Chennai",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=90",
  },
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=90",
  },
  {
    name: "Kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=90",
  },
  {
    name: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=90",
  },
  {
    name: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=90",
  },
];

function CustomerExploreLocations() {
  const navigate = useNavigate();

  const handleLocationClick = (locationName) => {
    console.log("LOCATION CLICKED:", locationName);

    navigate(
      `/destination/${encodeURIComponent(locationName)}`
    );
  };

  return (
    <section className="bg-white py-16">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <CustomerReveal>
          <div>
            <p className="text-sm font-bold tracking-[0.18em] text-[#e61e4d]">
              EXPLORE
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Popular Destinations
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Explore stays in popular destinations
            </p>
          </div>
        </CustomerReveal>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">

          {locations.map((location, index) => (

            <CustomerReveal
              key={location.name}
              delay={index * 0.08}
            >

              <button
                type="button"
                onClick={() =>
                  handleLocationClick(location.name)
                }
                className="
                  group
                  relative
                  h-72
                  w-full
                  cursor-pointer
                  overflow-hidden
                  rounded-[28px]
                  border-0
                  p-0
                  text-left
                  shadow-sm
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-2xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#123d78]
                "
              >

                <img
                  src={location.image}
                  alt={`${location.name} destination`}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/20
                    to-transparent
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-5
                    left-5
                    right-5
                  "
                >

                  <div className="flex items-end justify-between gap-3">

                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {location.name}
                      </h3>

                      <p className="mt-1 text-sm text-white/80">
                        Explore stays
                      </p>
                    </div>

                    <span
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-gray-900
                        shadow-xl
                        opacity-0
                        translate-x-3
                        transition-all
                        duration-300
                        group-hover:translate-x-0
                        group-hover:opacity-100
                      "
                    >
                      <ArrowRight size={18} />
                    </span>

                  </div>

                </div>

              </button>

            </CustomerReveal>

          ))}

        </div>

      </div>

    </section>
  );
}

export default CustomerExploreLocations;