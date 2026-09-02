import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Customer Pages
import CustomerHome from "./Pages/CustomerHome";
import Properties from "./Pages/Properties/Properties";
import Categories from "./Pages/Categories/Categories";
import CategoryProperties from "./Pages/CategoryProperties/CategoryProperties";
import Search from "./Pages/search/Search";

import Login from "./Pages/Login/Login";
import EmailLogin from "./Pages/Login/EmailLogin";
import Register from "./Pages/Register/Register";

import PropertyDetails from "./Pages/PropertyDetails/PropertyDetails";

import Booking from "./Pages/Booking/Booking";
import BookingConfirmation from "./Pages/Booking/BookingConfirmation";

import Message from "./Pages/Messages/Message";

// Location / Map
import Location from "./Pages/Location/Location";

// // Host Pages
import BecomeHost from "./Pages/BecomeHost/BecomeHost";
import HostPropertyDetails from "./Pages/BecomeHost/HostPropertyDetails";
import HostPricing from "./Pages/BecomeHost/HostPricing";
import HostAvailability from "./Pages/BecomeHost/HostAvailability";

import HostAmenities from "./Pages/BecomeHost/HostAmenities";
import HostPropertyImages from "./Pages/BecomeHost/HostPropertyImages";
// import ReviewPublish from "./Pages/BecomeHost/ReviewPublish";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================================
            CUSTOMER HOME
        ================================= */}
        <Route
          path="/"
          element={<CustomerHome />}
        />

        {/* ================================
            PROPERTIES
        ================================= */}
        <Route
          path="/properties"
          element={<Properties />}
        />

        {/* ================================
            CATEGORIES
        ================================= */}
        <Route
          path="/categories"
          element={<Categories />}
        />

        {/* ================================
            CATEGORY PROPERTIES
        ================================= */}
        <Route
          path="/category-properties"
          element={<CategoryProperties />}
        />

        {/* ================================
            SEARCH
        ================================= */}
        <Route
          path="/search"
          element={<Search />}
        />

        {/* ================================
            PROPERTY DETAILS
        ================================= */}
        <Route
          path="/property-details/:id"
          element={<PropertyDetails />}
        />

        {/* ================================
            BOOKING
        ================================= */}
        <Route
          path="/booking/:id"
          element={<Booking />}
        />

        {/* ================================
            BOOKING CONFIRMATION
        ================================= */}
        <Route
          path="/booking-confirmation/:bookingId"
          element={<BookingConfirmation />}
        />

        {/* ================================
            LOGIN
        ================================= */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* ================================
            EMAIL LOGIN
        ================================= */}
        <Route
          path="/login/email"
          element={<EmailLogin />}
        />

        {/* ================================
            REGISTER
        ================================= */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================================
            MESSAGES
        ================================= */}
        <Route
          path="/messages"
          element={<Message />}
        />

        {/* ================================
            LOCATION / MAP
        ================================= */}
        <Route
          path="/location"
          element={<Location />}
        />

        {/* ================================
            BECOME HOST
        ================================= */}
        <Route
          path="/become-host"
          element={<BecomeHost />}
        />

        {/* ================================
            HOST PROPERTY
        ================================= */}
        <Route
          path="/become-host/property"
          element={<HostPropertyDetails />}
        />

        {/* ================================
            HOST AMENITIES
        ================================= */}
        
        <Route
          path="/become-host/amenities"
          element={<HostAmenities />}
        />
       

        {/* ================================
            HOST IMAGES
        ================================= */}
        
        <Route
            path="/become-host/images"
            element={<HostPropertyImages />}
          />
       

        {/* ================================
            HOST PRICING
        ================================= */}
        <Route
          path="/become-host/pricing"
          element={<HostPricing />}
        />

        {/* ================================
            HOST AVAILABILITY
        ================================= */}
        <Route
          path="/become-host/availability"
          element={<HostAvailability />}
        />

        {/* ================================
            REVIEW PUBLISH
        ================================= */}
        
        {/* <Route
          path="/become-host/review"
          element={<ReviewPublish />}
        /> */}
       

      </Routes>
    </BrowserRouter>
  );
}

export default App;