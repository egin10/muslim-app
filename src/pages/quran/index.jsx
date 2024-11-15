import { useEffect, useState } from "react";
import axios from "axios";
import { Content } from "./content";
import { MainContent } from "../../components/main_content";

const getDataSurah = async (setDataSurah) => {
  try {
    const response = await axios.get("https://api.alquran.cloud/v1/surah");
    setDataSurah(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const QuranPage = () => {
  // DATA SURAH
  const [dataSurah, setDataSurah] = useState([]);
  const [loadingSurah, setLoadingSurah] = useState(true);

  // GET DATA SURAH
  useEffect(() => {
    getDataSurah((value) => {
      setDataSurah(value.data);

      setLoadingSurah(false);
    });
  }, []);

  return (
    <MainContent>
      {/* Main Content */}
      {loadingSurah ? (
        <div className="w-[85vw] h-full flex items-center justify-center text-md text-primary">
          Get data surah...
        </div>
      ) : (
        <Content dataSurah={dataSurah} />
      )}
    </MainContent>
  );
};
