const add = document.querySelector('.add');
const ul = document.querySelector('.todos');
const search = document.querySelector('.search input');
const button = document.querySelector('button');

//const inputs = document.querySelectorAll('.list-input');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
let data = JSON.parse(localStorage.getItem('items'));



const generateTemplate = todo => {
    const li = document.createElement('li');
    li.setAttribute("class", "list-group-item text-light d-flex justify-content-between align-items-center");
    li.innerHTML = `<span>${todo}<input type="text" class="list-update hide"></span>`;
    //li.innerHTML += `<input type="text" class="list-update hide">`;
    li.innerHTML += `<button class="hide">Update</button>`;
    ul.appendChild(li);
    const newIcon = document.createElement('i');
    newIcon.setAttribute('class', 'far bi-trash3 delete');
    li.appendChild(newIcon);
}
/*
let key = "";
function updateSpan(key) {
    for (let i = 0; i < data.length; i++)
        if (data[i] === key) {
            
            break;
        }
    key = this.key;
}
*/

ul.addEventListener('dblclick', e => {
    console.log(e.target.textContent)
    console.log(e.target.lastChild.value)
    e.target.lastChild.classList.remove('hide');
    e.target.lastChild.classList.add('visible');
    e.target.lastChild.setAttribute('placeholder', 'Please enter new value...');
    e.target.lastChild.style.backgroundColor = "white";
    e.target.lastChild.style.color = "red";
    e.target.lastChild.addEventListener('change', event => {
        for (let i = 0; i < data.length; i++)
            if (data[i] === e.target.textContent) {
                data[i] = e.target.lastChild.value;
                e.target.lastChild.classList.remove('visible');
                e.target.lastChild.classList.add('hide');
                e.target.textContent = e.target.lastChild.value;
                break;
            }
        update();
    })
})

data.forEach(item => {
    generateTemplate(item);
});

add.addEventListener('submit', e => {
    e.preventDefault();
    const todo = e.target.add.value.trim();
    if (todo.length != 0) {
        itemsArray.push(todo);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        data = JSON.parse(localStorage.getItem('items'));
        generateTemplate(todo);
        add.reset();
    }

});

function update() {
    localStorage.setItem('items', JSON.stringify(data));
    itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    localStorage.setItem('items', JSON.stringify(itemsArray));
    data = JSON.parse(localStorage.getItem('items'));
}

ul.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        for (let i = 0; i < data.length; i++)
            if (data[i] === e.target.parentElement.firstChild.textContent) {
                console.log(data[i])
                data.splice(i, 1);
                update();
                break;
            }
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
    console.log(filtre)
})
