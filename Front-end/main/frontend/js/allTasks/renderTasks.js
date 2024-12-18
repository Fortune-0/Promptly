import * as html from '../variable_names/allTasksVar.js'

export async function renderRes (){

    try {
        
        const response = await fetch('http://127.0.0.1:5000/api/allReminder');
       
        setTimeout(() => html.load.classList.replace("flex", "hidden"), 1200);
        
        let tasks = await response.json();
        tasks = tasks.sort((a,b)=> b.id - a.id);
        tasks.forEach(task => {
            const taskParentContainer = document.createElement('article');
            taskParentContainer.setAttribute('data-task-id', task.id);
            taskParentContainer.classList.add("flex", "task", "taskContainer", "mb-5", "hover:border-primary", "border", "bg-primary", "cursor-pointer", "p-6", "hover:scale-105", "transition-all", "rounded-xl");
            const title = task.task.charAt(0).toUpperCase() + task.task.slice(1);

            taskParentContainer.innerHTML = `
                <div class="text-white">
                    <h2 class="text-3xl taskName">${title}</h2>
                    <div class="taskContent">
                        <p class="hidden time">${task.time}</p>
                        <p class="text-lg">Time: <span class="finalTime">${new Date(task.date+"T"+task.time).toLocaleTimeString('en-US', {hour12: true}).replace(/:\d+ /, ' ')}</span></p>
                        <p class="text-lg">Date: <span class="date">${new Date(task.date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span></p>
                    </div>
                </div>
                <div class="ml-auto mt-auto hidden btns">
                    <button class="taskDeleteBtn hover:scale-110" title="Delete Reminder" class="mr-3">
                        <svg width="40px" height="40px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#e75656" stroke-width="1.224" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="#e75656" stroke-width="1.224" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#e75656" stroke-width="1.224" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                    <button class="taskEditBtn hover:scale-110" title="Edit Reminder">
                        <svg width="40px" height="40px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.2"></g><g id="SVGRepo_iconCarrier"> <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.02" d="M3.8 12.963L2 18l4.8-.63L18.11 6.58a2.612 2.612 0 00-3.601-3.785L3.8 12.963z"></path> </g></svg>
                    </button>
                </div>
            `;
                
            
            // Append the task container to the task list
            document.getElementById('taskList').appendChild(taskParentContainer);
        });
        var totalNumberOfTasks = document.getElementById("taskList").childElementCount;
        html.totalNumContainer[0].textContent = totalNumberOfTasks;
    }catch (error) {
        html.load.classList.replace("hidden", "flex")
        Swal.fire({
            icon: 'error',
            title: `ERROR`,
            text: `${error.message}`
        })
    }

}