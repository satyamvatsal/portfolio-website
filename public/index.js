var socket = io();

socket.on("userCount", (msg) => {
  var count = document.getElementById("userCount");
  userCount.innerText = "Active Users: " + msg;
});

const btn = document.getElementById("dark-mode-button");
localStorage.setItem("isDark", true);
var isDark = localStorage.getItem("isDark") == "true";

function updateTheme() {
  var mainImg = document.getElementById("satyam-image");
  var html = document.getElementById("main-html");
  var theme = isDark ? "dark" : "light";
  var imageURL = `/satyam-vatsal-${isDark ? "dark" : "light"}.webp`;
  if (mainImg) mainImg.setAttribute("src", imageURL);
  var themeText = document.getElementById("theme-text");
  themeText.innerText = !isDark ? "Dark Mode" : "Light Mode";
  html.setAttribute("data-bs-theme", theme);
  localStorage.setItem("isDark", isDark);
}
btn.addEventListener("click", () => {
  isDark = !isDark;
  updateTheme();
});
updateTheme();
