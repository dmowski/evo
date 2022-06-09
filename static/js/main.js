document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".main-menu");
  const sidebarToggler = document.querySelector(".header__toggle");

  document.body.addEventListener("click", (e) => {
    const isClickOnOutside = e.target.closest(".content");
    const isSideBarOpened = !sidebar.classList.contains("main-menu__hidden");
    const isSmallViewPortSize = document.body.clientWidth < 790;
    if (isSmallViewPortSize && isClickOnOutside && isSideBarOpened) {
      sidebar.classList.add("main-menu__hidden");
    }
  });

  sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("main-menu__hidden");
  });

  if (document.body.clientWidth < 790) {
    sidebar.classList.add("main-menu__hidden");
  }
});
