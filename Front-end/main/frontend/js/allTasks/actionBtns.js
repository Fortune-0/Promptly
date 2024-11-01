import { renderRes } from "./renderTasks.js";
import * as html from "../variable_names/allTasksVar.js"
import { displayEdit, cancelEdit, clearData } from "./edit.js";
import { putTask } from "../api.js";
import { checkBackDateTime } from "../input_validators/checkbackDate.js";
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
                        html.totalNumContainer[0].classList.remove("bg-green-300");//
                        html.totalNumContainer[0].classList.add("empty");
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
                console.log(taskId);
                
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
                }, 500);
        
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
                    switch (true) {
                        case !task && !dateTime:
                            Swal.fire({
                                icon: 'warning',
                                title: 'Missing Inputs',
                                text: 'Please add a title and select a specific date and time'
                            })
                        break;
                        case !task:
                            Swal.fire({
                                icon: 'warning',
                                title: 'Missing Input',
                                text: 'Please add a title'
                            })
                        break;
                        case !dateTime:
                            Swal.fire({
                                icon: 'warning',
                                title: 'Missing Input',
                                text: 'Please specify a specific date and time'
                            })
                        break;
                        case checkBackDateTime():
                            Swal.fire({
                                icon: 'warning',
                                title: 'Wrong Input',
                                text: 'Please specify a date or time in the future'
                            })
                        break;
                        default: // Send PUT request to Flask API to update the task
                            await putTask({
                                    task,
                                    dateTime: {date, time}
                                }, taskId);
                            taskName.textContent = task;
                            editInputTime.textContent = time;
                            finalTaskDate.textContent = formattedDate;
                            finalTaskTime.textContent = formattedTime;
            
                            clearData();
                            cancelEdit();
                            html.load.classList.replace('hidden', 'flex');
                            html.submitEditButton.removeEventListener('click', onSubmitEdit); // Remove the listener after execution
                        break;
                    }
                    setTimeout(() => {
                        html.load.classList.replace('flex', 'hidden');
                        // window.location.href = `allTask.html#task${taskId}`
                    }, 1200);
                };
        
                html.submitEditButton.addEventListener('click', onSubmitEdit);
            });
        });
    });
}