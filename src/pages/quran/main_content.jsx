import { ItemAyat } from "./item_ayat";

export const MainContent = () => {
  return (
    <div className="flex flex-col w-[85vw] h-full p-4 text-primary">
      {/* Search Box */}
      <div className="w-full flex rounded-md relative items-center">
        <input
          type="text"
          placeholder="Search..."
          className="text-sm p-2 w-full rounded-md border border-primary text-white"
        />
        <img
          src="search.png"
          alt="search"
          className="h-5 w-5 absolute right-4"
        />
      </div>

      {/* List Surah */}
      <div className="h-fit w-full flex overflow-y-hidden overflow-x-auto my-4 gap-3 scroll-smooth pb-2 border-b border-b-primary hide-scroll">
        {Array.from(Array(114)).map((index) => (
          <button
            key={index}
            type="button"
            className="px-4 py-2 text-sm rounded-md border-primary border hover:bg-primary hover:text-white min-w-max"
          >
            Surah 1
          </button>
        ))}
      </div>

      {/* Selected Surah */}
      <div className="w-full flex justify-between border-b border-b-primary p-2 bg-primary text-white">
        <h2>Surah Name</h2>

        <div>3 Ayat, Mekkah</div>
      </div>

      {/* List Ayat */}
      <div className="w-full flex flex-col my-4 h-[85vh] overflow-x-hidden overflow-y-auto">
        {Array.from(Array(15)).map((index) => (
          <ItemAyat key={index} />
        ))}
      </div>
    </div>
  );
};
