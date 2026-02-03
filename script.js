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

// Start speech recognition
function startSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    captions.textContent = "Your browser does not support speech recognition.";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = languageSelect.value; // set initial language

  recognition.onresult = (event) => {
    let text = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
    }
    captions.textContent = text;
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recognition.start();
}

// Change language dynamically
languageSelect.addEventListener("change", () => {
  if (recognition) {
    recognition.stop();           // stop current recognition
    recognition.lang = languageSelect.value;  // set new language
    recognition.start();          // restart recognition
  }
});

startWebcam();
startSpeechRecognition();
