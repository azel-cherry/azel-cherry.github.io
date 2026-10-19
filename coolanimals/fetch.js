const response = await fetch('animals.json');
const animals = await response.json();

window.renderAnimals = function(list) {
    const container = document.getElementById('card-container');
    container.innerHTML = list.map(animal => `
        <section class="animal-card" onclick="window.location.href='./${animal.id}/'">
            <img src="${animal.id}/imgs/icon.png">
            <p>${animal.name}</p>
        </section>
    `).join('');
    container.querySelectorAll('.animal-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const angle = (Math.random() * 6) - 3;
            el.style.transform = `rotate(${angle}deg)`;
        });
    });
};

window.animals = animals;

// search
document.getElementById('search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    window.renderAnimals(animals.filter(a => a.name.toLowerCase().includes(q)));
});

// random
document.getElementById('random-btn').addEventListener('click', () => {
    const animal = animals[Math.floor(Math.random() * animals.length)];
    window.location.href = `./${animal.id}/`;
});

window.renderAnimals(animals); // show all on load