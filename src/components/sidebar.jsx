import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="bg-primary h-full w-[15vw] p-4 relative">
      <div className="w-full flex items-center gap-2">
        <img
          src="logo.png"
          alt="logo"
          className="h-12 w-12 bg-white p-2.5 rounded-full"
        />
        <h4 className="text-xl">Muslim App</h4>
      </div>
      {/* Menu */}
      <div className="w-full flex flex-col my-5 gap-3">
        <Link
          to={"/quran"}
          type="button"
          className="text-center border border-white text-white rounded-md py-1 hover:bg-white hover:text-primary"
        >
          Quran
        </Link>
        <Link
          to={"/bookmark"}
          type="button"
          className="text-center border border-white text-white rounded-md py-1 hover:bg-white hover:text-primary"
        >
          Bookmarks
        </Link>
      </div>
      {/* Copyright */}
      <div className="absolute bottom-2 left-2 text-xs">@Ginsebu</div>
    </div>
  );
};
