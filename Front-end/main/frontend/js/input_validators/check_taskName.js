import * as html from '../variable_names/inputVar.js'
import { taskNameError } from '../error_messages/task-name_error.js'
import { clearEm } from '../error_messages/clear_error.js'

export const checkTaskName = ()=> {
    if (html.taskNameEl.value.length <= 2) {
        taskNameError()
        html.titleEm.textContent = "Task name should be at least 3 characters long";
    }else {
        clearEm(html.taskNameEl, html.titleEm);
    }
}