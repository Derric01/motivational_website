// Quotes API
const quotesApi = "https://api.quotable.io/random";

// Greet user based on time of day
function displayGreeting() {
  const hour = new Date().getHours();
  const greeting = document.getElementById("greeting");

  if (hour < 12) {
    greeting.textContent = "Good Morning! Welcome to Motivation Hub";
  } else if (hour < 18) {
    greeting.textContent = "Good Afternoon! Welcome to Motivation Hub";
  } else {
    greeting.textContent = "Good Evening! Welcome to Motivation Hub";
  }
}

// Fetch a new quote
function fetchNewQuote() {
  fetch(quotesApi)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "quote"
      ).innerText = `"${data.content}" — ${data.author}`;
    })
    .catch(() => {
      document.getElementById("quote").innerText =
        "Stay positive and keep moving!";
    });
}

// Goal Tracker
function addGoal() {
  const goalInput = document.getElementById("goalInput");
  const goalText = goalInput.value.trim();

  if (goalText) {
    const li = document.createElement("li");
    li.innerText = goalText;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.onclick = function () {
      li.remove();
      updateProgress();
    };

    li.appendChild(deleteButton);
    document.getElementById("goalList").appendChild(li);
    goalInput.value = "";

    updateProgress();
  }
}

// Update progress bar
function updateProgress() {
  const totalGoals = document.querySelectorAll("#goalList li").length;
  const completedGoals = document.querySelectorAll(
    "#goalList li[completed]"
  ).length;

  const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  document.getElementById("progressBar").style.width = progress + "%";
}

// Smooth scroll for navigation
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Initialize website
window.onload = function () {
  displayGreeting();
  fetchNewQuote();
};
