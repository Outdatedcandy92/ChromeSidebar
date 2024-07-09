import { API_KEY } from './config.js';
import { GoogleGenerativeAI } from "./gemini.js";

function scrollToBottom() {
    const responseaiElement = document.getElementById('responseai');
    responseaiElement.scrollTop = responseaiElement.scrollHeight;
  }

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
  const result = await chat.sendMessageStream(prompt);
  let text = '';
  const responseaiElement = document.getElementById('responseai');
  responseaiElement.innerText += '🤖:\n'
  for await (const chunk of result.stream) {
    const chunkText = await chunk.text();
    console.log(chunkText);
    text += chunkText;
    responseaiElement.innerText += chunkText; // Append AI's response
    scrollToBottom();
  }
} catch (error) {
  console.error("Error sending message to Google Generative AI:", error);
}
}

// Add event listener to the submit button
document.getElementById('promptInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default action to stop form submission or any other unwanted behavior
      sendPrompt(); // Call the sendPrompt function
      document.getElementById('responseai').innerText += `You:\n ${document.getElementById('promptInput').value}\n`;
      document.getElementById('promptInput').value = ''; // Clear the input field using direct reference
    }
  });
  

}


run();
