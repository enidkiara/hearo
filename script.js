const video = document.getElementById("webcam");
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

startWebcam();
