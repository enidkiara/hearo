const captions = document.getElementById("captions");
const toneDiv = document.getElementById("tone");
const languageSelect = document.getElementById("language");

let recognition;

// --------------------
// Create Speech Recognition
// --------------------
function createRecognition(lang) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    captions.textContent = "Speech recognition not supported.";
    return null;
  }

  const rec = new SpeechRecognition();
  rec.continuous = true;
  rec.interimResults = true;
  rec.lang = lang;

  rec.onresult = (event) => {
    let text = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
    }

    captions.textContent = text;

    // --------------------
    // Detect Tone Using Sentiment.js
    // --------------------
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);

    let tone = "Neutral";
    if (result.score > 0) tone = "Positive / Happy";
    else if (result.score < 0) tone = "Negative / Upset";

    toneDiv.textContent = "Tone: " + tone;
  };

  rec.onerror = (e) => console.error("Speech recognition error:", e);
  rec.start();
  return rec;
}

// --------------------
// Language Selection
// --------------------
languageSelect.addEventListener("change", () => {
  if (recognition) recognition.stop();
  recognition = createRecognition(languageSelect.value);
});

// --------------------
// Initialize
// --------------------
function init() {
  // For some browsers, audio will only start after user interacts
  document.body.addEventListener(
    "click",
    () => {
      if (recognition && recognition.start) {
        recognition.start();
        console.log("Speech recognition resumed");
      }
    },
    { once: true }
  );

  recognition = createRecognition(languageSelect.value);
}

init();