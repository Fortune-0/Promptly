import { checkBackDateTime } from "../input_validators/checkbackDate.js";
import * as html from "../variable_names/inputVar.js";
import { dateError } from "../error_messages/date_error.js";
import { timeError } from "../error_messages/time_error.js";
import { taskNameError } from "../error_messages/task-name_error.js"
import { createTask } from "./task_creator.js";
import { checkTaskName } from "../input_validators/check_taskName.js";
import { checkDateTime } from "../input_validators/check_dateTime.js";
import { submitTask } from "../api.js";






html.taskSubmit.addEventListener('click', async () => {
    let task = html.taskNameEl.value,
    dateTime = html.taskDateTimeEl.value;

    const [date, time] = dateTime.split('T');
    
    
    switch (true) {
        case !task && !dateTime:
            taskNameError();
            dateError();
            timeError();
            html.dateEm.textContent = "Please select a specific date and time";
            break;
        case !task:
            taskNameError();
            break;
        case !dateTime:
            dateError();
            break;
        case checkBackDateTime():
            checkBackDateTime();
            break;
        default:
            await submitTask({
                task,
                dateTime: {date, time}
            });
            createTask(html.totalTaskContainer);
            break;
    }
});

html.taskNameEl.addEventListener("input", () => {
    checkTaskName();
});

html.taskDateTimeEl.addEventListener("input", () => {
    checkDateTime();
});

html.totalTaskContainer.addEventListener('click', () => {
    setTimeout(()=> window.location.href = "allTasks.html", 500);
    // the timeout there is actually to set a delay so API calls can be made
});
