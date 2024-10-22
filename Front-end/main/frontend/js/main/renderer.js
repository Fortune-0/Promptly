import { checkBackDateTime } from "../input_validators/checkbackDate.js";
import * as say from "../variable_names/inputVar.js";
import { checkDate } from "../error_messages/date_error.js";
import { checkTime } from "../error_messages/time_error.js";
import { checkTaskName } from "../error_messages/task-name_error.js"
import { clearEm } from "../error_messages/clear_error.js";
import { createTask } from "./task_creator.js";




// Function to submit task to Flask backend
async function submitTask(data) {
    const response = await fetch('http://127.0.0.1:5000/api/Reminder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

say.taskSubmit.addEventListener('click', async () => {
    let task = say.taskNameEl.value,
    dateTime = say.taskDateTimeEl.value;

    const [date, time] = dateTime.split('T');
    await submitTask({
        task,
        dateTime: {date, time}
    });
    


    switch (true) {
        case !task && !dateTime:
            checkTaskName();
            checkDate();
            checkTime();
            say.dateEm.textContent = "Please select a specific date and time";
            break;
        case !task:
            checkTaskName();
            break;
        case !dateTime:
            checkDate();
            break;
        case checkBackDateTime():
            checkBackDateTime();
            break;
        default:
            createTask(say.totalTaskContainer);
            break;
    }
});

say.taskNameEl.addEventListener("input", () => {
    if (say.taskNameEl.value.length <= 2) {
        checkTaskName()
        say.titleEm.textContent = "Task name should be at least 3 characters long";
    }else {
        clearEm(say.taskNameEl, say.titleEm);
    }
});

say.taskDateTimeEl.addEventListener("input", () => {
    switch (true) {
        case !say.taskDateTimeEl.value:
            checkDate();
            checkTime();
            say.dateEm.textContent = "please add a date and time";
            break;
        case checkBackDateTime():
            checkBackDateTime();
            break;
        default:
            clearEm(say.taskDateTimeEl, say.dateEm);
            break;
    }
});

say.totalTaskContainer.addEventListener('click', () => {
    setTimeout(()=> window.location.href = "allTasks.html", 500);
    // the timeout there is actually to set a delay so API calls can be made
});
