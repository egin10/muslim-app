import { useEffect, useState } from "react";
import { MainContent } from "../../components/main_content";
import { ItemAyat } from "../../components/item_ayat";

export const BookmarkPage = () => {
  const [loading, setLoading] = useState(true);
  const [dataAyah, setDataAyah] = useState([]);

  useEffect(() => updateBookmark(), []);

  const updateBookmark = () => {
    const bookmarks = localStorage.getItem("bookmark-ayah");
    if (bookmarks) {
      setLoading(false);
      setDataAyah(JSON.parse(bookmarks));
    }
  };

  return (
    <MainContent>
      {/* List Ayat */}
      {loading ? (
        <div className="w-full flex my-4 h-[85vh] justify-center items-center">
          Get data ayah...
        </div>
      ) : dataAyah.length > 0 ? (
        <div className="w-full flex flex-col my-4 h-[85vh] gap-7 overflow-x-hidden overflow-y-auto">
          {dataAyah &&
            dataAyah.map((ayah, index) => (
              <div key={index}>
                <ItemAyat ayah={ayah} updateBookmark={updateBookmark} />
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full flex my-4 h-[85vh] justify-center items-center">
          Bookmark empty
        </div>
      )}
    </MainContent>
  );
};
