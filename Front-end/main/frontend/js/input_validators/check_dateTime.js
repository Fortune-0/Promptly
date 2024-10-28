import * as html from '../variable_names/inputVar.js'
import { checkBackDateTime } from './checkbackDate.js'
import { dateError, timeError, clearEm } from "../error_messages.js";

export const checkDateTime = ()=> {
    switch (true) {
        case !html.taskDateTimeEl.value:
            dateError();
            timeError();
            html.dateEm.textContent = "please add a date and time";
            break;
        case checkBackDateTime():
            checkBackDateTime();
            break;
        default:
            clearEm(html.taskDateTimeEl, html.dateEm);
            break;
    }
}