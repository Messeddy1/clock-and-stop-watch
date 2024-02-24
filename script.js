let clock = document.getElementById("clock");
function digiClock() {
  const date = new Date();
  let houres = date.getHours();
  const meridiem = houres >= 12 ? "PM" : "AM";
  houres = houres % 12 || 12;
  houres = houres.toString().padStart(2, 0);
  const minuts = date.getMinutes().toString().padStart(2, 0);
  const seconsds = date.getSeconds().toString().padStart(2, 0);
  const timeString = `${houres}:${minuts}:${seconsds} ${meridiem}`;
  clock.textContent = timeString;
}
digiClock();
setInterval(digiClock, 1000);
// #####################"stopwatch"
const display = document.getElementById("display");
let controls = document.querySelectorAll(".controls .btn");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
function active() {
  controls.forEach((element) => {
    element.addEventListener("click", function () {
      controls.forEach((element) => {
        element.classList.remove("active");
      });
      element.classList.add("active");
    });
  });
}
active();
function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
    isRunning = true;
  }
}

function stop() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = Date.now() - startTime;
  }
}

function reset() {
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00:00";
}

function update() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let seconds = Math.floor(elapsedTime / 1000) % 60;
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  milliseconds = String(milliseconds).padStart(2, "0");

  display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
