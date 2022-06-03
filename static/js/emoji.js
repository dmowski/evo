document.addEventListener("DOMContentLoaded", () => {
  const emoji = document.querySelector(".emoji-list");
  const emojiToggler = document.querySelector(".emoji-toggler");

  emojiToggler.addEventListener("click", () => {
    emoji.classList.toggle("hidden");
  });
});
