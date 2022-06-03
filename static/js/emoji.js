document.addEventListener("DOMContentLoaded", () => {
  const emoji = document.querySelector(".emoji-control__list");
  const emojiToggler = document.querySelector(".emoji-toggler");

  emojiToggler.addEventListener("click", () => {
    emoji.classList.toggle("hidden");
  });
});
