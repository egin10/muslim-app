/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ItemAyat } from "./item_ayat";
import axios from "axios";
import { replaceToArabicNumerals } from "../../utils";

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

  // Audio Player
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const selectSurah = (surah) => {
    setSelectedSurah(surah);
    setLoading(true);

    // Call API to get data Ayah by Surah
    getDataAyah(surah.number, (value) => {
      setDataAyah(value.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (Object.keys(dataAyah).length > 0 && dataAyah.ayahs.length > 0) {
      audioRef.current.src = dataAyah.ayahs[currentTrack]?.audio;

      if (isPlaying) audioRef.current.play();

      // Add event listener for track end
      audioRef.current.addEventListener("ended", handleNextTrack);

      // Clean up event listener on component unmount or when track changes
      return () => {
        audioRef.current.removeEventListener("ended", handleNextTrack);
      };
    }
  }, [currentTrack, dataAyah]);

  const handleNextTrack = () => {
    if (currentTrack < dataAyah.ayahs.length - 1) {
      setCurrentTrack((prev) => prev + 1);
    } else {
      setCurrentTrack(0);
      setIsPlaying(false);
    }
  };

  const selectTrack = (index) => {
    if (Object.keys(dataAyah).length > 0 && index < (dataAyah.ayahs.length - 1) && index > -1) {
      setCurrentTrack(index);
    }
  };

  const stopTrack = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTrack(0);
    setIsPlaying(false);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playTrack = () => {
    audioRef.current.play();
    setIsPlaying(true);
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
              className={`px-4 py-1 text-sm rounded-md border-primary border hover:bg-primary hover:text-white min-w-max ${surah.englishName === selectedSurah.englishName
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
            <div className="flex gap-1">
              <button type="button" className="rounded-full p-1 bg-gray-300" onClick={() => selectTrack(currentTrack - 1)}>
                <img
                  src="next.png"
                  alt="next-button"
                  className="h-5 w-5 cursor-pointer rotate-180"
                />
              </button>
              <button type="button" className="rounded-full p-1 bg-gray-300" onClick={() => isPlaying ? pauseTrack() : playTrack()}>
                <img
                  src={isPlaying ? "pause.png" : "play-button.png"}
                  alt="play-button"
                  className="h-5 w-5 cursor-pointer"
                />
              </button>
              <button type="button" className="rounded-full p-1 bg-gray-300" onClick={stopTrack}>
                <img
                  src="stop.png"
                  alt="stop-button"
                  className="h-5 w-5 cursor-pointer"
                />
              </button>
              <button type="button" className="rounded-full p-1 bg-gray-300" onClick={() => selectTrack(currentTrack + 1)}>
                <img
                  src="next.png"
                  alt="next-button"
                  className="h-5 w-5 cursor-pointer"
                />
              </button>
            </div>
            {replaceToArabicNumerals(`${selectedSurah.numberOfAyahs}`)} Ayah, {selectedSurah.revelationType}
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
              <div key={index} className={`${isPlaying && currentTrack === index ? 'bg-gray-100' : ''}`}>
                <ItemAyat ayah={ayah} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
