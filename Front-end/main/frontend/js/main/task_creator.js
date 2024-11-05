// import * as html from '../variable_names/inputVar.js'
import { clearData } from '../allTasks/edit.js';
export const createTask = async (taskContainer) => {

    try {
        const response = await fetch('http://127.0.0.1:5000/api/allReminder');
        let tasks = await response.json();
        console.log(tasks);
        tasks = tasks.sort((a,b)=> b.id - a.id);
        tasks = tasks.slice(0,7);
        tasks.forEach(task => {
            const taskDiv = document.createElement('article');
            taskDiv.classList.add('task', 'mb-4', 'flex-1');
            taskDiv.setAttribute('data-task-id', task.id);
        
            const title = task.task.charAt(0).toUpperCase() + task.task.slice(1);
            taskDiv.innerHTML = `
                <h3 class="taskNameHeader">${title}</h3>
                <div class="taskContent">
                    <p class="taskTime">Time: <span class="finalTime">${new Date(task.date+"T"+task.time).toLocaleTimeString('en-US', {hour12: true}).replace(/:\d+ /, ' ')}</span></p>
                    <p class="taskDate">Date: <span class="date">${new Date(task.date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span></p>
                </div>
            `
            taskContainer.appendChild(taskDiv);
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `ERROR`,
            text: `Internal Server errror ${response.status}`
        })
    }

    clearData();
};