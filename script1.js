let countdownInterval;
let countdownDuration;
let currentTimeLeft;

const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const durationInput = document.getElementById('duration');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', startCountdown);
pauseButton.addEventListener('click', pauseCountdown);
resetButton.addEventListener('click', resetCountdown);

function startCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    countdownDuration = parseInt(durationInput.value);
    currentTimeLeft = countdownDuration;
    updateTimerDisplay(currentTimeLeft);
    countdownInterval = setInterval(updateCountdown, 1000);
    setButtonState(true, false, true);
}

function pauseCountdown() {
    clearInterval(countdownInterval);
    setButtonState(false, true, true);
}

function resetCountdown() {
    clearInterval(countdownInterval);
    currentTimeLeft = countdownDuration;
    updateTimerDisplay(currentTimeLeft);
    setButtonState(true, false, true);
}

function updateCountdown() {
    currentTimeLeft--;
    updateTimerDisplay(currentTimeLeft);

    if (currentTimeLeft === 0) {
        clearInterval(countdownInterval);
        setButtonState(false, true, false);
    }
}

function updateTimerDisplay(timeLeft) {
    const days = Math.floor(timeLeft / (3600 * 24));
    const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    daysElement.textContent = padZero(days);
    hoursElement.textContent = padZero(hours);
    minutesElement.textContent = padZero(minutes);
    secondsElement.textContent = padZero(seconds);
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

function setButtonState(startEnabled, pauseEnabled, resetEnabled) {
    startButton.disabled = !startEnabled;
    pauseButton.disabled = !pauseEnabled;
    resetButton.disabled = !resetEnabled;
