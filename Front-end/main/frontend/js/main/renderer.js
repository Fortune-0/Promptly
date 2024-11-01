import { checkBackDateTime } from "../input_validators/checkbackDate.js";
import * as html from "../variable_names/inputVar.js";
import { createTask } from "./task_creator.js";
import { checkTaskName } from "../input_validators/check_taskName.js";
import { checkDateTime } from "../input_validators/check_dateTime.js";
import { submitTask } from "../api.js";


html.taskSubmit.addEventListener('click', async () => {
    let task = html.taskNameEl.value,
    dateTime = html.taskDateTimeEl.value;

    const [date, time] = dateTime.split('T');
    
    // validation before sending POST request
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
        default:
            await submitTask({
                task,
                dateTime: {date, time}
            });
            Swal.fire({
                icon: 'success',
                title: 'Reminder Created successfully'
            }).then(()=>createTask(html.totalTaskContainer));
        break;
    }
});

html.taskNameEl.addEventListener("input", () => checkTaskName());

html.taskDateTimeEl.addEventListener("input", () => checkDateTime());

html.totalTaskContainer.addEventListener('click', () => setTimeout(()=> window.location.href = "allTasks.html", 500))
    // the timeout there is actually to set a delay so API calls can be made)