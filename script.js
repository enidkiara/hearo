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

// 1️⃣ Start webcam and wait until video is ready
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

// 4️⃣ Load face-api models
async function loadModels() {
  // Make sure you have a folder called "models" with the weights inside
  await faceapi.nets.tinyFaceDetector.loadFromUri('models');
  await faceapi.nets.faceExpressionNet.loadFromUri('models');
}

// 5️⃣ Emotion detection
async function detectEmotions() {
  const ctx = overlay.getContext('2d');

  // Make sure canvas matches video size
  faceapi.matchDimensions(overlay, { width: video.videoWidth, height: video.videoHeight });

  setInterval(async () => {
    // Detect faces and expressions
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    // Resize results to match overlay
    const resized = faceapi.resizeResults(detections, { width: video.videoWidth, height: video.videoHeight });

    // Clear overlay
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    // Draw detections and expressions
    faceapi.draw.drawDetections(overlay, resized);
    faceapi.draw.drawFaceExpressions(overlay, resized);
  }, 200);
}

// 6️⃣ Initialize everything
async function init() {
  await loadModels();      // load face-api models
  await startWebcam();     // wait until webcam is ready
  recognition = createRecognition(languageSelect.value); // start captions
  detectEmotions();        // start emotion detection
}

init();
