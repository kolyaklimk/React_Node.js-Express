document.addEventListener("DOMContentLoaded", function () {
    const countdownElement = document.getElementById("countdown");
    const timerElement = document.getElementById("timer");

    let targetTime = 3600;

    if (localStorage.getItem("targetTime")) {
        targetTime = parseInt(localStorage.getItem("targetTime"));
    }
    else{
        localStorage.setItem("targetTime", targetTime);
    }

    function updateCountdown() {
        targetTime = targetTime - 1;
        console.log(targetTime);
        if (targetTime <= 0) {
            countdownElement.textContent = "Отсчет завершен!";
            clearInterval(updateCountdown);
        } else {
            const hours = Math.floor(targetTime / 3600);
            const minutes = Math.floor((targetTime % 3600) / 60);
            const seconds = Math.floor((targetTime % 60));
            localStorage.setItem("targetTime", targetTime);

            timerElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
});
