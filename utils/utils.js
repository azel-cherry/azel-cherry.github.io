// random rotate
document.querySelectorAll('h1').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const angle = (Math.random() * 6) - 3;
    el.style.transform = `rotate(${angle}deg)`;
  });
});
