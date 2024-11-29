// Quotes API
const quotesApi = "https://api.quotable.io/random";

// Array of background images
const backgrounds = [
  "https://via.placeholder.com/1920x1080/4facfe/ffffff?text=Motivation+1",
  "https://via.placeholder.com/1920x1080/00f2fe/ffffff?text=Motivation+2",
  "https://via.placeholder.com/1920x1080/f5a623/ffffff?text=Motivation+3"
];

// Greet user based on time of day
function displayGreeting() {
  const hour = new Date().getHours();
  const greeting = document.getElementById('greeting');

  if (hour < 12) {
    greeting.textContent = "Good Morning! Welcome to Motivation Hub";
  } else if (hour < 18) {
    greeting.textContent = "Good Afternoon! Welcome to Motivation Hub";
  } else {
    greeting.textContent = "Good Evening! Welcome to Motivation Hub";
  }
}

// Change background image randomly
function changeBackground() {
  const header = document.getElementById('header');
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  header.style.backgroundImage = `url(${backgrounds[randomIndex]})`;
}

// Fetch a new quote
function fetchNewQuote() {
  fetch(quotesApi)
    .then(response => response.json())
    .then(data => {
      document.getElementById('quote').innerText = data.content + " — " + data.author;
    })
    .catch(error => {
      document.getElementById('quote').innerText = "Stay positive and keep moving!";
    });
}

// Goal Tracker
function addGoal() {
  const goalInput = document.getElementById('goalInput');
  const goalText = goalInput.value.trim();

  if (goalText) {
    const li = document.createElement('li');
    li.innerText = goalText;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
      li.remove();
      updateProgress();
    };

    li.appendChild(deleteButton);
    document.getElementById('goalList').appendChild(li);
    goalInput.value = '';

    updateProgress();
  }
}

// Update progress bar
function updateProgress() {
  const totalGoals = document.querySelectorAll('#goalList li').length;
  const completedGoals = document.querySelectorAll('#goalList li[completed]').length;

  const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  document.getElementById('progressBar').style.width = progress + "%";
}

// Initialize website
window.onload = function () {
  displayGreeting();
  changeBackground();
  fetchNewQuote();
};
