// Tab switch detection
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    alert("Tab switch detected! You are disqualified.");
    window.location.href = "disqualified.html";
  }
});

// Timer for clue delay
let countdown = 600; // 10 minutes in seconds
let clueStartTime;
let totalTime = 0;

document.getElementById("registrationForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("registrationForm").style.display = "none";
  document.getElementById("waitingMessage").style.display = "block";
  startCountdown();
});

function startCountdown() {
  const interval = setInterval(() => {
    countdown--;
    document.getElementById("countdown").innerText = countdown;
    if (countdown <= 0) {
      clearInterval(interval);
      showClue();
    }
  }, 1000);
}

function showClue() {
  document.getElementById("waitingMessage").style.display = "none";
  document.getElementById("clueBox").style.display = "block";
  clueStartTime = Date.now();
}

function submitClue() {
  const clueEndTime = Date.now();
  const timeTaken = (clueEndTime - clueStartTime) / 1000;
  totalTime += timeTaken;

  alert(`Clue submitted! Time taken: ${timeTaken.toFixed(2)} seconds`);
  // You can now show the next clue or end the session
}
