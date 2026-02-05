const captions = document.getElementById("captions");
const toneDiv = document.getElementById("tone");
const languageSelect = document.getElementById("language");

// Variables

let recognition;
const sentiment = new Sentiment();


// Create Speech Recognition

function createRecognition(lang) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    captions.textContent = "Speech recognition not supported in this browser.";
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

    if (!text.trim()) return;

    captions.textContent = text;

    const clean = text.toLowerCase().replace(/[^\w\s]/g, "");
    const result = sentiment.analyze(clean);

    let tone = "Neutral";
    if (result.score > 0) tone = "Positive / Happy";
    else if (result.score < 0) tone = "Negative / Upset";

    toneDiv.textContent = "Tone: " + tone;
  };

  rec.onerror = (e) => console.error("Speech recognition error:", e);

  rec.onend = () => {
    console.log("Recognition ended, restarting...");
    rec.start();
  };

  return rec;
}

// Language change

languageSelect.addEventListener("change", () => {
  if (recognition) recognition.stop();
  recognition = createRecognition(languageSelect.value);
  recognition.start();
});

// Initialize on click

document.body.addEventListener(
  "click",
  () => {
    if (!recognition) {
      recognition = createRecognition(languageSelect.value);
      recognition.start();
      console.log("Speech recognition started");
    }
  },
  { once: true }
);
