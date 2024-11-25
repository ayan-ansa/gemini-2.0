import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40, //before: 64
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,

    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export default run;
