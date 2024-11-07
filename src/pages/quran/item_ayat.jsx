import { replaceToArabicNumerals } from "../../utils";

/* eslint-disable react/prop-types */
export const ItemAyat = (props) => {
  const { ayah } = props;

  const setBookMark = (ayah) => {
    console.log(ayah);
  };

  return (
    <div className="border-b border-b-gray-300 p-2 hover:bg-gray-100 relative">
      {/* Arabic */}
      <div className="w-full flex text-right justify-between text-black text-4xl leading-loose">
        <span className="text-xl flex gap-1 items-center w-10">
          <img src="marker.png" alt="marker" className="h-8 w-8" />
          {replaceToArabicNumerals(`${ayah.numberInSurah}`)}
        </span>
        <span className="ml-5">{ayah.text}</span>
      </div>

      <img
        src="bookmark.png"
        alt="bookmark"
        className="h-6 w-6 absolute right-0 bottom-[-15px] bg-white cursor-pointer"
        onClick={() => setBookMark(ayah)}
      />
    </div>
  );
};
