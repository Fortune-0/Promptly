import { checkDateTime } from "../input_validators/check_dateTime.js";
import { checkTaskName } from "../input_validators/check_taskName.js";
import * as html from '../variable_names/allTasksVar.js'
import { cancelEdit } from "./edit.js";
import { renderTasks } from "./actionBtns.js";

// Loop through each task and create the HTML structure
                
renderTasks();


// Cancel edit button listener
html.editCancelButton.addEventListener("click", cancelEdit);

// Input validation functionalities

html.taskNameEl.addEventListener("input", () => {
    checkTaskName();
});

html.taskDateTimeEl.addEventListener("input", () => {
    checkDateTime();
});


// add reminder_id to line 87 in app.py to fix error message in editing task // done