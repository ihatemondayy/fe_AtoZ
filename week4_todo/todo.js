let date = new Date();
let selectedDate = null;
const todos = {};

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
          prevDates.unshift(PLDate - i);
        }
    }
    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push(i);
    }
    
    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);
    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
        dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
    })
    
    document.querySelector('.dates').innerHTML = dates.join('');

    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.textContent === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }

    document.querySelector('.dates').addEventListener('click', onDateClick);
};

const onDateClick = (event) => {
    if (event.target && event.target.matches('.date span.this')) {
        const currentToday = document.querySelector('.today');
        if (currentToday) {
            currentToday.classList.remove('today');
        }
        event.target.classList.add('today');
        selectedDate = new Date(date.getFullYear(), date.getMonth(), +event.target.textContent);
        renderTodos();
    }
};

const renderTodos = () => {
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = '';

    if(selectedDate) {
        const dateKey = selectedDate.toISOString().split('T')[0];
        const dateTodos = todos[dateKey] || [];

        dateTodos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo;
            todoList.appendChild(li);
        });
    }
};

const addTodo = () => {
    const todoInput = document.querySelector('#todo-input');
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        return alert('할 일을 입력해주세요.');
    }

    const todoList = document.querySelector('.todo-list');
    const todoItem = document.createElement('li');
    todoItem.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        todoList.removeChild(todoItem);
    };

    todoItem.insertBefore(deleteButton, todoItem.firstChild);

    todoList.appendChild(todoItem);
    todoInput.value = '';
};

const prevMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}

const nextMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    document.querySelector('.dates').addEventListener('click', onDateClick);
});