import {
  CalendarCheck,
  CircleDollarSign,
  HandPlatter,
  LayoutDashboard,
  MessageCircleMore,
  TicketPercent,
} from "lucide-react";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";

const PartnerLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar
        navItems={[
          {
            path: "/PartnerDashboard",
            label: "Dashboard",
            icon: <LayoutDashboard />,
          },
          {
            path: "/PartnerService",
            label: "Service",
            icon: <HandPlatter />,
          },
          {
            path: "/PartnerPromotion",
            label: "Promotion",
            icon: <TicketPercent />,
          },
          {
            path: "/PartnerFinance",
            label: "Finance",
            icon: <CircleDollarSign />,
          },
          {
            path: "/PartnerBooking",
            label: "Booking",
            icon: <CalendarCheck />,
          },
          {
            path: "/PartnerMessaging",
            label: "Messaging",
            icon: <MessageCircleMore />,
          },
        ]}
      />

      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default PartnerLayout;
