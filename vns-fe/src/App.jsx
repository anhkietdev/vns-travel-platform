import { Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPartner from "./pages/PartnerPages/LoginPartner";
import RegisterPartner from "./pages/PartnerPages/RegisterPartner";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPartner />} />
        <Route path="/LoginPartner" element={<LoginPartner />} />
        <Route path="/RegisterPartner" element={<RegisterPartner />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        {/* <Route element={<Layout />}> */}
        <Route path="/AdminManagement" element={<AdminManagement />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminVoucher" element={<AdminVoucher />} />
        <Route path="/AdminProfile" element={<AdminProfile />} />
        {/* </Route> */}
        <Route element={<PartnerLayout />}>
          <Route path="/PartnerService" element={<PartnerService />} />
          <Route path="/PartnerFinance" element={<PartnerFinance />} />
          <Route path="/PartnerBooking" element={<PartnerBooking />} />
          <Route path="/PartnerDashboard" element={<PartnerDashboard />} />
          <Route path="/PartnerProfile" element={<PartnerProfile />} />
          <Route path="/PartnerMessaging" element={<PartnerMessaging />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
