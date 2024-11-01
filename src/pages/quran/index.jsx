import { MainContent } from "./main_content";
import { SideBar } from "./sidebar";

export const QuranPage = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* SideBar */}
      <SideBar />

      {/* Main Content */}
      <MainContent />
    </div>
  );
};
