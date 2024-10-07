const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const updateLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

const generateTemplate = todo => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;
    list.innerHTML += html;
};

const renderTodos = (todos) => {
    list.innerHTML = '';
    todos.forEach(todo => generateTemplate(todo));
};

document.addEventListener('DOMContentLoaded', () => {
    renderTodos(todos);
});

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();

    if (todo.length) {
        todos.push(todo);
        updateLocalStorage(todos);
        generateTemplate(todo);
        addForm.reset();
    }
});

list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        const todoText = e.target.parentElement.textContent.trim();
        todos = todos.filter(todo => todo !== todoText);
        updateLocalStorage(todos);
        e.target.parentElement.remove();
    }
});

const filterTodos = term => {
    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});
