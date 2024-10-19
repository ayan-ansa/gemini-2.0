import { RiImageAddFill } from "react-icons/ri";
import { PiMicrophoneBold } from "react-icons/pi";
import { LuSendHorizonal } from "react-icons/lu";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Form({ handleSubmit, query, setQuery }) {
  const [isListening, setIsListening] = useState(false);
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  function startSpeechRecognition() {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({
        language: "en-US",
      });
      setIsListening((prev) => !prev);
    } else {
      alert("Browser does not support speech recognition");
    }
  }

  useEffect(() => {
    if (transcript) {
      setQuery(transcript);
      setIsListening(false);
      SpeechRecognition.stopListening();
    }
  }, [transcript]);

  return (
    <form
      className={`flex justify-between bg-[#232527] rounded-full ${
        isListening ? "pl-4 pr-[14px] py-[10px]" : "px-4 py-3"
      }`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a prompt here"
        className="flex-1 pr-3 py-1 outline-none bg-[#232527]"
      />
      <div className={`flex items-center ${isListening ? "gap-2" : "gap-3"}`}>
        <RiImageAddFill className="text-xl cursor-pointer" />
        {query.length > 0 ? (
          <button type="submit" className="outline-none">
            <LuSendHorizonal className="text-xl" />
          </button>
        ) : (
          <div
            onClick={startSpeechRecognition}
            className={`cursor-pointer ${
              isListening ? "animate-pulse rounded-full p-2 bg-[#004A77]" : ""
            }`}
          >
            <PiMicrophoneBold className="text-xl" />
          </div>
        )}
      </div>
    </form>
  );
}

export default Form;
