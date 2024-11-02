import * as html from "../variable_names/allTasksVar.js"
import { cancelEdit, clearData } from "./edit.js";
import { putTask } from "../api.js";
import { checkBackDateTime } from "../input_validators/checkbackDate.js";

export const validatePutRequest =  (task, taskId, dateTime, date, time, onSubmitEdit, taskName, editInputTime, finalTaskDate, finalTaskTime, formattedTime, formattedDate)=> {
    switch (true) {
        case !task && !dateTime:
            Swal.fire({
                icon: 'question',
                title: 'Missing Inputs',
                text: 'Please add a title and select a specific date and time'
            })
        break;
        case task.length < 3:
            Swal.fire({
                icon: 'warning',
                title: 'Incorrect Input',
                text: 'Please make sure the title is more than 3 characters'
            });
        break;
        case !task:
            Swal.fire({
                icon: 'question',
                title: 'Missing Input',
                text: 'Please add a title'
            })
        break;
        case !dateTime:
            Swal.fire({
                icon: 'question',
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
            Swal.fire({
                icon: 'success',
                title: 'Edited successfully'
            }).then(async()=>{
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
                setTimeout(() => {
                    html.load.classList.replace('flex', 'hidden');
                }, 1200);
            })
        break;
    }
}