import gemini_logo from "../../assets/gemini_logo1.svg";
import user from "../../assets/user.png";

function SearchResult({ prompt, response }) {
  const formatText = (res, idx) => {
    if (res.startsWith("**") && res.endsWith("**")) {
      const boldText = res.slice(2, -2);
      return (
        <p key={idx}>
          <b>{boldText}</b>
        </p>
      );
    } else {
      return <p key={idx}>{res.replaceAll("**", "").replaceAll("*", "•")}</p>;
    }
  };

  return (
    <div className="flex flex-col media960:gap-8 gap-1">
      <div
        id="title"
        className="flex media960:items-center media960:flex-row flex-col gap-4 mb-3"
      >
        <img src={user} alt="" className="w-9 rounded-full" />
        <p className="font-medium">{prompt}</p>
      </div>
      <div
        id="prompt-result"
        className="flex items-start media960:flex-row flex-col gap-4"
      >
        <img src={gemini_logo} alt="" className="w-8" />
        <div className="flex flex-col gap-2">
          {response.split("\n").map((res, idx) => formatText(res, idx))}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
