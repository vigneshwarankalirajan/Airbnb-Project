import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profilePhoto: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    language: "",
    bio: "",
    terms: false,
    privacy: false,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ================= CHANGE =================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= PHOTO =================

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Profile photo must be less than 5MB.");
      return;
    }

    setError("");

    setFormData((prev) => ({
      ...prev,
      profilePhoto: file,
    }));

    setPhotoPreview(URL.createObjectURL(file));
  };

  // ================= REGISTER =================

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Required fields

    if (!formData.firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }

    if (!formData.lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (!formData.dateOfBirth) {
      setError("Please select your date of birth.");
      return;
    }

    if (!formData.country) {
      setError("Please select your country / region.");
      return;
    }

    if (!formData.terms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    if (!formData.privacy) {
      setError("Please accept the Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      const fullName =
        `${formData.firstName.trim()} ${formData.lastName.trim()}`;

      // ================= API =================

      const response = await register({
        name: fullName,
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim() || null,
        role: "guest",
        status: "active",
      });

      console.log("Register response:", response.data);

      // ================= SAVE USER =================

      const userProfile = {
        id: response.data?.id || null,

        name: fullName,

        firstName: formData.firstName.trim(),

        lastName: formData.lastName.trim(),

        email: formData.email.trim(),

        phone: formData.phone.trim(),

        dateOfBirth: formData.dateOfBirth,

        gender: formData.gender,

        country: formData.country,

        language: formData.language,

        bio: formData.bio,

        profilePhoto: photoPreview,

        rating: null,

        reviews: 0,

        trips: 0,

        yearsOnAirbnb: 0,

        identityVerified: false,

        role: "guest",

        status: "active",
      };

      localStorage.setItem(
        "user",
        JSON.stringify(userProfile)
      );

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/login/email");
      }, 1000);

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      console.log(
        "Status:",
        error.response?.status
      );

      console.log(
        "Backend Response:",
        error.response?.data
      );

      const detail = error.response?.data?.detail;

      // FastAPI validation errors

      if (Array.isArray(detail)) {
        const messages = detail.map((item) => {
          const location = item?.loc || [];

          const field =
            location.length > 0
              ? location[location.length - 1]
              : "field";

          return `${field}: ${item?.msg || "Invalid value"}`;
        });

        setError(messages.join(" | "));
      }

      // Normal backend error

      else if (typeof detail === "string") {
        setError(detail);
      }

      // Unknown error

      else {
        setError(
          "Registration failed. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">

    <div className="w-full max-w-3xl">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Join Airbnb and start exploring
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">

        <form onSubmit={handleRegister}>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                disabled={loading}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300 disabled:bg-gray-100"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                disabled={loading}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300 disabled:bg-gray-100"
              />
            </div>

          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                disabled={loading}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300 disabled:bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                disabled={loading}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300 disabled:bg-gray-100"
              />
            </div>

          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  disabled={loading}
                  className="w-full h-11 rounded-lg border border-gray-300 px-3 pr-11 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={loading}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300 disabled:bg-gray-100"
              />
            </div>

          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
                <span className="ml-1 text-xs text-gray-400">
                  Optional
                </span>
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={loading}
                className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non_binary">Non-binary</option>
                <option value="prefer_not_to_say">
                  Prefer not to say
                </option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country / Region
              </label>

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={loading}
                className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
              >
                <option value="">Select country</option>
                <option value="India">India</option>
                <option value="United States">
                  United States
                </option>
                <option value="United Kingdom">
                  United Kingdom
                </option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Singapore">Singapore</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Language
                <span className="ml-1 text-xs text-gray-400">
                  Optional
                </span>
              </label>

              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                disabled={loading}
                className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
              >
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Hindi">Hindi</option>
                <option value="Telugu">Telugu</option>
                <option value="Malayalam">Malayalam</option>
              </select>
            </div>

          </div>

          {/* Bio + Photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Me / Bio
                <span className="ml-1 text-xs text-gray-400">
                  Optional
                </span>
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="4"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm resize-none outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 disabled:bg-gray-100"
              />
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo
                <span className="ml-1 text-xs text-gray-400">
                  Optional
                </span>
              </label>

              <div className="h-[104px] border border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-4">

                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                  />
                )}

                <label
                  htmlFor="profilePhoto"
                  className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  📷 Upload Photo
                </label>

                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  disabled={loading}
                  className="hidden"
                />

              </div>
            </div>

          </div>

          {/* Terms */}
          <div className="mt-5 space-y-3">

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                disabled={loading}
                className="w-4 h-4"
              />

              <span>
                I agree to{" "}
                <b className="text-gray-900">
                  Terms & Conditions
                </b>
              </span>
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                disabled={loading}
                className="w-4 h-4"
              />

              <span>
                I agree to{" "}
                <b className="text-gray-900">
                  Privacy Policy
                </b>
              </span>
            </label>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mt-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-600">
                {success}
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="mt-6">

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-11
                rounded-lg
                bg-gray-900
                text-white
                text-sm
                font-semibold
                hover:bg-gray-800
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Creating account..."
                : "Create Account / Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/login/email")}
                className="font-semibold text-gray-900 hover:underline"
              >
                Log in
              </button>
            </p>

          </div>

        </form>

      </div>

    </div>
  </div>
);
}

export default Register;