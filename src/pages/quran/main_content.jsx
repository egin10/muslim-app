/* eslint-disable react/prop-types */
import { useState } from "react";
import { ItemAyat } from "./item_ayat";
import axios from "axios";

const getDataAyah = async (numberSurah, setDataAyah) => {
  try {
    const response = await axios.get(
      `https://api.alquran.cloud/v1/surah/${numberSurah}/ar.alafasy`
    );
    setDataAyah(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const MainContent = ({ dataSurah }) => {
  const [selectedSurah, setSelectedSurah] = useState({});
  const [dataAyah, setDataAyah] = useState({});

  const [loading, setLoading] = useState(true);

  const selectSurah = (surah) => {
    setSelectedSurah(surah);
    setLoading(true);

    // Call API to get data Ayah by Surah
    getDataAyah(surah.number, (value) => {
      setDataAyah(value.data);
      setLoading(false);
    });
  };

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
        {dataSurah.length > 0 &&
          dataSurah.map((surah, index) => (
            <button
              key={index}
              type="button"
              className={`px-4 py-1 text-sm rounded-md border-primary border hover:bg-primary hover:text-white min-w-max ${
                surah.englishName === selectedSurah.englishName
                  ? "bg-primary text-white"
                  : ""
              }`}
              onClick={() => selectSurah(surah)}
            >
              {surah.englishName}
            </button>
          ))}
      </div>

      {/* Selected Surah */}
      {Object.values(selectedSurah).length > 0 ? (
        <div className="w-full flex justify-between border-b border-b-primary p-2">
          <div className="flex flex-col w-fit">
            <h2 className="text-3xl mb-1">{selectedSurah.name}</h2>
            <span className="text-xl">{selectedSurah.englishName}</span>
          </div>

          <div className="flex flex-col items-end text-xl justify-between">
            <img
              src="play-button.png"
              alt="play-button"
              className="h-5 w-5 cursor-pointer"
            />
            {selectedSurah.numberOfAyahs} Ayah, {selectedSurah.revelationType}
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* List Ayat */}
      {loading ? (
        <div className="w-full flex my-4 h-[85vh] justify-center items-center">
          {Object.values(selectedSurah).length > 0
            ? "Get data ayah..."
            : "Please selecting surah!"}
        </div>
      ) : (
        <div className="w-full flex flex-col my-4 h-[85vh] gap-7 overflow-x-hidden overflow-y-auto">
          {dataAyah &&
            Object.values(dataAyah).length > 0 &&
            dataAyah.ayahs.map((ayah, index) => (
              <ItemAyat key={index} ayah={ayah} />
            ))}
        </div>
      )}
    </div>
  );
};
