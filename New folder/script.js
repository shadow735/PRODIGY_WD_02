let stopwatchInterval;
let isRunning = false;
let startTime;
let lapCount = 1;

function startStop() {
  const startStopButton = document.getElementById('startStopButton');
  const lapButton = document.getElementById('lapButton');
  const resetButton = document.getElementById('resetButton');
  const display = document.getElementById('display');
  if (!isRunning) {
    startTime = Date.now() - (lapCount > 1 ? getElapsedTime() : 0);
    stopwatchInterval = setInterval(updateDisplay, 10);
    startStopButton.innerHTML = 'Stop';
    display.classList.remove('pulse'); // Remove pulsating animation
    startStopButton.classList.remove('buttonAnimation'); // Remove button animation
    lapButton.classList.remove('buttonAnimation'); // Remove button animation
    resetButton.classList.remove('buttonAnimation'); // Remove button animation
  } else {
    clearInterval(stopwatchInterval);
    startStopButton.innerHTML = 'Start';
    startStopButton.classList.add('buttonAnimation'); // Add button animation
    lapButton.classList.add('buttonAnimation'); // Add button animation
    resetButton.classList.add('buttonAnimation'); // Add button animation
  }
  isRunning = !isRunning;
}

function updateDisplay() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  document.getElementById('display').innerHTML = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000).toString().padStart(2, '0');
  const minutes = Math.floor((milliseconds % 3600000) / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
  const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${millisecondsFormatted}`;
}

function lap() {
  const lapsList = document.getElementById('laps');
  const lapTime = document.getElementById('display').innerHTML;
  const lapItem = document.createElement('li');
  lapItem.innerText = `Lap ${lapCount}: ${lapTime}`;
  lapsList.appendChild(lapItem);
  lapCount++;
}

function reset() {
  clearInterval(stopwatchInterval);
  isRunning = false;
  document.getElementById('startStopButton').innerHTML = 'Start';
  document.getElementById('display').innerHTML = '00:00:00:000';
  const lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  lapCount = 1;
}

function getElapsedTime() {
  const displayTime = document.getElementById('display').innerHTML;
  const timeParts = displayTime.split(':');
  const hours = parseInt(timeParts[0]) * 3600000;
  const minutes = parseInt(timeParts[1]) * 60000;
  const seconds = parseInt(timeParts[2]) * 1000;
  const milliseconds = parseInt(timeParts[3]) * 10;
  return hours + minutes + seconds + milliseconds;
}
