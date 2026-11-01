const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

const today = new Date();
const iso = date => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
checkIn.min = iso(today);
checkOut.min = iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
checkIn.addEventListener("change", () => {
  if (!checkIn.value) return;
  const nextDay = new Date(`${checkIn.value}T12:00:00`);
  nextDay.setDate(nextDay.getDate() + 1);
  checkOut.min = iso(nextDay);
  if (checkOut.value && checkOut.value <= checkIn.value) checkOut.value = "";
});

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const message = document.getElementById("bookingMessage");
  if (!checkIn.value || !checkOut.value || checkOut.value <= checkIn.value) {
    message.textContent = "Please choose a valid check-in and check-out date.";
    return;
  }
  const nights = Math.round((new Date(`${checkOut.value}T12:00:00`) - new Date(`${checkIn.value}T12:00:00`)) / 86400000);
  const guests = document.getElementById("guests").value;
  message.textContent = `Your selected stay: ${nights} night${nights === 1 ? "" : "s"} for ${guests} guest${guests === "1" ? "" : "s"}. This is a demo request — no reservation has been made.`;
});
document.getElementById("year").textContent = new Date().getFullYear();
