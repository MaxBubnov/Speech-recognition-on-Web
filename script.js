const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const textsheet = document.querySelector("#doc");
const startButton = document.querySelector("#start-button");
const stopButton = document.querySelector("#stop-button");
const langSelector = document.querySelector("#lang-selector");
const langWarningLabels = document.querySelectorAll(".info-span");
// Settinh default values
recognition.continuous = true;
recognition.isStarted = false;
recognition.lang = "en-Br";

// Interface
const stop = () => {
  recognition.stop();
  recognition.isStarted = false;
  stopButton.disabled = true;
  startButton.disabled = false;
  textsheet.innerHTML += `<hr/>`;
};
const start = () => {
  recognition.start();
  recognition.isStarted = true;
  stopButton.disabled = false;
  startButton.disabled = true;
};
const changingTheLenguage = (event) => {
  langWarningLabels.forEach((span) => (span.style.display = "none"));
  const rightInfoLabel = document.querySelector(
    "#" + event.target.value + "_infospan"
  );
  rightInfoLabel.style.display = "inline";
  recognition.lang = event.target.value;
};

langSelector.addEventListener("change", (event) => {
  if (recognition.isStarted) {
    stop();
  }
  changingTheLenguage(event);
});

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);

//Speech recognition event
recognition.addEventListener("result", (event) => {
  const phrase = event.results[event.results.length - 1][0].transcript;
  const outputPhrase = phrase.charAt(0).toUpperCase() + phrase.slice(1) + ".";
  textsheet.innerHTML += `<p>${outputPhrase}</p>`;
});
