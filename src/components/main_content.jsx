import { SideBar } from "./sidebar";

/* eslint-disable react/prop-types */
export const MainContent = ({ children }) => {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* SideBar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex flex-col w-[85vw] h-full p-4">{children}</div>
    </div>
  );
};
