let timers = [];

function addCountdown() {
    const input = document.getElementById("datetime-input").value;
    if (!input) {
        showMessage("Please select a date and time!", "error");
        return;
    }

    const targetTime = new Date(input).getTime();
    const timerId = new Date().getTime(); // Unique ID for each timer

    const timerObj = {
        id: timerId,
        targetTime,
        interval: null
    };

    timers.push(timerObj);
    displayTimers();
    startCountdown(timerId);
}

function startCountdown(timerId) {
    const timerObj = timers.find(t => t.id === timerId);
    if (!timerObj) return;

    timerObj.interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = timerObj.targetTime - now;

        if (timeLeft <= 0) {
            clearInterval(timerObj.interval);
            document.getElementById(`timer-${timerObj.id}`).innerHTML = `<span>⏳ Time's up!</span>`;
            document.getElementById("alarm-sound").play();
            document.getElementById("stop-sound").classList.remove("hidden");
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById(`timer-${timerObj.id}`).innerHTML = `
            <span>${days.toString().padStart(2, "0")}</span>D :
            <span>${hours.toString().padStart(2, "0")}</span>H :
            <span>${minutes.toString().padStart(2, "0")}</span>M :
            <span>${seconds.toString().padStart(2, "0")}</span>S
            <button class="remove-btn" onclick="removeTimer(${timerObj.id})">
                <i class="bx bx-trash"></i>
            </button>
        `;
    }, 1000);
}

function displayTimers() {
    const timersContainer = document.getElementById("timers-container");
    timersContainer.innerHTML = "";
    
    timers.forEach(timer => {
        const timerDiv = document.createElement("div");
        timerDiv.className = "timer-box";
        timerDiv.id = `timer-${timer.id}`;
        timerDiv.innerHTML = "Loading...";
        timersContainer.appendChild(timerDiv);
    });
}

function removeTimer(timerId) {
    const index = timers.findIndex(t => t.id === timerId);
    if (index !== -1) {
        clearInterval(timers[index].interval);
        timers.splice(index, 1);
        displayTimers();
    }
}

function stopSound() {
    document.getElementById("alarm-sound").pause();
    document.getElementById("alarm-sound").currentTime = 0;
    document.getElementById("stop-sound").classList.add("hidden");
}

function showMessage(msg, type) {
    const messageBox = document.querySelector(".message-box");
    messageBox.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
    setTimeout(() => messageBox.innerHTML = "", 3000);
}
