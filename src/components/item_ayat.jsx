/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { replaceToArabicNumerals } from "../utils";

/* eslint-disable react/prop-types */
export const ItemAyat = (props) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const { ayah, updateBookmark } = props;

  const setBookMark = (ayah) => {
    const listBookmark = localStorage.getItem("bookmark-ayah");

    if (listBookmark) {
      const listAyah = JSON.parse(listBookmark);

      if (listAyah.length > 0) {
        const findAyah = listAyah.filter(
          (data) => data.text === ayah.text && data.number === ayah.number
        );

        // if ayah is exist then remove
        if (findAyah.length > 0) {
          const updateList = listAyah.filter(
            (data) => data.text !== ayah.text && data.number !== ayah.number
          );
          localStorage.setItem("bookmark-ayah", JSON.stringify(updateList));

          setIsBookmark(false);
        } else {
          const updateList = [...listAyah, ayah];
          localStorage.setItem("bookmark-ayah", JSON.stringify(updateList));

          setIsBookmark(true);
        }
      } else {
        localStorage.setItem("bookmark-ayah", JSON.stringify([ayah]));
        setIsBookmark(true);
      }
    } else {
      localStorage.setItem("bookmark-ayah", JSON.stringify([ayah]));
      setIsBookmark(true);
    }

    if (updateBookmark) updateBookmark();
  };

  const isInBookmark = (ayah) => {
    const listBookmark = localStorage.getItem("bookmark-ayah");

    if (listBookmark) {
      const listAyah = JSON.parse(listBookmark);

      const findAyah = listAyah.filter(
        (data) => data.text === ayah.text && data.number === ayah.number
      );
      if (findAyah.length > 0) return true;
    }

    return false;
  };

  useEffect(() => setIsBookmark(isInBookmark(ayah)), []);

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
        src={
          isBookmark || isInBookmark(ayah)
            ? "bookmark-active.png"
            : "bookmark.png"
        }
        alt="bookmark"
        className="h-6 w-6 absolute right-0 bottom-[-15px] bg-white cursor-pointer"
        onClick={() => setBookMark(ayah)}
      />
    </div>
  );
};
