const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';
    li.textContent = task.text;

    li.addEventListener('click', () => {
      tasks[index].done = !tasks[index].done;
      saveAndRender();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Usuń';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveAndRender();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    tasks.push({ text: taskText, done: false });
    input.value = '';
    saveAndRender();
  }
});

renderTasks();
