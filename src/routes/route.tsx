import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "@/error/ErrorPage";
import ResetPasswordForm from "@/pages/authentication/NewPassword";
import Login from "@/pages/authentication/Login";
import ForgetPassword from "@/pages/authentication/ForgetPassword";
import VerifyOtp from "@/pages/authentication/VerifyOtp";
import AboutUS from "@/pages/setting/About";
import PrivacyPolicy from "@/pages/setting/PrivacyPolicy";
import TermsCondition from "@/pages/setting/TermsCondition";
import Notifications from "@/pages/notifications/Notifications";
import Profile from "@/pages/profile/Profile";
import EditProfile from "@/pages/profile/EditProfile";
import ChangePassword from "@/pages/profile/ChangePassword";
import Dashboard from "@/pages/dashboard/dashboard/Dashboard";
import User from "@/pages/dashboard/dashboard/User";
import Apartment from "@/pages/dashboard/apartment/Apartment";
import Faq from "@/pages/faq/FAQ";
import Subscriptions from "@/pages/subscriptions/Subscriber";
import ApartmentForm from "@/pages/dashboard/apartment/ApartmentForm";
import ApartmentDetails from "@/pages/dashboard/apartment/ApartmentDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "Subscriber", element: <User /> },
      { path: "ApartmentForm", element: <ApartmentForm /> },

      { path: "apartment", element: <Apartment /> },
      { path: "apartment-details", element: <ApartmentDetails /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "faq", element: <Faq /> },

      { path: "about", element: <AboutUS /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-condition", element: <TermsCondition /> },
      { path: "notifications", element: <Notifications /> },
      { path: "profile", element: <Profile /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  { path: "/new-password", element: <ResetPasswordForm /> },
]);

export default router;
