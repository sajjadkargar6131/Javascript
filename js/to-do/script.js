const addBtn = document.getElementById('addBtn');
const todoInput = document.getElementById('todoInput');
const todoDateInput = document.getElementById('date');
const todoList = document.getElementById('todoList');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');
const incompleteCount = document.getElementById('incompleteCount');
const completedPercentage = document.getElementById('completedPercentage');
const incompletePercentage = document.getElementById('incompletePercentage');

let todos = [];
let editingIndex = -1;

// بارگذاری لیست کارها
function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodos();
  }
}

// ذخیره‌سازی لیست کارها در LocalStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// رندر کردن لیست کارها در صفحه
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    
    if (todo.completed) {
      li.classList.add('completed');
    }
    
    const todoSpan = document.createElement('span');
    todoSpan.textContent = todo.text;

    const todoDate = document.createElement('span');
    todoDate.textContent = todo.date;

    const actions = document.createElement('div');
    actions.classList.add('actions');

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', function() {
      todoInput.value = todo.text;
      todoDateInput.value = todo.date;
      editingIndex = index;
      addBtn.textContent = 'ویرایش';
      addBtn.removeEventListener('click', addTodo);
      addBtn.addEventListener('click', editTodo);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
      deleteTodo(index);
    });

    // چک‌باکس برای انجام‌شده
    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.classList.add('complete-checkbox');
    completeCheckbox.checked = todo.completed;
    completeCheckbox.addEventListener('change', function() {
      toggleComplete(index);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    actions.appendChild(completeCheckbox);

    li.appendChild(todoSpan);
    li.appendChild(todoDate);
    li.appendChild(actions);
    todoList.appendChild(li);
  });

  updateSummary();
}

// افزودن کار جدید
function addTodo() {
  const text = todoInput.value.trim();
  const date = todoDateInput.value.trim();

  // بررسی اینکه عنوان و تاریخ حتما وارد شده باشند
  if (!text) {
    alert('لطفا عنوان کار را وارد کنید.');
    return;
  }
  if (!date) {
    alert('لطفا تاریخ کار را وارد کنید.');
    return;
  }

  const newTodo = {
    text: text,
    date: date,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();

  todoInput.value = '';
  todoDateInput.value = '';
}

// ویرایش کار
function editTodo() {
  const text = todoInput.value.trim();
  const date = todoDateInput.value.trim();

  if (text && date && editingIndex !== -1) {
    todos[editingIndex].text = text;
    todos[editingIndex].date = date;
    saveTodos();

    todoInput.value = '';
    todoDateInput.value = '';
    addBtn.textContent = 'افزودن';
    addBtn.removeEventListener('click', editTodo);
    addBtn.addEventListener('click', addTodo);
    editingIndex = -1;
  }
}

// حذف کار
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
}

// تغییر وضعیت انجام‌شده
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
}

// به‌روزرسانی خلاصه کارها
function updateSummary() {
  const completed = todos.filter(todo => todo.completed).length;
  const incomplete = todos.length - completed;

  totalCount.textContent = todos.length;
  completedCount.textContent = completed;
  incompleteCount.textContent = incomplete;

  if (todos.length === 0) {
    completedPercentage.textContent = '0%';
    incompletePercentage.textContent = '0%';
  } else {
    completedPercentage.textContent = `${Math.round((completed / todos.length) * 100)}%`;
    incompletePercentage.textContent = `${Math.round((incomplete / todos.length) * 100)}%`;
  }
}

// رویداد اضافه کردن کار
addBtn.addEventListener('click', addTodo);

// بارگذاری کارها در صفحه هنگام بارگذاری اولیه
loadTodos();
