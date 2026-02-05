const captions = document.getElementById("captions");
const toneDiv = document.getElementById("tone");
const languageSelect = document.getElementById("language");

let recognition;
let audioContext;
let analyser;
let dataArray;

// --------------------
// SPEECH RECOGNITION
// --------------------
function createRecognition(lang) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

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
  };

  rec.onerror = (e) => console.error("Speech error:", e);
  rec.start();
  return rec;
}

// --------------------
// AUDIO / TONE ANALYSIS
// --------------------
async function startAudioAnalysis() {
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;

  dataArray = new Uint8Array(analyser.frequencyBinCount);

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);
}

function getAudioStats() {
  analyser.getByteTimeDomainData(dataArray);

  let sum = 0;
  let activity = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const sample = Math.abs(dataArray[i] - 128); // center at 0
    sum += sample;
    if (sample > 20) activity++;
  }

  return {
    volume: sum / dataArray.length,
    activity
  };
}

// --------------------
// UPDATE TONE DISPLAY
// --------------------
function detectTone(volume, activity) {
  if (volume > 40 || activity > 100) return "sounds excited or upset";
  if (volume > 15 || activity > 30) return "sounds neutral";
  return "sounds calm";
}

function startToneLoop() {
  setInterval(() => {
    const { volume, activity } = getAudioStats();

    console.log("volume:", volume.toFixed(2), "activity:", activity);

    const tone = detectTone(volume, activity);
    toneDiv.textContent = "Tone: " + tone;
  }, 200);
}

// --------------------
// LANGUAGE CHANGE
// --------------------
languageSelect.addEventListener("change", () => {
  if (recognition) recognition.stop();
  recognition = createRecognition(languageSelect.value);
});

// --------------------
// INIT
// --------------------
async function init() {
  // resume audio on first user interaction
  document.body.addEventListener(
    "click",
    async () => {
      if (audioContext && audioContext.state === "suspended") {
        await audioContext.resume();
        console.log("AudioContext resumed");
      }
    },
    { once: true }
  );

  await startAudioAnalysis();
  recognition = createRecognition(languageSelect.value);
  startToneLoop();
}

init();
