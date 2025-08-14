import { Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPartner from "./pages/PartnerPages/LoginPartner";
import LoginAdmin from "./pages/AdminPages/LoginAdmin";
import AdminManagement from "./pages/AdminPages/AdminManagement";
import PartnerService from "./pages/PartnerPages/PartnerService";
import PartnerFinance from "./pages/PartnerPages/PartnerFinance";
import PartnerBooking from "./pages/PartnerPages/PartnerBooking";
import PartnerDashboard from "./pages/PartnerPages/PartnerDashboard";
import PartnerProfile from "./pages/PartnerPages/PartnerProfile";
import PartnerMessaging from "./pages/PartnerPages/PartnerMessaging";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import AdminVoucher from "./pages/AdminPages/AdminVoucher";
import AdminProfile from "./pages/AdminPages/AdminProfile";
import PartnerLayout from "./pages/PartnerPages/PartnerLayout";
import PartnerRentalRegistration from "./pages/PartnerPages/PartnerRentalRegistration";
import PartnerTourRegistration from "./pages/PartnerPages/PartnerTourRegistration";
import PartnerCarRentalRegistration from "./pages/PartnerPages/PartnerCarRentalRegistration";
import PartnerPromotion from "./pages/PartnerPages/PartnerPromotion";
import PartnerServiceDetails from "./pages/PartnerPages/PartnerServiceDetails";
import PartnerBookingDetails from "./pages/PartnerPages/PartnerBookingDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPartner />} />
        <Route path="/LoginPartner" element={<LoginPartner />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        {/* <Route element={<Layout />}> */}
        <Route path="/AdminManagement" element={<AdminManagement />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminVoucher" element={<AdminVoucher />} />
        <Route path="/AdminProfile" element={<AdminProfile />} />
        {/* </Route> */}
        <Route element={<PartnerLayout />}>
          <Route path="/PartnerDashboard" element={<PartnerDashboard />} />
          <Route path="/PartnerService" element={<PartnerService />} />
          <Route
            path="/PartnerService/rental"
            element={<PartnerRentalRegistration />}
          />
          <Route
            path="/PartnerService/tour"
            element={<PartnerTourRegistration />}
          />
          <Route
            path="/PartnerService/car"
            element={<PartnerCarRentalRegistration />}
          />
          <Route
            path="/PartnerService/detail"
            element={<PartnerServiceDetails />}
          />
          <Route path="/PartnerFinance" element={<PartnerFinance />} />
          <Route path="/PartnerBooking" element={<PartnerBooking />} />
          <Route
            path="/PartnerBookingDetails"
            element={<PartnerBookingDetails />}
          />
          <Route path="/PartnerProfile" element={<PartnerProfile />} />
          <Route path="/PartnerPromotion" element={<PartnerPromotion />} />
          <Route path="/PartnerMessaging" element={<PartnerMessaging />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
