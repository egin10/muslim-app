import { useEffect, useState } from "react";
import { MainContent } from "./main_content";
import { SideBar } from "./sidebar";
import axios from "axios";

const getDataSurah = async (setDataSurah) => {
  try {
    const response = await axios.get("https://api.alquran.cloud/v1/surah");
    setDataSurah(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const QuranPage = () => {
  const [dataSurah, setDataSurah] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataSurah((value) => {
      setDataSurah(value.data);

      setLoading(false);
    });
  }, []);

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* SideBar */}
      <SideBar />

      {/* Main Content */}
      {loading ? (
        <div className="w-[85vw] h-full flex items-center justify-center text-md text-primary">
          Get data surah...
        </div>
      ) : (
        <MainContent dataSurah={dataSurah} />
      )}
    </div>
  );
};
