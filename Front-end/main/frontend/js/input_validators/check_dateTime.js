import * as html from '../variable_names/inputVar.js'
import { dateError } from '../error_messages/date_error.js'
import { timeError } from '../error_messages/time_error.js'
import { checkBackDateTime } from './checkbackDate.js'
import { clearEm } from '../error_messages/clear_error.js'

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