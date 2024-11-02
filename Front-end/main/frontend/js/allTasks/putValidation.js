import * as html from "../variable_names/allTasksVar.js"
import { cancelEdit, clearData } from "./edit.js";
import { putTask } from "../api.js";
import { checkBackDateTime } from "../input_validators/checkbackDate.js";

export const validatePutRequest = async (task, taskId, dateTime, date, time, onSubmitEdit, taskName, editInputTime, finalTaskDate, finalTaskTime, formattedTime, formattedDate)=> {
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
}