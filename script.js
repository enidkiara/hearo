/*const video = document.getElementById("webcam");
const captions = document.getElementById("captions");
const languageSelect = document.getElementById("language");

let recognition;

// Start webcam
async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("Error accessing webcam/microphone:", err);
  }
}

// Function to create & start speech recognition
function createRecognition(lang) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    captions.textContent = "Your browser does not support speech recognition.";
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

  rec.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  rec.start();
  return rec;
}

// Start speech recognition initially
recognition = createRecognition(languageSelect.value);

// Listen for language changes
languageSelect.addEventListener("change", () => {
  if (recognition) {
    recognition.stop();  // stop current recognition
  }
  recognition = createRecognition(languageSelect.value); // create a new instance with new language
});

startWebcam();*/

const video = document.getElementById("webcam");
const captions = document.getElementById("captions");
const languageSelect = document.getElementById("language");
const overlay = document.getElementById("overlay");
let recognition;

// 1️⃣ Start webcam
async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    video.srcObject = stream;

    // Wait until video metadata is loaded
    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        video.play();
        resolve();
      };
    });
  } catch (err) {
    console.error("Error accessing webcam/microphone:", err);
  }
}

// 2️⃣ Speech recognition
function createRecognition(lang) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    captions.textContent = "Your browser does not support speech recognition.";
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

  rec.onerror = (event) => console.error("Speech recognition error:", event.error);

  rec.start();
  return rec;
}

// 3️⃣ Handle language change
languageSelect.addEventListener("change", () => {
  if (recognition) recognition.stop();
  recognition = createRecognition(languageSelect.value);
});

// 4️⃣ Emotion detection
async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('./models'); // adjust path if needed
  await faceapi.nets.faceExpressionNet.loadFromUri('./models');
}

async function detectEmotions() {
  const canvas = overlay;

  // Make sure canvas matches video size
  faceapi.matchDimensions(canvas, { width: video.videoWidth, height: video.videoHeight });

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    const resized = faceapi.resizeResults(detections, { width: video.videoWidth, height: video.videoHeight });

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resized);
    faceapi.draw.drawFaceExpressions(canvas, resized);
  }, 200);
}

// 5️⃣ Initialize everything
async function init() {
  await loadModels();        // load face-api models
  await startWebcam();       // wait until webcam is ready
  recognition = createRecognition(languageSelect.value); // start captions
  detectEmotions();          // start emotion detection
}

init();
