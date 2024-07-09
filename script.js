let userName;
let APIKEYValue;
let defaultPromptValue;
let modelTypeValue;

import { GoogleGenerativeAI } from "./gemini.js";

const config = localStorage.getItem('config');


console.log(config);
if (config) {
  // Parse it into an object
  const Obj = JSON.parse(config);

  // Access the name property
  const name = Obj.name;
  const APIKEY = Obj.APIKEY;
  const defaultPrompt = Obj.prompt;
  const modelType = Obj.modelType;

  


  if (name) {
    console.log(name); 
    userName = name;
  } else {
    console.log('Name is empty.');
    userName = 'You';
  }
  if (APIKEY) {
    console.log(APIKEY);
    APIKEYValue = APIKEY;
  } else {
    console.log('APIKEY is empty.');

  }
  if (defaultPrompt) {
    console.log(defaultPrompt);
    defaultPromptValue = defaultPrompt;
  } else {
    console.log('Default prompt is empty.');
    defaultPromptValue = 'Hello, You are my study assistant.';
  }

  if (modelType) {
    console.log(modelType);
    modelTypeValue = modelType;
  } else {
    console.log('Model type is empty.');
    modelTypeValue = 'gemini-1.5-flash';
  }
} else {
  console.log('No config found in localStorage.');
}


function scrollToBottom() {
    const responseaiElement = document.getElementById('responseai');
    responseaiElement.scrollTop = responseaiElement.scrollHeight;
  }

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(APIKEYValue);

async function run() {
// The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
const model = genAI.getGenerativeModel({ model: modelTypeValue});

const chat = model.startChat({
    history: [
    {
        role: "user",
        parts: [{ text: defaultPromptValue }],
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
      document.getElementById('responseai').innerText += `${userName}\n ${document.getElementById('promptInput').value}\n`;
      document.getElementById('promptInput').value = ''; // Clear the input field using direct reference
    }
  });
  

}


run();
