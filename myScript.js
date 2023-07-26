const add = document.querySelector('.add');
const ul = document.querySelector('.todos');
const search = document.querySelector('.search input');
const button = document.querySelector('button');
const loginButton = document.getElementById('loginButton');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');
const loginContainer = document.getElementById('loginContainer');
const contentContainer = document.getElementById('contentContainer');
const signInContainer = document.getElementById('signInContainer');
const clearAll = document.getElementById('clearAll');
const signInButton = document.getElementById('signInButton');
const logout = document.getElementById('logout');
const loginAccount = document.getElementById('loginAccount');

let itemsArray;
let data;
let email;

signInButton.addEventListener('click', e => {
    e.preventDefault();
    if (inputPassword.value === "") {
        alert("Password field can't be null!")
    } else {
        itemsArray = [];
        localStorage.setItem(inputEmail.value, JSON.stringify(itemsArray));
        localStorage.setItem(`${inputEmail.value}-Password`, inputPassword.value);
        data = JSON.parse(localStorage.getItem(inputEmail.value));
        alert("Your registration has been created!");
        data.forEach(item => {
            generateTemplate(item);
        });
    }
});



loginButton.addEventListener('click', e => {
    e.preventDefault();
    if (inputPassword.value === "") {
        alert("Password field can't be null!")
    } else {
        if (localStorage.getItem(inputEmail.value) && localStorage.getItem(`${inputEmail.value}-Password`) === inputPassword.value) {
            itemsArray = JSON.parse(localStorage.getItem(inputEmail.value))
        }

        if (itemsArray && inputEmail.value.length > 0) {

            localStorage.setItem(inputEmail.value, JSON.stringify(itemsArray));
            data = JSON.parse(localStorage.getItem(inputEmail.value));
            console.log(data)

            //localStorage.setItem(`${user}`, JSON.stringify(data));
            loginContainer.classList.add('hide');
            contentContainer.classList.remove('hide');

            loginAccount.innerHTML += `Giriş yapılan hesap: ${inputEmail.value}`;
            data.forEach(item => {
                generateTemplate(item);
            });
        } else {
            alert(`Username or password is not found! Please check your username or password! If you do not have a membership, you must be register! Please type your email and password then press SignIn button first!`);
            return;
        }
    }
})

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

ul.addEventListener('dblclick', e => {
    console.log(e.target.textContent)
    console.log(e.target.lastChild.value)
    e.target.lastChild.classList.remove('hide');

    e.target.lastChild.classList.add('visible');
    e.target.lastChild.setAttribute('value', `${e.target.textContent}`);
    e.target.lastChild.style.backgroundColor = "white";
    e.target.lastChild.style.color = "red";
    e.target.lastChild.addEventListener('change', () => {
        for (let i = 0; i < data.length; i++) {
            if (data[i] === e.target.textContent) {
                data[i] = e.target.lastChild.value;
                e.target.lastChild.classList.remove('visible');
                e.target.lastChild.classList.add('hide');
                e.target.textContent = e.target.lastChild.value;
                break;
            }
        }

        update();
    })
    e.target.lastChild.addEventListener('blur', () => {
        for (let i = 0; i < data.length; i++) {
            if (data[i] === e.target.lastChild.value) {
                e.target.lastChild.classList.remove('visible');
                e.target.lastChild.classList.add('hide');
                break;
            }
        }
    })
})

add.addEventListener('submit', e => {
    e.preventDefault();
    const todo = e.target.add.value.trim();
    for (let i = 0; i < itemsArray.length; i++) {
        if (data[i] === todo) {
            alert('This task is already saved!')
            return;
        }
    }
    if (todo.length != 0) {

        itemsArray.push(todo);
        localStorage.setItem(inputEmail.value, JSON.stringify(itemsArray));
        data = JSON.parse(localStorage.getItem(inputEmail.value));
        generateTemplate(todo);
        add.reset();
    }

});

function update() {
    localStorage.setItem(inputEmail.value, JSON.stringify(data));
    itemsArray = localStorage.getItem(inputEmail.value) ? JSON.parse(localStorage.getItem(inputEmail.value)) : [];
    localStorage.setItem(inputEmail.value, JSON.stringify(itemsArray));
    data = JSON.parse(localStorage.getItem(inputEmail.value));
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

clearAll.addEventListener('click', function () {
    //localStorage.clear();
    localStorage.removeItem(inputEmail.value);
    localStorage.removeItem(inputEmail.value + "-Password");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    itemsArray = "";
    loginContainer.classList.remove('hide');
    contentContainer.classList.add('hide');
    inputEmail.value = "";
    inputPassword.value = "";
    data = "";
    location.reload();
});

logout.addEventListener('click', e => {
    itemsArray = "";
    loginContainer.classList.remove('hide');
    contentContainer.classList.add('hide');
    inputEmail.value = "";
    inputPassword.value = "";
    data = "";
    loginAccount.innerHTML = "";
    location.reload();
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
