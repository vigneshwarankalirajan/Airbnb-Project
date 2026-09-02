// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   CheckCircle,
//   Loader2,
//   Home,
//   DollarSign,
//   CalendarDays,
//   Image as ImageIcon,
//   Wifi,
// } from "lucide-react";

// import {
//   getProperty,
//   updateProperty,
// } from "../../api/hostApi";

// function ReviewPublish() {
//   const navigate = useNavigate();

//   const propertyId =
//     sessionStorage.getItem(
//       "host_property_id"
//     );

//   const [property, setProperty] =
//     useState(null);

//   const [pricing, setPricing] =
//     useState(null);

//   const [availability, setAvailability] =
//     useState(null);

//   const [images, setImages] =
//     useState([]);

//   const [amenities, setAmenities] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [publishing, setPublishing] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       /* PROPERTY */

//       if (!propertyId) {
//         throw new Error(
//           "Property ID is missing."
//         );
//       }

//       const propertyResponse =
//         await getProperty(propertyId);

//       setProperty(propertyResponse);

//       /* PRICING */

//       const savedPricing =
//         sessionStorage.getItem(
//           "host_pricing"
//         );

//       if (savedPricing) {
//         setPricing(
//           JSON.parse(savedPricing)
//         );
//       }

//       /* AVAILABILITY */

//       const savedAvailability =
//         sessionStorage.getItem(
//           "host_availability"
//         );

//       if (savedAvailability) {
//         setAvailability(
//           JSON.parse(savedAvailability)
//         );
//       }

//       /* IMAGES */

//       const savedImages =
//         sessionStorage.getItem(
//           "host_property_images"
//         );

//       if (savedImages) {
//         setImages(
//           JSON.parse(savedImages)
//         );
//       }

//       /* AMENITIES */

//       const savedAmenities =
//         sessionStorage.getItem(
//           "host_selected_amenities"
//         );

//       if (savedAmenities) {
//         setAmenities(
//           JSON.parse(savedAmenities)
//         );
//       }

//     } catch (err) {
//       console.error(
//         "REVIEW LOAD ERROR:",
//         err
//       );

