const focusBtn = document.getElementById("focus-btn");
const shortBtn = document.getElementById("short-btn");
const longBtn = document.getElementById("long-btn");
const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const skipBtn = document.querySelector(".skip-btn");
const timer = document.querySelector(".timer");
const body = document.querySelector("body");

let startingMinutes = 25;
let time = (startingMinutes * 60) - 1;
let intervalId; // Store the interval ID
let isPaused = false; // Track if the timer is paused

focusBtn.addEventListener("click", function() {
    timer.textContent = "25:00";
    startingMinutes = 25;
    time = time = (startingMinutes * 60) - 1;
});

shortBtn.addEventListener("click", function() {
    timer.textContent = "5:00";
    startingMinutes = 5;
    time = time = (startingMinutes * 60) - 1;
});

longBtn.addEventListener("click", function() {
    timer.textContent = "15:00";
    startingMinutes = 15;
    time = (startingMinutes * 60) - 1;
});

function modifyButtons() {
    // Hide buttons
    startBtn.classList.add("hidden");
    focusBtn.classList.add("hidden");
    shortBtn.classList.add("hidden");
    longBtn.classList.add("hidden");
    // Show buttons
    pauseBtn.classList.remove("hidden");
    skipBtn.classList.remove("hidden");
}

function updateCountdown() {
    modifyButtons();
    intervalId = setInterval(function() {
        if (!isPaused) { // Only update if not paused
            body.style.backgroundColor = "black";
            timer.style.color = "white";
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            timer.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            time--;

            if (time < 0) { // Stop timer when it reaches 0
                clearInterval(intervalId);
                resetButtons();
            }
        }
    }, 1000);
}

function resetButtons() {
    // Reset button visibility
    startBtn.classList.remove("hidden");
    focusBtn.classList.remove("hidden");
    shortBtn.classList.remove("hidden");
    longBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
    skipBtn.classList.add("hidden");

    // Reset timer variables
    clearInterval(intervalId);
    isPaused = false;
    time = (startingMinutes * 60) - 1;
}

// Start the timer
startBtn.addEventListener("click", updateCountdown);

// Pause the timer
pauseBtn.addEventListener("click", function() {
    isPaused = !isPaused; // Toggle the pause state
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    body.style.backgroundColor = "#FF4242";
    timer.style.color = "black";
});

// Skip the remaining time
skipBtn.addEventListener("click", function() {
    resetButtons();
    timer.textContent = `${startingMinutes}:00`; // Reset display to initial time
    body.style.backgroundColor = "#FF4242";
    timer.style.color = "black";
});
