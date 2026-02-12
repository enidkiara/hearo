const captions = document.getElementById("captions");
const toneDiv = document.getElementById("tone");
const languageSelect = document.getElementById("language");

let recognition;
let toneTimeout;
let isStarted = false;

async function fetchTone(text) {
  try {
    const res = await fetch("/analyze-tone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    toneDiv.textContent = "Tone: " + data.tone;
  } catch (err) {
    console.error("Tone fetch failed:", err);
  }
}

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

    clearTimeout(toneTimeout);
    toneTimeout = setTimeout(() => fetchTone(text), 800);
  };

  rec.onerror = (e) => {
    console.error("Speech recognition error:", e);
    if (e.error === "not-allowed") {
      captions.textContent = "Microphone access denied. Please allow mic and refresh.";
    }
  };

  rec.onend = () => {
    if (isStarted) {
      try { rec.start(); } catch (err) {}
    }
  };

  return rec;
}

languageSelect.addEventListener("change", () => {
  if (recognition) {
    isStarted = false;
    recognition.stop();
    setTimeout(() => {
      recognition = createRecognition(languageSelect.value);
      isStarted = true;
      recognition.start();
      captions.textContent = "Listening in " + languageSelect.options[languageSelect.selectedIndex].text + "…";
    }, 300);
  }
});

document.body.addEventListener(
  "click",
  () => {
    if (!recognition) {
      recognition = createRecognition(languageSelect.value);
      isStarted = true;
      recognition.start();
      captions.textContent = "Listening…";
    }
  },
  { once: true }
);