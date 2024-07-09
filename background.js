chrome.runtime.onInstalled.addListener(function() {
    console.log("Gemini extension installed.");
    // Open a new tab when the extension is installed
    chrome.tabs.create({ url: "setup.html" });
  });