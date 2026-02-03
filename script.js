const video = document.getElementById("webcam");
const captions = document.getElementById("captions");

// Start webcam (optional)
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

// Start live speech recognition
function startSpeechRecognition() {
  // Check browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    captions.textContent = "Your browser does not support speech recognition.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Keep listening
  recognition.interimResults = true; // Show partial captions

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

startWebcam();
startSpeechRecognition();
