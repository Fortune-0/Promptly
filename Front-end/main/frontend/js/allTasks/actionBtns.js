import { renderRes } from "./renderTasks.js";
import * as html from "../variable_names/allTasksVar.js"
import { displayEdit, cancelEdit, clearData } from "./edit.js";

export function renderTasks() {
    renderRes().then(()=>{
    const deleteBtns = document.querySelectorAll(".taskDeleteBtn");
    var totalNumberOfTasks = document.getElementById("taskList").childElementCount;

    
    // Handle task deletion with Flask API
    
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", async function () {
            const parentEl = this.closest(".task");
            if (parentEl) {
                const taskId = parentEl.getAttribute('data-task-id');
                console.log(taskId);
                
    
                // Send DELETE request to Flask API
                const response = await fetch('http://127.0.0.1:5000/api/delete/'+ taskId, {
                    method: 'DELETE'
                });
    
                if (response.ok) {
                    parentEl.remove();
                    totalNumberOfTasks--;
                    html.totalNumContainer[0].textContent = totalNumberOfTasks;
    
                    if (totalNumberOfTasks == 0) {
                        html.totalNumContainer[0].classList.remove("bg-green-300");
                        html.totalNumContainer[0].classList.add("empty");
                    }
                } else {
                    alert("Failed to delete the task.");
                }
            }
        });
    });



    // Handle task edit
    const editBtns = document.querySelectorAll(".taskEditBtn");
    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', () => {
            displayEdit();
    
            const parentElement = editBtn.closest(".task");
            const taskId = parentElement.getAttribute('data-task-id');
            const taskName = parentElement.querySelector(".taskNameHeader").textContent;
            const taskDate = parentElement.querySelector(".date").textContent;
            const taskTime = parentElement.querySelector(".time").textContent;
    
            setTimeout(() => {
                if (parentElement) {
                    const [month, day, year] = taskDate.split('/');
                    const reversedDate = [year, month, day].join('/');
                    const formattedReversedDate = reversedDate.replace(/\//g, '-');
    
                    html.taskInputDateTime.value = `${formattedReversedDate}T${taskTime}`;
                    html.taskInputName.value = taskName;
                }
            }, 500);
    
            const onSubmitEdit = async () => {
                const finalTaskName = html.taskInputName.value;
                let firstLetter_TN = finalTaskName.slice(0,1).toUpperCase();
                let restName = finalTaskName.slice(1);
                let task = firstLetter_TN + restName;
    
                let dateTime = html.taskInputDateTime.value;
                let [date, time] = dateTime.split("T");
    
                // Send PUT request to Flask API to update the task
                const response = await fetch('http://127.0.0.1:5000/api/update/' + taskId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        task,
                        dateTime: {date, time}
                    })
                });
    
                const formattedDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
                const formattedTime = new Date(dateTime).toLocaleTimeString('en-US', { hour12: true }).replace(/:\d+ /, ' ');
    
                if (response.ok) {
                    let taskName = parentElement.querySelector(".taskNameHeader");
                    let finalTaskTime = parentElement.querySelector(".finalTime");
                    let finalTaskDate = parentElement.querySelector(".date");
                    let editInputTime = parentElement.querySelector(".time");
                    taskName.textContent = task;
                    editInputTime.textContent = time;
                    finalTaskDate.textContent = formattedDate;
                    finalTaskTime.textContent = formattedTime;
    
                    clearData();
                    cancelEdit();
                    html.submitEditButton.removeEventListener('click', onSubmitEdit); // Remove the listener after execution
                } else {
                    alert("Failed to update the task.");
                }
            };
    
            html.submitEditButton.addEventListener('click', onSubmitEdit);
        });
    });
})
}
