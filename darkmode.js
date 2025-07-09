
const toggle = document.getElementById("theme-toggle");
const iconLeft = document.getElementById("theme-icon-left");
const iconRight = document.getElementById("theme-icon-right");

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  toggle.checked = dark;
  iconLeft.style.opacity = dark ? "0.3" : "1";
  iconRight.style.opacity = dark ? "1" : "0.3";
  localStorage.setItem("theme", dark ? "dark" : "light");
}

const saved = localStorage.getItem("theme") === "dark";
setTheme(saved);

toggle.addEventListener("change", () => {
  setTheme(toggle.checked);
});
