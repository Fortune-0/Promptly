import { checkBackDateTime } from "../input_validators/checkbackDate.js";
import * as html from "../variable_names/inputVar.js";
import { createTask } from "./task_creator.js";
import { checkTaskName } from "../input_validators/check_taskName.js";
import { checkDateTime } from "../input_validators/check_dateTime.js";
import { submitTask } from "../api.js";
import { warningError } from "../error_messages.js";


html.taskSubmit.addEventListener('click', async () => {
    let task = html.taskNameEl.value,
    dateTime = html.taskDateTimeEl.value;

    const [date, time] = dateTime.split('T');
    
    // validation before sending POST request
    switch (true) {
        case !task && !dateTime:
            warningError("Missing Inputs", 'Please add a title and select a specific date and time')
        break;
        case !task:
            warningError("Missing Input", 'Please add a title')
        break;
        case !dateTime:
            warningError("Missing Input", 'Please specify a specific date and time')
        break;
        case task.length < 3:
            warningError('Incorrect Input', 'Please make sure the title is more than 3 characters')
        break;
        case checkBackDateTime():
            warningError('Wrong Input','Please specify a date or time in the future')
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