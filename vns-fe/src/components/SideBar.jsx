import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-25 bg-slate-700 text-white h-screen flex flex-col items-center py-4">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-slate-600 w-12 h-12 rounded-lg flex items-center justify-center mb-2">
          <span className="text-sm font-medium">MT</span>
        </div>
        <span className="text-sm font-bold text-gray-300">Minh Tri</span>
      </div>

      <div className="flex flex-col space-y-4 w-full items-center">
        <NavLink
          to="/PartnerBooking"
          className={({ isActive }) =>
            `flex flex-col items-center space-y-2 w-full py-3 rounded-lg transition-colors duration-200 ${
              isActive ? "bg-primary" : "hover:bg-slate-600"
            }`
          }
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Booking</span>
        </NavLink>

        <NavLink
          to="/PartnerService"
          className={({ isActive }) =>
            `flex flex-col items-center space-y-2 w-full py-3 rounded-lg transition-colors duration-200 ${
              isActive ? "bg-primary" : "hover:bg-slate-600"
            }`
          }
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Service</span>
        </NavLink>

        <NavLink
          to="/PartnerFinance"
          className={({ isActive }) =>
            `flex flex-col items-center space-y-2 w-full py-3 rounded-lg transition-colors duration-200 ${
              isActive ? "bg-primary" : "hover:bg-slate-600"
            }`
          }
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Financial</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
