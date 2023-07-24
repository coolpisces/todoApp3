const add = document.querySelector('.add');
const ul = document.querySelector('.todos');
const search = document.querySelector('.search input');
const button = document.querySelector('button');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));


const generateTemplate = todo => {
    const li = document.createElement('li');
    li.setAttribute("class", "list-group-item text-light d-flex justify-content-between align-items-center");
    li.innerHTML = `<span>${todo}</span>`;
    ul.appendChild(li);
    const newIcon = document.createElement('i');
    newIcon.setAttribute('class', 'far bi-trash3 delete');
    li.appendChild(newIcon);
}

data.forEach(item => {
    generateTemplate(item);
});

add.addEventListener('submit', e => {
    e.preventDefault();
    const todo = e.target.add.value.trim();
    if (todo.length != 0) {
        itemsArray.push(todo);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        generateTemplate(todo);
        add.reset();
    }

});

ul.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
})

button.addEventListener('click', function () {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    itemsArray = [];
});

const filterFunc = filtre => {
    Array.from(ul.children).filter(todo => !todo.textContent.toLowerCase().includes(filtre))
        .forEach(todo => todo.classList.add('filtered'));

    Array.from(ul.children).filter(todo => todo.textContent.toLowerCase().includes(filtre))
        .forEach(todo => todo.classList.remove('filtered'));
}

search.addEventListener('keyup', () => {
    const filtre = search.value.trim().toLowerCase();
    filterFunc(filtre);
})
