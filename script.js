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

// Start webcam and wait until video is ready
async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    video.srcObject = stream;

    return new Promise((resolve) => {
      // Wait until video metadata is loaded
      video.onloadedmetadata = () => {
        video.play();
        // Set canvas size to match video
        overlay.width = video.videoWidth;
        overlay.height = video.videoHeight;
        resolve();
      };
    });
  } catch (err) {
    console.error("Error accessing webcam/microphone:", err);
  }
}

// Speech recognition
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

// Handle language change
languageSelect.addEventListener("change", () => {
  if (recognition) recognition.stop();
  recognition = createRecognition(languageSelect.value);
});

// Load face-api models
async function loadModels() {
  // Make sure you have a folder called "models" with the weights inside
  await faceapi.nets.tinyFaceDetector.loadFromUri('models');
  await faceapi.nets.faceExpressionNet.loadFromUri('models');
}

// Emotion detection
async function detectEmotions() {
  const ctx = overlay.getContext('2d');

  faceapi.matchDimensions(overlay, { width: video.videoWidth, height: video.videoHeight });

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    const resized = faceapi.resizeResults(detections, { width: video.videoWidth, height: video.videoHeight });

    ctx.clearRect(0, 0, overlay.width, overlay.height);

    faceapi.draw.drawDetections(overlay, resized);
    faceapi.draw.drawFaceExpressions(overlay, resized);
  }, 200);
}

// Initialize everything
async function init() {
    await startWebcam();
    recognition = createRecognition(languageSelect.value);
  
    try {
      await loadModels();
      detectEmotions();
    } catch (e) {
      console.error("Model load failed", e);
    }
  }
  
  init();
  