import * as html from '../variable_names/inputVar.js'
import { dateError } from './date_error.js';
export const timeError = () => {
    dateError();
    html.dateEm.textContent = "Please select a specific time";
};
