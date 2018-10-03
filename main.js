const nav = document.querySelector('nav')
const navButton = document.querySelector('.nav-toggle')


navButton.addEventListener('click', () => {
  nav.classList.toggle('nav-open')
})