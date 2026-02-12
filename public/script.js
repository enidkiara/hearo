const captions = document.getElementById("captions");
const translation = document.getElementById("translation");
const toneDiv = document.getElementById("tone");
const languageSelect = document.getElementById("language");
const translateSelect = document.getElementById("translateTo");
const toggleBtn = document.getElementById("toggleTranslate");

let recognition;
let toneTimeout;
let isStarted = false;
let translateEnabled = false;

toggleBtn.addEventListener("click", () => {
  translateEnabled = !translateEnabled;
  
  if (translateEnabled) {
    toggleBtn.textContent = "Disable Translation";
    translateSelect.style.display = "inline";
    translation.style.display = "block";
  } else {
    toggleBtn.textContent = "Enable Translation";
    translateSelect.style.display = "none";
    translation.style.display = "none";
  }
});

async function translateText(text, targetLang) {
  try {
    const res = await fetch("https://translate.argosopentech.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text"
      })
    });
    const data = await res.json();
    return data.translatedText || text;
  } catch (err) {
    console.error("Translation failed:", err);
    return "[Translation unavailable]";
  }
}

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

  rec.onresult = async (event) => {
    let text = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
    }

    if (!text.trim()) return;

    captions.textContent = text;

    if (translateEnabled) {
      const targetLang = translateSelect.value;
      translation.textContent = "→ Translating...";
      const translated = await translateText(text, targetLang);
      translation.textContent = "→ " + translated;
    }

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
      captions.textContent = "Listening…";
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