import * as say from '../variable_names/inputVar.js'
import { checkDate } from './date_error.js';
export const checkTime = () => {
    checkDate();
    say.dateEm.textContent = "Please select a specific time";
};
