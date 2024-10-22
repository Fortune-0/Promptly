import * as say from '../variable_names/inputVar.js'

let task = say.taskNameEl.value,
dateTime = say.taskDateTimeEl.value;

const [date, time] = dateTime.split('T');

const formattedDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
const formattedTime = new Date(dateTime).toLocaleTimeString('en-US', { hour12: true }).replace(/:\d+ /, ' ');

export const createTask = (taskContainer) => {
    var firstLetter_TN = task.slice(0, 1).toUpperCase();
    var restName = task.slice(1, task.length);
    var taskHeaderName = firstLetter_TN + restName;

    const taskDiv = document.createElement('article');
    taskDiv.classList.add('task', 'mb-3', 'flex-1');

    const taskNameHeader = document.createElement('h3');
    taskNameHeader.classList.add('taskNameHeader');
    taskNameHeader.textContent = taskHeaderName;

    const taskContent = document.createElement('div');
    taskContent.classList.add('taskContent');

    const taskDateParagraph = document.createElement('p');
    taskDateParagraph.classList.add("taskDate");
    const taskTimeParagraph = document.createElement('p');
    taskTimeParagraph.classList.add("taskTime");

    const taskInputTime = document.createElement('p');
    taskInputTime.classList.add("hidden", "time");
    taskInputTime.textContent = time;
    taskContent.appendChild(taskInputTime);

    taskDateParagraph.textContent = `Date: `;
    const taskDate = document.createElement('span');
    taskDate.classList.add("date");
    taskDate.textContent = formattedDate;
    taskDateParagraph.appendChild(taskDate);
    taskTimeParagraph.textContent = `Time: `;
    const taskTime = document.createElement('span');
    taskTime.classList.add("finalTime");
    taskTime.textContent = formattedTime;
    taskTimeParagraph.appendChild(taskTime);

    const executionTime = document.createElement('p');
    executionTime.classList.add('executionTime');
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true }).replace(/:\d+ /, ' ');
    executionTime.textContent = ` ${currentTime}`;

    taskDiv.appendChild(taskNameHeader);
    taskContent.appendChild(taskTimeParagraph);
    taskContent.appendChild(taskDateParagraph);
    taskDiv.appendChild(taskContent);
    taskDiv.appendChild(executionTime);
    taskContainer.appendChild(taskDiv);
    clearData();
};
const clearData = () => {
    say.taskNameEl.value = '';
    say.taskDateTimeEl.value = '';
}