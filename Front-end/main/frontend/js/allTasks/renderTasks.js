import * as html from '../variable_names/allTasksVar.js'

export async function renderRes (){

    try {
        
        const response = await fetch('http://127.0.0.1:5000/api/allReminder');
       
        setTimeout(() => {
            // load.remove();
            html.load.classList.replace("flex", "hidden");
        }, 1200);
        
        let tasks = await response.json();
        tasks = tasks.sort((a,b)=> b.id - a.id);
        tasks.forEach(task => {
            const taskParentContainer = document.createElement('article');
            taskParentContainer.setAttribute('data-task-id', task.id);
            taskParentContainer.setAttribute('id', "task"+task.id);
            taskParentContainer.classList.add("flex", "task", "taskContainer", "mb-5", "hover:border-blue-300", "border", "bg-white", "cursor-pointer", "p-6", "hover:scale-105", "transition-all", "rounded-xl");

            taskParentContainer.innerHTML = `
                <div class="text-green-500">
                    <h3 class="taskNameHeader">${task.task}</h3>
                    <div class="taskContent">
                        <p class="hidden time">${task.time}</p>
                        <p class="text-xs">Time: <span class="finalTime">${new Date(task.date+"T"+task.time).toLocaleTimeString('en-US', {hour12: true}).replace(/:\d+ /, ' ')}</span></p>
                        <p class="text-xs">Date: <span class="date">${new Date(task.date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span></p>
                    </div>
                </div>
                <div class="ml-auto mt-auto hidden btns">
                    <button class="taskDeleteBtn" title="Delete Reminder" class="mr-3">
                        <svg width="40px" height="40px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#f87171" stroke-width="1.224" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="#f87171" stroke-width="1.224" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#f87171" stroke-width="1.224" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                    <button class="taskEditBtn" title="Edit Reminder">
                        <svg width="40px" height="40px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#93c5fd"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.2"></g><g id="SVGRepo_iconCarrier"> <path stroke="#93c5fd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.02" d="M3.8 12.963L2 18l4.8-.63L18.11 6.58a2.612 2.612 0 00-3.601-3.785L3.8 12.963z"></path> </g></svg>
                    </button>
                </div>
            `;
                
            
            // Append the task container to the task list
            document.getElementById('taskList').appendChild(taskParentContainer);
        });
        var totalNumberOfTasks = document.getElementById("taskList").childElementCount;
        html.totalNumContainer[0].textContent = totalNumberOfTasks;
    }catch (error) {
        console.error(error.message);

        // working on the error messages while working on the UI and UX in general
    }

}