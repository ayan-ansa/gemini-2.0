import Header from "../Header/Header";
import gemini_logo from "../../assets/gemini_logo1.svg";
import user from "../../assets/user.png";
import { cardsData } from "../../data";
import run from "../../config/gemini";
import { useState } from "react";
import Form from "./Form";
import SearchResult from "./SearchResult";

function Main({
  isActive,
  setIsActive,
  filteredData,
  setFilteredData,
  isShow,
  setIsShow,
  setItemId,
}) {
  const [query, setQuery] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  // const bottomRef = useRef(null);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
      setIsActive(false);
    }
  });

  const fetchData = async (query) => {
    setLoading(true);
    try {
      const response = await run(query);
      const data = { prompt: query, response, id: crypto.randomUUID() };
      setItemId(data.id);
      localStorage.setItem(
        "searchData",
        JSON.stringify([...searchResult, data])
      );
      setSearchResult((prev) => [...prev, data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length > 0 && filteredData.length > 0) {
      setFilteredData([]);
    }
    if (query.length > 0) {
      setPrompt(query);
      setIsShow(true);
      fetchData(query);
      setQuery("");
    }
  };
  // useEffect(() => {
  //   if (!loading && searchResult.length > 0) {
  //      scrollToBottom();
  //   }
  // }, [searchResult, loading]);

  // const scrollToBottom = () => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  return (
    <main
      className={`h-screen w-full bg-[#131314] text-gray-300 absolute top-0 ${
        isActive
          ? "media960:w-[calc(100%-320px)] media960:left-[320px]"
          : "media960:left-[72px] media960:w-[calc(100%-72px)]"
      }`}
    >
      <Header setIsActive={setIsActive} />
      <div className="max-w-3xl h-[85%] pt-6 px-2 md:px-0 flex flex-col justify-between mx-auto">
        {!isShow ? (
          <div className="flex justify-center h-1/2 lg:h-[65%] items-end">
            <div className="pr-8 hidden lg:block">
              <h1 id="gradient-text" className="text-5xl font-bold mb-3">
                Hello, Dev.
              </h1>
              <h1 className="text-4xl font-bold text-[#565b60]">
                How can I help you today ?
              </h1>
              <div id="card-container" className="grid grid-cols-3 gap-5 mt-12">
                {cardsData.map((card) => (
                  <div
                    key={card.id}
                    className="min-h-40 flex flex-col justify-between p-2 rounded-md bg-[#232527] hover:bg-[#303234] transition ease-in-out duration-300 cursor-pointer"
                  >
                    <h2>{card.title}</h2>
                    <div className="ml-auto">
                      {<card.icon className={`${card.iconColor} text-xl`} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:hidden">
              <h2
                id="gradient-text"
                className="text-[28px] font-medium text-center"
              >
                Hello, Dev.
              </h2>
              <h2 className="text-[28px] text-[#C4C7C5]">How can I help ?</h2>
            </div>
          </div>
        ) : (
          <div
            id="result-container"
            className="flex flex-col gap-16 overflow-y-scroll pb-4 px-2 sm:pr-8"
          >
            {loading ? (
              <div className="flex flex-col gap-8">
                <div id="title" className="flex items-center gap-4 mb-3">
                  <img src={user} alt="" className="w-9 rounded-full" />
                  <p className="font-medium">{prompt}</p>
                </div>
                <div className="flex items-start gap-4 w-full">
                  <img
                    src={gemini_logo}
                    alt="gemini_logo"
                    className="w-8 animate-spin"
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <p className="h-4 animate-loader rounded bg-gradient-to-r from-[#004A77] via-[#ccc]   to-[#004A77]"></p>
                    <p className="h-4 animate-loader rounded bg-gradient-to-r from-[#004A77] via-[#ccc]  to-[#004A77]"></p>
                    <p className="h-4  animate-loader rounded bg-gradient-to-r from-[#004A77] via-[#ccc]  to-[#004A77]"></p>
                  </div>
                </div>
              </div>
            ) : filteredData.length > 0 ? (
              filteredData.map(({ id, prompt, response }) => (
                <SearchResult key={id} prompt={prompt} response={response} />
              ))
            ) : (
              searchResult.length > 0 &&
              searchResult.map(({ id, prompt, response }) => (
                <SearchResult key={id} prompt={prompt} response={response} />
              ))
            )}
            {/* <div ref={bottomRef} /> */}
          </div>
        )}

        <div>
          <Form query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
          <p className="text-xs text-[#ccc] text-center mt-2">
            Gemini can make mistakes, so double-check it
          </p>
        </div>
      </div>
    </main>
  );
}

export default Main;
