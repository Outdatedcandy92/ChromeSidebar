import { API_KEY } from './config.js';
import { GoogleGenerativeAI } from "@google/generative-ai";


// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
// The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const chat = model.startChat({
    history: [
    {
        role: "user",
        parts: [{ text: "Hello, You are my study assistant." }],
    },
    {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
    ],
    generationConfig: {
    },
});



async function sendPrompt() {
const prompt = document.getElementById('promptInput').value; // Get the entered prompt
if (!prompt) return; // Do nothing if the prompt is empty

try {
  const chat = model.startChat({
    history: [],
    generationConfig: {},
  });

  const result = await chat.sendMessageStream(prompt);
  let text = '';
  const responseaiElement = document.getElementById('responseai');
  for await (const chunk of result.stream) {
    const chunkText = await chunk.text();
    console.log(chunkText);
    text += chunkText;
    responseaiElement.innerText += chunkText;
  }
} catch (error) {
  console.error("Error sending message to Google Generative AI:", error);
}
}

// Add event listener to the submit button
document.getElementById('submitPrompt').addEventListener('click', sendPrompt);


}

run();
