const sidebar = document.querySelector('.main-menu');
const sidebarToggler = document.querySelector('.menu-toggle');
sidebarToggler.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
})
window.addEventListener('load', () => {
    if (document.body.clientWidth >= 768) {
        sidebar.classList.remove('hidden');
    }
})
window.addEventListener('resize', () => {
    if (document.body.clientWidth >= 768) {
        sidebar.classList.remove('hidden');
    }
})
