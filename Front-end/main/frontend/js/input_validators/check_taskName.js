import * as html from '../variable_names/inputVar.js'
import { clearEm, taskNameError } from "../error_messages.js";

export const checkTaskName = ()=> {
    if (html.taskNameEl.value.length <= 2) {
        taskNameError()
        html.titleEm.textContent = "Task name should be at least 3 characters long";
    }else {
        clearEm(html.taskNameEl, html.titleEm);
    }
}