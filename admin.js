// Firebase references
const auth = firebase.auth();
const db = firebase.firestore();

// Admin login
document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("adminLoginForm").style.display = "none";
      document.getElementById("adminPanel").style.display = "block";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});

// Load participant submissions
function loadParticipants() {
  const dashboard = document.getElementById("dashboardContent");
  dashboard.innerHTML = "<h4>📊 Participant Submissions</h4>";

  db.collection("submissions").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dashboard.innerHTML += `
        <div style="text-align:left; margin:10px; padding:10px; border:1px solid #ccc;">
          <strong>${data.username}</strong> (${data.college}, ${data.branch}, ${data.year})<br>
          Reg No: ${data.regNumber}<br>
          Total Time: ${data.totalTime} sec<br>
          Disqualified: ${data.disqualified ? "Yes ❌" : "No ✅"}<br>
          Answers: <pre>${JSON.stringify(data.answers, null, 2)}</pre>
        </div>
      `;
    });
  });
}

// Load clues (optional)
function loadClues() {
  const dashboard = document.getElementById("dashboardContent");
  dashboard.innerHTML = "<h4>🧩 Clues</h4>";

  db.collection("clues").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const clue = doc.data();
      dashboard.innerHTML += `<p><strong>${doc.id}:</strong> ${clue.text}</p>`;
    });
  });
}
