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
  analyser.getByteFrequencyData(dataArray);

  let sum = 0;
  let peaks = 0;

  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
    if (dataArray[i] > 120) peaks++;
  }

  return {
    volume: sum / dataArray.length,
    pitchActivity: peaks
  };
}


// --------------------
// UPDATE TONE DISPLAY
// --------------------
function detectTone(volume, pitchActivity) {
  if (volume > 55 || pitchActivity > 25) {
    return "sounds excited or upset";
  }

  if (volume > 30 || pitchActivity > 10) {
    return "sounds neutral";
  }

  return "sounds calm";
}

function startToneLoop() {
  setInterval(() => {
    const { volume, pitchActivity } = getAudioStats();
    const tone = detectTone(volume, pitchActivity);
    toneDiv.textContent = "Tone: " + tone;
  }, 400);
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
  recognition = createRecognition(languageSelect.value);
  await startAudioAnalysis();
  startToneLoop();
}

init();
