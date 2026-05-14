const filterBtn = document.getElementById('filter-btn');
const filterMenu = document.getElementById('filter-menu');

function setFilterButtonLabel(label) {
  filterBtn.dataset.label = label;
  filterBtn.textContent = '';
  const span = document.createElement('span');
  span.textContent = label;
  filterBtn.appendChild(span);
}

// Initialize label
setFilterButtonLabel('all types');

// toggle open/close on button click
filterBtn.addEventListener('click', () => {
  filterMenu.classList.toggle('open');
});

// close if you click anywhere else
document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown')) {
    filterMenu.classList.remove('open');
  }
});

// handle option selection
filterMenu.querySelectorAll('.dropdown-option').forEach(option => {
  option.addEventListener('click', () => {
    const value = option.dataset.value;
    setFilterButtonLabel(option.textContent);
    filterMenu.classList.remove('open');

    // filter logic - renderAnimals comes from fetch.js
    if (window.renderAnimals && window.animals) {
      window.renderAnimals(value ? window.animals.filter(a => a.type === value) : window.animals);
    }
  });
});