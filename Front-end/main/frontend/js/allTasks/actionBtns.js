import { renderRes } from "./renderTasks.js";
import * as html from "../variable_names/allTasksVar.js"
import { displayEdit } from "./edit.js";
import { validatePutRequest } from "./putValidation.js"
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
                    
                    // Send DELETE request to Flask API
                    const response = await fetch('http://127.0.0.1:5000/api/delete/'+ taskId, {
                        method: 'DELETE'
                    });
                
                    if (response.ok) {

                        Swal.fire({
                            icon: "success",
                            title: "Reminder deleted successfully"
                        }).then(()=>{
                            parentEl.remove();
                            totalNumberOfTasks--;
                            html.totalNumContainer[0].textContent = totalNumberOfTasks;
                        })
                        
                    } else {
                        Swal.fire({
                        icon: "ERROR",
                        title: "Oops...",
                        text: `Something went wrong! error ${response.status}`
                    });
                    }
    
                    if (totalNumberOfTasks == 0) {
                        html.totalNumContainer[0].classList.replace("bg-white", "bg-primary1");
                    }
                        
                }
            });
        });

        // Handle task edit
        const editBtns = document.querySelectorAll(".taskEditBtn");
        editBtns.forEach(editBtn => {
            editBtn.addEventListener('click', () => {
                document.querySelector('body').classList.replace("bg-dynamic-gradient-1", "bg-dynamic-gradient-3")
                displayEdit();
        
                const parentElement = editBtn.closest(".task");
                const taskId = parentElement.getAttribute('data-task-id');
                
                const taskName = parentElement.querySelector(".taskName").textContent;
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
                }, 400);
        
                const onSubmitEdit = async () => {
                    const finalTaskName = html.taskInputName.value;
                    let firstLetter_TN = finalTaskName.slice(0,1).toUpperCase();
                    let restName = finalTaskName.slice(1);
                    let task = firstLetter_TN + restName;
        
                    let dateTime = html.taskInputDateTime.value;
                    let [date, time] = dateTime.split("T");

                    let taskName = parentElement.querySelector(".taskName");
                    let finalTaskTime = parentElement.querySelector(".finalTime");
                    let finalTaskDate = parentElement.querySelector(".date");
                    let editInputTime = parentElement.querySelector(".time");
                    const formattedDate = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    const formattedTime = new Date(dateTime).toLocaleTimeString('en-US', { hour12: true }).replace(/:\d+ /, ' ');
                    
                    // validation before sending PUT request
                    validatePutRequest(task, taskId, dateTime, date, time, onSubmitEdit, taskName, editInputTime, finalTaskDate, finalTaskTime, formattedTime, formattedDate);
                    
                };
                html.submitEditButton.addEventListener('click', onSubmitEdit);
            });
        });
    });
}