//       setError(
//         err?.response?.data?.detail ||
//           err?.message ||
//           "Unable to load review data."
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePublish = async () => {
//     if (!propertyId) {
//       setError(
//         "Property ID is missing."
//       );
//       return;
//     }

//     try {
//       setPublishing(true);
//       setError("");

//       const payload = {
//         ...property,
//         status: "active",
//       };

//       const result =
//         await updateProperty(
//           propertyId,
//           payload
//         );

//       console.log(
//         "PROPERTY PUBLISHED:",
//         result
//       );

//       sessionStorage.removeItem(
//         "host_property_id"
//       );

//       sessionStorage.removeItem(
//         "host_property"
//       );

//       sessionStorage.removeItem(
//         "host_pricing"
//       );

//       sessionStorage.removeItem(
//         "host_availability"
//       );

//       sessionStorage.removeItem(
//         "host_property_images"
//       );

//       sessionStorage.removeItem(
//         "host_selected_amenities"
//       );

//       navigate(
//         `/property-details/${propertyId}`,
//         {
//           state: {
//             property: result,
//             published: true,
//           },
//         }
//       );

//     } catch (err) {
//       console.error(
//         "PUBLISH ERROR:",
//         err
//       );

//       setError(
//         err?.response?.data?.detail ||
//           err?.response?.data?.message ||
//           err?.message ||
//           "Unable to publish property."
//       );

//     } finally {
//       setPublishing(false);
//     }
//   };

//   /* LOADING */

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">

//         <div className="text-center">

//           <Loader2
//             size={40}
//             className="mx-auto animate-spin text-[#123d78]"
//           />

//           <p className="mt-4 text-gray-500">
//             Loading property review...
//           </p>

//         </div>

//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fafafa]">

//       {/* HEADER */}

//       <header className="border-b bg-white">

//         <div className="mx-auto max-w-5xl px-6 py-5">

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/become-host/availability"
//               )
//             }
//             className="flex items-center gap-2 text-sm font-semibold"
//           >
//             <ArrowLeft size={18} />
//             Back
//           </button>

//         </div>

//       </header>

//       {/* MAIN */}

//       <main className="mx-auto max-w-4xl px-6 py-10">

//         <p className="text-sm font-bold uppercase tracking-widest text-[#e61e4d]">
//           Final Step
//         </p>

//         <h1 className="mt-2 text-3xl font-bold">
//           Review & Publish
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Review your listing before publishing.
//         </p>

//         {error && (
//           <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         {/* PROPERTY CARD */}

//         <section className="mt-8 overflow-hidden rounded-3xl border bg-white">

//           {images.length > 0 && (
//             <img
//               src={images[0]?.image_url}
//               alt={
//                 property?.title ||
//                 "Property"
//               }
//               className="h-72 w-full object-cover"
//             />
//           )}

//           <div className="p-6">

//             <div className="flex items-start justify-between gap-4">

//               <div>

//                 <h2 className="text-2xl font-bold">
//                   {property?.title ||
//                     "Your Property"}
//                 </h2>

//                 <p className="mt-2 text-gray-500">
//                   {property?.city || "-"},{" "}
//                   {property?.state || "-"}
//                 </p>

//               </div>

//               <span className="rounded-full bg-yellow-50 px-4 py-2 text-xs font-bold text-yellow-700">
//                 Draft
//               </span>

//             </div>

//             <p className="mt-5 leading-7 text-gray-600">
//               {property?.description ||
//                 "No description available."}
//             </p>

//           </div>

//         </section>

//         {/* SUMMARY */}

//         <div className="mt-6 grid gap-5 sm:grid-cols-2">

//           <SummaryCard
//             icon={<Home size={21} />}
//             title="Property Type"
//             value={
//               property?.property_type ||
//               "-"
//             }
//           />

//           <SummaryCard
//             icon={<DollarSign size={21} />}
//             title="Base Price"
//             value={
//               pricing?.base_price
//                 ? `₹${Number(
//                     pricing.base_price
//                   ).toLocaleString("en-IN")}`
//                 : "-"
//             }
//           />

//           <SummaryCard
//             icon={<CalendarDays size={21} />}
//             title="Availability"
//             value={
//               availability
//                 ? `${availability.available_from} → ${availability.available_to}`
//                 : "-"
//             }
//           />

//           <SummaryCard
//             icon={<ImageIcon size={21} />}
//             title="Photos"
//             value={`${images.length} photos`}
//           />

//           <SummaryCard
//             icon={<Wifi size={21} />}
//             title="Amenities"
//             value={`${amenities.length} selected`}
//           />

//           <SummaryCard
//             icon={<Home size={21} />}
//             title="Maximum Guests"
//             value={
//               property?.max_guests ||
//               "-"
//             }
//           />

//         </div>

//         {/* PUBLISH */}

//         <section className="mt-8 rounded-3xl border bg-white p-6">

//           <div className="flex items-start gap-4">

//             <CheckCircle
//               size={25}
//               className="mt-1 shrink-0 text-green-600"
//             />

//             <div>

//               <h3 className="font-bold">
//                 Everything looks good?
//               </h3>

//               <p className="mt-1 text-sm leading-6 text-gray-500">
//                 Publish your property to make it
//                 available for guests.
//               </p>

//             </div>

//           </div>

//           <button
//             type="button"
//             onClick={handlePublish}
//             disabled={publishing}
//             className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e61e4d] px-6 py-4 font-semibold text-white disabled:opacity-60"
//           >

//             {publishing ? (
//               <>
//                 <Loader2
//                   size={20}
//                   className="animate-spin"
//                 />
//                 Publishing...
//               </>
//             ) : (
//               "Publish Property"
//             )}

//           </button>

//         </section>

//       </main>

//     </div>
//   );
// }

// function SummaryCard({
//   icon,
//   title,
//   value,
// }) {
//   return (
//     <div className="flex items-center gap-4 rounded-2xl border bg-white p-5">

//       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#123d78]">
//         {icon}
//       </div>

//       <div className="min-w-0">

//         <p className="text-xs text-gray-500">
//           {title}
//         </p>

//         <p className="mt-1 break-words font-bold text-gray-900">
//           {value}
//         </p>

//       </div>

//     </div>
//   );
// }

// export default ReviewPublish;